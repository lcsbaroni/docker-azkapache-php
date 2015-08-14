/**
* Documentation: http://docs.azk.io/Azkfile.js
*/
systems({
  site: {
    // depends: ['db'],
    // image: { dockerfile: 'docker-bob/Dockerfile' },
    image: { dockerfile: 'docker-php-apache/5.5/Dockerfile' },
    // image: { docker: 'lcsbaroni/docker-bob' },
    // workdir: "/app",
    workdir: "/azk/#{manifest.dir}",
    // command: "./server.sh",
    // command: "source /etc/apache2/envvars && exec apache2 -D FOREGROUND",
    // command: "source /etc/apache2/envvars && bindfs -u www-data -g www-data /app-origin /app && exec apache2 -D FOREGROUND",
    shell: "/bin/bash",
    mounts: {
      // "/app": path(".")
      '/azk/#{manifest.dir}': path("."),
    },
    scalable: {"default": 1},
    http: {
      domains: ["#{system.name}.#{azk.default_domain}"]
    },
    ports: {
      http: "80/tcp",
    },
    envs: {
      PHP_ENV: "dev",
      SERVER_NAME: "#{net.host}",
      SERVER_TESTE: "#{system.name}"
    },
    docker_extra: {
      // extra docker options
      start: {
        Privileged: "true",
      },
    },
  },

  // memcached: {                                                                                                                                                                                      
  //   image: "lcsbaroni/docker-memcached",
  //   workdir: "/app",
  //   shell: "/bin/bash",
  //   command: 'memcached -u root -S -l 0.0.0.0 -p 11211 -U 11212 -v',
  //   mounts: {
  //     "/app": path("."),
  //     // Activates a persistent data folder in '/data'
  //     "/data": persistent("data-#{system.name}"),
  //   },
  //   ports: {
  //     tcp: '11211/tcp',
  //     udp: '11212/udp',
  //   },
  //   export_envs: {
  //     MEMCACHED_PORT: "#{net.port.tcp}",
  //     MEMCACHED_HOST: "#{net.host}",
  //   },
  // },

  // db: {
  //   image: "tutum/mysql",
  //   mounts: {
  //     // Activates a persistent data folder in '/data'
  //     "/data": persistent("data-#{system.name}"),
  //   },
  //   http: {
  //       domains: ["#{system.name}.#{azk.default_domain}"]
  //   },
  //   ports: {
  //     data: "3306/tcp",
  //   },
  //   envs: {
  //     MYSQL_PASS: "root",
  //     MYSQL_USER: "root",
  //   },
  //   export_envs: {
  //     MYSQL_PORT: "#{net.port.data}",
  //     MYSQL_HOST: "#{net.host}",
  //     MYSQL_DATABASE: "bob-docker",
  //     MYSQL_USER: "root",
  //     MYSQL_PASS: "root",
  //     DATABASE_URL: "mysql://#{envs.MYSQL_USER}:#{envs.MYSQL_PASS}@#{net.host}:#{net.port.data}/",
  //   },
  // },
});

// Sets a default system (to use: start, stop, status, scale)
setDefault("site")