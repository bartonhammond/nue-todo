
  import { $ } from '/@nue/view-transitions.js'
  const FILTER = {
    ALL: 'all',
    ACTIVE: 'active',
    COMPLETED: 'completed',
  }

export const lib = [
{
  name: 'todo',
  tagName: 'section',
  tmpl: '<section class="todo"> <div class="row"> <input id="allSelect" type="checkbox" @click="0"> <input id="newTodo" placeholder="What needs to be done..." @keyup="1"> </div> <section :for="2"> <div class="row"> <input :if="3" type="checkbox" checked :id="4" @click="5"> <input :if="6" type="checkbox" :id="7" @click="8"> <input :id="9" :value="10" @keyup="11"> <button style="width: 1rem" :id="12" @click="13">X</button> </div> </section> <section> <div class="row">:14:<button $disabled="15" @click="16">All</button> <button $disabled="17" @click="18">Active</button> <button $disabled="19" @click="20">Completed</button> <button $disabled="21" @click="22">Clear</button> </div> </section> </section>',
  Impl: class { 
    constructor() {
      this.items = []
      this.all = []
      this.filter = FILTER.ALL
      this.total = 0
      this.numberCompleted = 0
    }

    filterItems(filter) {
      let { items, all, total} = this

      switch(filter) {
        case FILTER.ALL:
        items = JSON.parse(JSON.stringify(all))
        break
        case FILTER.ACTIVE:
        items = all.filter((item) => !item.done)
        break
        case FILTER.COMPLETED:
        items = all.filter((item) => item.done)
        break
      }
      //Update so reactivity occurs
      this.total = all.length
      this.items = items
      this.numberCompleted =   all.filter(item => item.done).length
    }

    showAll() {
      let { filter } = this
      filter = FILTER.ALL
      this.filterItems(filter)
    }

    showActive() {
      let { filter } = this
      filter = FILTER.ACTIVE
      this.filterItems(filter)
    }

    showCompleted() {
      let { filter } = this
      filter = FILTER.COMPLETED
      this.filterItems(filter)
    }

    newTodo() {
      const desc = $("#newTodo").value
      if (!desc) {
        alert("Please provide description")
        return
      }

      let { all, filter } = this
      const obj = {id: Date.now(), done: false, desc: desc}
      all.push(obj)

      $("#newTodo").value = ""
      this.filterItems(filter)
    }

    getItem($event) {
      let { all } = this
      const id = parseInt($event.currentTarget.id.split('-')[1])
      return all.find((e) => e.id == id)
    }

    descUpdate($event) {
      //desc-0 = $event.currentTarget.id
      let item = this.getItem($event)
      item.desc = $("#desc-" + item.id).value
      let { filter } = this
      this.filterItems(filter)
    }

    doneUpdate($event) {
      let item = this.getItem($event)
      item.done = !item.done
      let { filter } = this
      this.filterItems(filter)
    }

    deleteItem($event) {
      let item = this.getItem($event)
      let { all, filter } = this
      this.all = all.filter(ele => item.id != ele.id)
      this.filterItems(filter)
    }

    allSelect($event) {
      let { all, filter } = this
      all.map(a=> a.done = $event.currentTarget.checked ? true:false );
      this.filterItems(filter)
    }

    clearCompleted($event) {
      let { all, filter } = this
      this.all = all.filter(ele => !ele.done)
      this.filterItems(filter)
    }
   },
  fns: [
    (_,e) => { _.allSelect.call(_, e) },
    (_,e) => { {if (!['enter','return'].includes(e.key.toLowerCase())) return;_.newTodo()} },
    _ => ['el', _.items, '$index'],
    _ => _.el.done,
    _ => ['chk-',_.el.id],
    (_,e) => { _.doneUpdate.call(_, e) },
    _ => !_.el.done,
    _ => ['chk-',_.el.id],
    (_,e) => { _.doneUpdate.call(_, e) },
    _ => ['desc-',_.el.id],
    _ => [_.el.desc],
    (_,e) => { {if (!['enter','return'].includes(e.key.toLowerCase())) return;_.descUpdate.call(_, e)} },
    _ => ['delbtn-',_.el.id],
    (_,e) => { _.deleteItem.call(_, e) },
    _ => [' ',_.total,' items '],
    _ => _.total == 0,
    (_,e) => { _.showAll.call(_, e) },
    _ => _.total == 0,
    (_,e) => { _.showActive.call(_, e) },
    _ => _.total == 0,
    (_,e) => { _.showCompleted.call(_, e) },
    _ => _.numberCompleted == 0,
    (_,e) => { _.clearCompleted.call(_, e) }
  ]
}]
export default lib[0]