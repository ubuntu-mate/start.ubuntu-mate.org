# [start.ubuntu-mate.org](https://start.ubuntu-mate.org)

![CI](https://github.com/ubuntu-mate/start.ubuntu-mate.org/workflows/CI/badge.svg)

A personalised start page for Ubuntu MATE users on Firefox.

![Screenshot - April 2020](.github/readme.png)


## Features

* Minimal resources
* Shortcuts to Ubuntu MATE areas.
* Choose a preferred search engine.
* Dark theme!

Ubuntu MATE does not store any data when using this website, which means:

* We don't track, log searches or collect any stats.
* We make zero commission from searches.

Simply put, it is just a branded web page that launches you into the
world wide web via one of the popular search engines.


## Translations

The start page speaks multiple languages! Translate on Transifex:

https://www.transifex.com/ubuntu-mate/startpage/


## Building

The website is powered by [Jekyll](https://jekyllrb.com), which can be installed
as follows:

    sudo apt install ruby ruby-dev make gcc
    sudo gem install bundler
    bundle install

To run:

    ./scripts/watch.sh


## License

The website is licensed under the GPLv3. See [COPYING](COPYING) for details.

Some icons are provided by [FontAwesome 5](https://github.com/FortAwesome/Font-Awesome),
licensed under CC-BY-4.0.
