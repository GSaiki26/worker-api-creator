# Basics
FROM node:20-alpine
WORKDIR /app

# Env
ENV TZ="America/Sao_Paulo"

# Update the container
RUN apk upgrade --no-cache --update;
RUN apk add --no-cache tzdata;
RUN npm i -g npm;

# Configure the user
# RUN chown node /app;
# USER node

# Install the dependencies
COPY --chown=node ./package.json .
COPY --chown=node ./yarn.lock .
RUN yarn install

# Copy the project
COPY --chown=node ./certs ./certs
COPY --chown=node ./tsconfig.json .

COPY --chown=node ./src ./src

# Run the project
RUN yarn run build
CMD yarn run start:prod
