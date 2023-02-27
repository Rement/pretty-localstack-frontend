#!/usr/bin/env sh
set -eu

envsubst '${SERVER_HOST} ${SERVER_PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

exec "$@"
