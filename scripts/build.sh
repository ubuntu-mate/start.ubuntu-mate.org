#!/bin/bash

function abort_if_failed() {
    if [ $1 != 0 ]; then
        exit 1
    fi
}

# Ensure gems are up-to-date.
echo -e "\nbundle install"
echo "------------------------------------------------------"
bundle install
abort_if_failed $?

# Build locales
echo -e "\nBuild locales"
echo "------------------------------------------------------"
cd _includes/i18n/
echo "- default" > ../../_data/locales.yml
for locale in $(ls *.po); do
    lang="${locale%.*}"
    echo "-> $lang"
    echo "- $lang" >> ../../_data/locales.yml
    po2json -t default.json $lang.po $lang.json
    abort_if_failed $?
done

cd "$(git rev-parse --show-toplevel)"

export JEKYLL_ENV=production
bundle exec jekyll build
abort_if_failed $?

if [ ! -d _site ]; then
    exit 1
fi

# WORKAROUND: Jekyll doesn't return exit code != 0 on a liquid exception, that
# may cause the build to be empty. Ensure the build fails if there are no HTML files.
html_count=$(find . -type f -name "*.html" | wc -l)
if [ "$html_count" == "0" ]; then
    exit 1
fi
