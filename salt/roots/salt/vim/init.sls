vim:
  pkg:
    - installed

/etc/skel/.vimrc:
  file.managed:
    - source: salt://vim/vimrc
    - user: root
    - group: root
    - mode: 644
    - require:
      - pkg: vim
