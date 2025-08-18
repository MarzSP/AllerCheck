FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY .. .

# Expose Vite dev server port
EXPOSE 5173

# Start with host binding (important for Docker networking)
CMD ["npm", "run", "dev", "--", "--host"]
