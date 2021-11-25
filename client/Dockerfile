FROM node:16-alpine

# update packages
RUN apk update

# create root application folder
WORKDIR /app

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ADD . /app/.

RUN npm install

ENTRYPOINT ["/entrypoint.sh"]

# # copy configs to /app folder
# COPY package*.json ./
# COPY tsconfig.json ./
# # copy source code to /app/src folder
# COPY src /app/src

# # check files list
# RUN ls -a

# RUN npm install
RUN npm run build

# EXPOSE 3000

CMD [ "npm", "run", "serve", "--host", "5001" ]