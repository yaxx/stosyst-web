FROM node:16.20.1-alpine AS base

WORKDIR /usr/src/app

COPY ./package*.json ./

FROM base as dev

RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm install

COPY . .

EXPOSE 4200

CMD ["npm", "run", "dev"]

# FROM base as production

# ENV NODE_ENV production

# RUN --mount=type=cache,target=/usr/src/app/.npm \
#     npm set cache /usr/src/app/.npm && \
#     npm ci only=production

# COPY . .

# RUN npm run build

# EXPOSE 4200

# CMD ["npm", "start"]