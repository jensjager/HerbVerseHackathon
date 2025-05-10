    # Use official Node.js image
    FROM node:21.7.1

    # Set working directory
    WORKDIR /app

    # Copy package files and install dependencies
    COPY package*.json ./

    # Install dependencies
    RUN npm install

    RUN apt-get update && apt-get install -y postgresql-client

    # Copy the rest of the application files
    COPY . .

    # Build the TypeScript code
    RUN npm run build

    ## Add the wait script to the image
    ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.11.0/wait /wait
    RUN chmod +x /wait

    # Expose the application port
    EXPOSE 5000

    # Start the server
    CMD sh -c "/wait && npm run start"