FROM node:20-alpine

# Set work dir inside container
WORKDIR /app

# Copy package.json and lock file first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your code
COPY . .

# Expose API port
EXPOSE 3000

# Start your dev server or production build
CMD ["npm", "run", "dev"]
