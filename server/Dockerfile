FROM node:16-alpine

# update packages
RUN apk update

# create root application folder
WORKDIR /app

# copy configs to /app folder
COPY package*.json ./
COPY tsconfig.json ./
# copy source code to /app/src folder
COPY src /app/src

# check files list
RUN ls -a

# ARG ID
ENV ID $ID

# ARG SECRET
ENV SECRET $SECRET

RUN npm install
RUN npm run build

# EXPOSE 5000

CMD [ "node", "./dist/index.js" ]