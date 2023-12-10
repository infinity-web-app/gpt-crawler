apt update && apt upgrade -y
apt autoremove -y
pm2 stop starter
:> ~/.pm2/logs/starter-out.log
:> ~/.pm2/logs/starter-error.log
git reset --hard
git pull
npm install -g pm2
npm install
#bunx @puppeteer/browsers install chrome@stable --path $HOME/.cache/puppeteer
pm2 update
#cp ~/.env .
cp ~/*.pem .
npm run build
#pm2 start ./dist/starter.js --update-env
pm2 restart starter --update-env
pm2 logs
