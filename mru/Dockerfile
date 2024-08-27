FROM node:lts-bookworm-slim

RUN npm install -g npm@latest

# Install bun globally
RUN npm install -g bun

WORKDIR /app

# Copy package.json and tsconfig.json
COPY package.json package.json
COPY tsconfig.json tsconfig.json

# Copy Stackr files
COPY index.js index.js
COPY playground.js playground.js
COPY deployment.json deployment.json
COPY genesis-state.json genesis-state.json
COPY stackr.config.ts stackr.config.ts

# Copy source code
COPY src src

# Install dependencies
RUN npm install

ENV VULCAN_RPC https://sepolia.vulcan.stf.xyz
ENV L1_RPC https://rpc2.sepolia.org
ENV REGISTRY_CONTRACT 0x985bAfb3cAf7F4BD13a21290d1736b93D07A1760
ENV NODE_ENV production
ENV DATABASE_URI /db/mru.sqlite
ENV PORT 3210

# Command to run the application
CMD ["npm", "start"]
