# Latest node lts image
FROM node:lts-alpine3.14 As development
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
# Build step for development
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
# Install development dependencies
RUN yarn --only=development
# Copy the source code to app dir
COPY . .
# Expose port 8080 on the container
EXPOSE 8080
# Run the app
CMD ["yarn", "run", "serve"]

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
# Transpile ES6+ code to ES5
RUN yarn run build
# Run app
CMD ["node", "dist/main"]
