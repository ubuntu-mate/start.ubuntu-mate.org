#!/usr/bin/env bash

sudo apt-get -y install rsync

if [ -f build/index.html ]; then
    for HOST in can fra; do
        echo "Deploying to: ${HOST}"
        rsync -av -e "ssh -o StrictHostKeyChecking=no" --progress --delete build/ matey@${HOST}.wimpress.io:start.ubuntu-mate.org/
    done
else
    echo "ERROR! build/index.html was not found."
fi
