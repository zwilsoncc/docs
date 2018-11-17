FROM mhart/alpine-node

# Add curl for examples script fetch
RUN apk add --no-cache curl

# Set the default working directory
WORKDIR /usr/src

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn

# Copy the relevant files to the working directory
COPY . .

# Build and export the app
RUN yarn build && yarn export -o /public
