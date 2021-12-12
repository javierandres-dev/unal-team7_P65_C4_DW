FROM mhart/alpine-node:6.17.1
WORKDIR /app
COPY package*.json ./
COPY . .
EXPOSE 6000
RUN npm i
CMD "npm" "start"
