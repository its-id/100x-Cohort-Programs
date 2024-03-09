# Use the official image as a base image
FROM node:alpine

# Set the working directory
WORKDIR /app

# Copy the all files to the working directory
COPY package.json package-lock.json ./
COPY prisma ./prisma

# Install dependencies and build the project
RUN npm install

# Copy the rest of the files to the working directory
COPY . .

# Build the project
RUN npm run build

# Generate the prisma client
RUN npx prisma generate

# Expose a port where the app will run
ENV PORT=3000

# Go to the `dist` directory and run the `node index.js` file
CMD ["node", "dist/index.js"]