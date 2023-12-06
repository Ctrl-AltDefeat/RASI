# Use an official Nginx runtime as a parent image
FROM nginx:1.21

# Set the working directory to /app
WORKDIR /app

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy static files from Django app to Nginx directory
COPY ./static /app/static
