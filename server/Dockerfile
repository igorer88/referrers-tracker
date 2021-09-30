# Latest node lts image
FROM node:lts-alpine3.14 As development
# Build step for development
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
# Install development dependencies
RUN yarn --only=development
# Copy the source code to app dir
COPY . .
# Container exposed network port number
EXPOSE 7500
# Run app
CMD ["yarn", "run", "dev"]

# Latest node lts image
FROM node:lts-alpine3.14 as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
# Build step for production
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
# Install production dependencies
RUN yarn --only=production
# Copy the source code to app dir
COPY . .
COPY --from=development /usr/src/app/dist ./dist
# Run app
CMD ["node", "app.js"]
