FROM node:alpine

WORKDIR /usr/src/app

# Copy package files first
COPY package*.json ./

# Install dependencies including chart.js
RUN npm install --legacy-peer-deps
RUN npm install chart.js --save
RUN npm install -g @angular/cli

# Copy the rest of the application
COPY . .

# Start the application
CMD ["ng", "serve", "--host", "0.0.0.0"]