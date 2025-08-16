FROM node:20

WORKDIR /app

COPY package*.json ./

ENV DATABASE_URL=postgresql://root:k0CiVngA4qEOKEgAHQpRA8jX@taftan.liara.cloud:30396/postgres

ENV JWT_SECRET=SECRET

RUN npm install

COPY . .

RUN npm run db:push

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
