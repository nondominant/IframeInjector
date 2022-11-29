FROM node:12.18.1
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
COPY server.js ./
COPY start ./
RUN chmod +x start
RUN mkdir public
COPY public/ ./public/
COPY example/ ./example/
RUN apt-get install -y python3
CMD ./start && python3 -m http.server 3000



