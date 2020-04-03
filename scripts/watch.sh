#!/bin/bash

# Run build commands first
$(dirname "$0")/build.sh

if [ $? != 0 ]; then
    exit 1
fi

# Watch for changes during development
bundle exec jekyll serve --watch --livereload
