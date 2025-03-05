FROM node:20-alpine AS development

WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package*.json ./

# Install dependencies including development ones
RUN npm install -g pnpm && \
    pnpm install

# Copy source code
COPY . .

# Expose the port
EXPOSE 3000

# Start the development server
CMD ["pnpm", "run", "start:dev"] 