
FROM node:18alpine


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


EXPOSE 4000


CMD ["npm", "start"]
