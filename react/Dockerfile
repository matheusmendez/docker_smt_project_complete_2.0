# Stage 1
FROM node:alpine as build-stage

#ENV NODE_ENV=production

WORKDIR /app

COPY ./app_react/package*.json ./
RUN yarn install

COPY ./app_react/ /app/

ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

RUN yarn run build

# Stage 2
#FROM nginx:1.17.0-alpine

#COPY --from=build-stage /app/build /usr/share/nginx/html
#EXPOSE $REACT_DOCKER_PORT

#CMD nginx -g 'daemon off;'

