# Multi-stage build for production optimization

# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create non-root user
RUN addgroup -g 1001 -S nginx
RUN adduser -S luxify -u 1001 -G nginx

# Set ownership
RUN chown -R luxify:nginx /usr/share/nginx/html
RUN chown -R luxify:nginx /var/cache/nginx
RUN chown -R luxify:nginx /var/log/nginx
RUN chown -R luxify:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid
RUN chown -R luxify:nginx /var/run/nginx.pid

# Switch to non-root user
USER luxify

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
