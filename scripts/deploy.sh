#!/usr/bin/env bash

if [ ! -f _site/index.html ]; then
    echo "Deployment aborted. index.html appears to be missing?"
    exit 1
fi

rsync -a -e "ssh -o StrictHostKeyChecking=no" --delete _site/ matey@man.ubuntu-mate.net:start.ubuntu-mate.org/
rsync -a -e "ssh -o StrictHostKeyChecking=no" --delete _site/ matey@yor.ubuntu-mate.net:start.ubuntu-mate.org/

echo "Running post-deploy actions..."
ssh -o StrictHostKeyChecking=no matey@yor.ubuntu-mate.net /home/matey/post-deploy-actions.sh "ubuntu-mate.org"
