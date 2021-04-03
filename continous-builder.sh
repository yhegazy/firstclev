#!/bin/sh
cd "$(dirname "$0")";
CWD="$(pwd)"
echo $CWD
npm run build
sleep 30
rm -rf /var/www/firstclevelandmosque/html/build
mv build /home/firstclev/backend
