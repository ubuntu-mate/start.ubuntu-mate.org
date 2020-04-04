#!/usr/bin/env bash

if [ -f _site/index.html ]; then
    for HOST in man yor; do
        echo "Deploying to: ${HOST}"
        rsync -a -e "ssh -o StrictHostKeyChecking=no" --delete _site/ matey@${HOST}.ubuntu-mate.net:start.ubuntu-mate.org/
    done
else
    echo "ERROR! index.html was not found."
    exit 1
fi
