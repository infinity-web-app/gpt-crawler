apt update && apt upgrade -y
apt autoremove -y
pm2 stop starter
:> ~/.pm2/logs/starter-out.log
:> ~/.pm2/logs/starter-error.log
git reset --hard
git pull
bun upgrade
bun install -g pm2
bun install
npm install
#bunx @puppeteer/browsers install chrome@stable --path $HOME/.cache/puppeteer
pm2 update
#cp ~/.env .
cp ~/*.pem .
#pm2 start --interpreter bun starter.ts --update-env
pm2 restart starter --update-env
pm2 logs
