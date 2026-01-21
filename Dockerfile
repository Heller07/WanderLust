# Use official Node LTS
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm ci --omit=dev

# Copy rest of the application
COPY . .

# Environment
ENV NODE_ENV=production

# App runs on 8080
EXPOSE 8080

# Start the app
CMD ["node", "app.js"]
