#!/bin/bash
rxgit; ssh -i ~/keys/privatekey root@IP -p PORT 'cd PROJECT_DIR; git pull origin master; pm2 restart fbcrawler_api; cd web; yarn build; cd -;'