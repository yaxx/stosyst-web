FROM node:16.20.1-alpine AS base

WORKDIR /usr/src/app

COPY ./package*.json ./

FROM base as development

RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm install

COPY . .

CMD ["npm", "start"]

FROM base as build

RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm install

COPY . .

RUN npm run build

##
FROM nginx:1.22-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build usr/src/app/build/ /var/www/html

EXPOSE 80