rm -rf ./nue-todo
nue build --production --base /nue-todo --environment prod-site.yaml
cp -r ./.dist/prod ./
mv ./prod ./nue-todo
