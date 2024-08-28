FROM node:lts-bookworm-slim

RUN npm install -g npm@latest

# Install bun globally
RUN npm install -g bun

WORKDIR /app

# Copy NPM/TypeScript configuration
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY tsconfig.json tsconfig.json

# Copy Stackr files
COPY index.js .
COPY deployment.json .
COPY genesis-state.json .
COPY stackr.config.ts .

# Copy source code
COPY src src

# Install dependencies
RUN npm install

ENV VULCAN_RPC https://sepolia.vulcan.stf.xyz
ENV L1_RPC https://rpc2.sepolia.org
ENV REGISTRY_CONTRACT 0x985bAfb3cAf7F4BD13a21290d1736b93D07A1760
ENV NODE_ENV production
ENV DATABASE_URI /db/mru.sqlite
ENV DOMAIN_VERSION 0.1.0
ENV PORT 3210

# Command to run the application
CMD ["npm", "start"]
