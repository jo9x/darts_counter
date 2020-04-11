FROM node:10
WORKDIR /dartsCounter
COPY package.json /dartsCounter
RUN npm install
COPY . /dartsCounter
CMD ["npm","start"]
