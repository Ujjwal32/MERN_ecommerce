FROM node:14.19.2-alpine3.15
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=4000
EXPOSE 4000

CMD [ "npm" , "start"]