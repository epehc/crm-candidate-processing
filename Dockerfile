FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy project files and build
COPY . .
RUN npm run build

# Expose port if your app listens on a specific port (adjust if needed)
EXPOSE 3000

CMD ["npm", "start"]