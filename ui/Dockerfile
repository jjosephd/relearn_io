FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build  # builds into /dist

RUN npm install -g serve
CMD ["serve", "-s", "dist"]  
EXPOSE 3000
