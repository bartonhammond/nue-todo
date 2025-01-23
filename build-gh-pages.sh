rm -rf ./nue-todo
nue build --production --base /nue-todo
cp -r ./.dist/prod ./
mv ./prod ./nue-todo
