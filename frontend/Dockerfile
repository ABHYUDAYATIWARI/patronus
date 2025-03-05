FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -D tailwindcss postcss autoprefixer

COPY . .


EXPOSE 3000

ENV NODE_ENV=development

CMD ["npm", "run", "dev"]