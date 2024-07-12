# Use the official Node.js image as the base image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# to be checked with 
####

# Build the React app
RUN npm run build

# Install an HTTP server to serve static files
RUN npm install -g serve

# Expose the port that the frontend listens on
EXPOSE 3000

# Command to run the frontend server
CMD ["serve", "-s", "build"]