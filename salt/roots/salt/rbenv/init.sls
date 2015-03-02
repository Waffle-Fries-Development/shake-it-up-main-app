{% set rbenv_version = salt['pillar.get']('rbenv:version', '0.4.0') %}
{% set ruby_build_version = salt['pillar.get']('rbenv:ruby-build', '20141016') %}
{% set rbenv_user = salt['pillar.get']('rbenv:user', 'vagrant') %}
{% set rbenv_url = 'https://github.com/sstephenson/rbenv/archive/v' ~ rbenv_version ~ '.tar.gz' %}
{% set ruby_build_url = 'https://github.com/sstephenson/ruby-build/archive/v' ~ ruby_build_version ~ '.tar.gz' %}

rbenv-deps:
  pkg.installed:
    - pkgs:
      - bash
      - openssl
      - autoconf
      - bison
      - build-essential
      - libssl-dev
      - libyaml-dev
      - libreadline6-dev
      - zlib1g-dev
      - libncurses5-dev

/home/{{ rbenv_user }}/.rbenv:
  file.directory:
    - user: {{ rbenv_user }}
    - group: {{ rbenv_user }}
    - require_in:
      - cmd: install-rbenv
      - cmd: install-ruby-build

/home/{{ rbenv_user }}/.rbenv/plugins:
  file.directory:
    - user: {{ rbenv_user }}
    - group: {{ rbenv_user }}
    - require_in:
      - cmd: install-rbenv

/home/{{ rbenv_user }}/.rbenv/plugins/ruby-build:
  file.directory:
    - user: {{ rbenv_user }}
    - group: {{ rbenv_user }}
    - require_in:
      - cmd: install-ruby-build

install-rbenv:
  cmd.run:
    - name: wget -qO- {{ rbenv_url }} | tar xvz --strip 1 -C "$HOME/.rbenv"
    - user: {{ rbenv_user }}
    - unless: which rbenv
    - require:
      - pkg: rbenv-deps

install-ruby-build:
  cmd.run:
    - name: wget -qO- {{ ruby_build_url }} | tar xvz --strip 1 -C "$HOME/.rbenv/plugins/ruby-build"
    - unless: $(find "$HOME/.rbenv/plugins/ruby-build" -maxdepth 1 -type f -name "bin" | wc -l)
    - user: {{ rbenv_user }}

add-rbenv-profile:
  file.append:
    - name: /home/{{ rbenv_user }}/.profile
    - require:
      - cmd: install-rbenv
      - cmd: install-ruby-build
    - unless: test $(echo $PATH | grep "$HOME/.rbenv")
    - text: |
        export PATH="$HOME/.rbenv/bin:$HOME/.rbenv/plugins/ruby-build/bin:$PATH"
        eval "$(rbenv init -)"
  cmd.run:
    - name: exec $SHELL; rbenv rehash

/home/{{ rbenv_user }}/.gemrc:
  file.managed:
    - source: salt://rbenv/gemrc
    - user: {{ rbenv_user }}
    - group: {{ rbenv_user }}
    - mode: 600
