# Use an official Node.js runtime as a base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app
RUN apt update -y && apt-get install -y xdg-utils

# Copy package.json and package-lock.json to the working directory
COPY . .

# Install the application dependencies
RUN npm install && npm run build

EXPOSE 3001

# Define the command to run your application
CMD ["npm", "run", "start"]
