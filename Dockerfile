FROM mhart/alpine-node

ARG NOW_GITHUB_COMMIT_REF

# Add curl for examples script fetch
RUN apk add --no-cache curl

# Set the default working directory
WORKDIR /usr/src

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn

# Copy the relevant files to the working directory
COPY . .

ENV NOW_GITHUB_COMMIT_REF=$NOW_GITHUB_COMMIT_REF

# Build and export the app
RUN yarn build && yarn export -o /public
