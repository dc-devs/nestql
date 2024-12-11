ARG NGINX_VERSION=latest
FROM nginx:${NGINX_VERSION}

COPY src/base/docker/nql-app/nginx/default.conf.template /etc/nginx/conf.d/default.conf.template

RUN apt-get update && apt-get install -y gettext-base

ENV PORT=3001

CMD ["/bin/bash", "-c", "envsubst '$$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
