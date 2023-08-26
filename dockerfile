FROM node:18.16.0

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install


# Copy the rest of the application code
COPY . .

# Expose the port your app runs on (assuming it's 3100)
EXPOSE 3100

# Command to run your app using index.js as the entry point
CMD ["node", "index.js"]
