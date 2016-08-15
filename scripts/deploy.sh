#!/usr/bin/env bash

sudo apt-get -y install rsync

if [ -f build/index.html ]; then
    for HOST in man yor; do
        echo "Deploying to: ${HOST}"
        rsync -a -e "ssh -o StrictHostKeyChecking=no" --progress --delete build/ matey@${HOST}.ubuntu-mate.net:start.ubuntu-mate.org/
    done
else
    echo "ERROR! build/index.html was not found."
fi