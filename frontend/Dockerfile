FROM mhart/alpine-node:6.17.1
WORKDIR /app
COPY package*.json ./
COPY . .
EXPOSE 3000
RUN npm i
CMD "npm" "start"
