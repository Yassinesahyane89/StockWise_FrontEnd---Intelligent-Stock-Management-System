FROM node:20.10.0
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install --legacy-peer-deps
RUN npm install -g @angular/cli@14.1.0

COPY . .
RUN npm run build

CMD ["ng", "serve","--host","0.0.0.0"]