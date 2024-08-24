FROM node:lts-bookworm-slim

RUN npm install -g npm@latest

# Install bun globally
RUN npm install -g bun

WORKDIR /app

# Copy package.json and tsconfig.json
COPY package.json package.json
COPY jsconfig.json jsconfig.json

# Copy Stackr files
COPY deployment.json deployment.json
COPY genesis-state.json genesis-state.json
COPY stackr.config.js stackr.config.js

# Copy source code
COPY src src

# Install dependencies
RUN npm install

# Command to run the application
CMD ["npm", "start"]
