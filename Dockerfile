FROM node:17
WORKDIR /app
COPY package.json /app/package.json
RUN npm install

COPY data/* /app/data/
COPY *.js /app/
COPY .env /app/.env
EXPOSE 8080
CMD [ "node", "server.js" ]

# docker build . -t refazul/express-graphql
# docker run -dit -p 8000:8080 --name test refazul/express-graphql