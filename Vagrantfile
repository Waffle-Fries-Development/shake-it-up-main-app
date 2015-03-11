# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = '2'

# noinspection RubyResolve
Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.box = 'shake-it-up-saltstack'

  # noinspection RubyResolve
  config.vm.provider :virtualbox do |vb, override|
    override.vm.box_url = './ubuntu-amd64-virtualbox.box'
    override.vm.network :forwarded_port, guest: 3000, host: 3000

    vb.gui = false
    # noinspection RubyResolve
    vb.customize ['modifyvm', :id, '--memory', '12272']
    vb.customize ['modifyvm', :id, '--cpus', '2']
  end

  # noinspection RubyResolve
  config.vm.provider :vmware_fusion do |vf, override|
    override.vm.box_url = './ubuntu-amd64-vmware.box'
    override.vm.network :forwarded_port, guest: 22, host: 2222, id: :ssh, disabled: true
    vf.gui = false
  end

  config.vm.synced_folder '.', '/srv/httpd/shake-it-up', type: :rsync, owner: :vagrant, group: :vagrant,
    rsync__exclude: %w[.DS_Store .idea/ *.db salt/ Vagrantfile *.box .vagrant/ .bundle/ vendor/ log/ tmp/
    .sass-cache/ bower_components/ node_modules/ public/ .git/]

  config.vm.synced_folder './salt/roots/pillar', '/srv/pillar', type: :rsync, owner: :root, group: :root
  config.vm.synced_folder './salt/roots/salt', '/srv/salt', type: :rsync, owner: :root, group: :root

  # noinspection RubyResolve
  config.vm.provision :salt do |s|
    s.minion_config = 'salt/minion'
    s.run_highstate = true
    s.verbose = true
  end

end
