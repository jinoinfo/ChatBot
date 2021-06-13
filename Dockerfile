# Stage 1

FROM node:14.15.1-alpine as build-step
RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
RUN npm install --save-dev
COPY . /app
Run npm link @angular/cli
RUN yarn run build --prod


# Stage 2
FROM nginx:1.17.1-alpine
COPY --from=build-step /app/dist/chatbot /usr/share/nginx/html