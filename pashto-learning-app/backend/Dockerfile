FROM node:20-alpine

WORKDIR /

# Copy dependencies
COPY package*.json ./
RUN npm install --production

# Copy source
COPY . .

EXPOSE 5000

CMD ["npm", "start"]
