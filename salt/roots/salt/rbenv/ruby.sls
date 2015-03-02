{% set rbenv_user = salt['pillar.get']('rbenv:user', 'vagrant') %}

{% for id, version in salt['pillar.get']('rbenv:ruby-version', {}).items() %}
install-ruby-{{ id }}:
  cmd.run:
    - name: rbenv install {{ version }}; rbenv rehash
    - user: {{ rbenv_user }}
    - require:
      - cmd: install-rbenv
      - cmd: install-ruby-build
    - onlyif: test $(rbenv versions | grep "{{ version }}" | wc -l)
{% endfor %}
