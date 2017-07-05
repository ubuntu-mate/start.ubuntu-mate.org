#!/usr/bin/env bash

if [ -f build/index.html ]; then
    for HOST in man yor; do
        echo "Deploying to: ${HOST}"
        rsync -a -e "ssh -o StrictHostKeyChecking=no" --progress --delete build/ matey@${HOST}.ubuntu-mate.net:start.ubuntu-mate.org/
    done
else
    echo "ERROR! build/index.html was not found."
    exit 1
fi

