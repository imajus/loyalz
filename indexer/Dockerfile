FROM guergeiro/pnpm:20-9 AS build
WORKDIR /app
COPY config.yaml .
COPY package.json .
COPY schema.graphql .
COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml .
COPY src src
RUN pnpm install
RUN pnpm run codegen
CMD ["npm", "start"]
