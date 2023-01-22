FROM node:18-alpine3.17
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
EXPOSE ${PORT}
CMD ["npm", "run", "server:prod"]
