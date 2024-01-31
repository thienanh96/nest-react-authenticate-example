# Use an official Node.js runtime as a base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

COPY . .

# Install the application dependencies
RUN npm install && npm run build

EXPOSE 3000

# Define the command to run your application
CMD ["npm", "run", "start:prod"]
