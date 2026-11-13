FROM node:24-bookworm-slim
ENV NODE_ENV=development
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.json ./
COPY api ./api
USER node
EXPOSE 3000
CMD ["npm", "run", "dev"]
