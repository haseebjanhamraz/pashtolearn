# Use Node.js
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Expose Vite default port
EXPOSE 5173

# Run Vite dev server
CMD ["npm", "run", "dev"]
