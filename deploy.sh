#!/usr/bin/env bash

if [ -f build/index.html ]; then
    for HOST in can fra; do
        echo "Deploying to: ${HOST}"
        scp build/index.html ${HOST}:Websites/start.ubuntu-mate.org/www/
    done
else
    echo "No start page to deploy."
    exit 1
fi
