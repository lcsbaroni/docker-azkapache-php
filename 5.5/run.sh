#!/bin/bash
source /etc/apache2/envvars
#bindfs -u www-data -g www-data /app-origin /app
bindfs -u www-data -g www-data /app/site /app/site
exec apache2 -D FOREGROUND