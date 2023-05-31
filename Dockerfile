FROM 172.16.110.61:5000/devops/devel-node:12 as vendor

COPY package.json package-lock.json /app/

WORKDIR /app

RUN set -ex \
    && npm install --verbose

COPY . /app/

RUN set -ex \
    && npm run build

FROM 172.16.110.61:5000/devops/nginx:devel-latest

COPY --from=vendor /app/build/ /usr/share/nginx/html/

COPY nginx-vhost.conf /etc/nginx/conf.d/default.conf