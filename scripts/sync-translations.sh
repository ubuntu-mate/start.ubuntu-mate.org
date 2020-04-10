#!/bin/bash -xe
#
# Can only be run by the Ubuntu MATE team who have write access to Transifex.
#
tx pull -a --minimum-perc=100
json2po -i default.json -o locales.pot
tx push -s
