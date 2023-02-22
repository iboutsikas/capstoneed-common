
FROM node:18-alpine as build

ARG CAPSTONEED_API_URL
ARG CAPSTONEED_STUDENT_URL
ARG CAPSTONEED_LECTURER_URL

COPY package.json /tmp/package.json
RUN cd /tmp && npm install --save --legacy-peer-deps
RUN mkdir -p /app && cp -a /tmp/node_modules /app/

WORKDIR /app
COPY . /app

ENV CAPSTONEED_API_URL=$CAPSTONEED_API_URL
ENV CAPSTONEED_STUDENT_URL=$CAPSTONEED_STUDENT_URL
ENV CAPSTONEED_LECTURER_URL=$CAPSTONEED_LECTURER_URL

RUN npm run build --prod

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html