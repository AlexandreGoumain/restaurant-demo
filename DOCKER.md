# Docker Setup for Restaurant Website

## Prerequisites

- Docker installed on your machine
- Docker Compose (optional but recommended)

## Quick Start

### Using Docker Compose (Recommended)

**Production:**
```bash
docker-compose up --build
```

The app will be available at `http://localhost:3000`

**Development:**
```bash
# Uncomment the dev service in docker-compose.yml
docker-compose up dev --build
```

### Using Docker directly

**Production:**
```bash
# Build the image
docker build -t restaurant-app .

# Run the container
docker run -p 3000:3000 restaurant-app
```

**Development:**
```bash
# Build with development Dockerfile
docker build -f Dockerfile.dev -t restaurant-app-dev .

# Run with hot reload
docker run -p 3000:3000 -v $(pwd):/app -v /app/node_modules restaurant-app-dev
```

## File Structure

- `Dockerfile` - Production Docker image with multi-stage build
- `Dockerfile.dev` - Development Docker image with hot reload
- `docker-compose.yml` - Docker Compose configuration
- `.dockerignore` - Files to exclude from Docker context

## Configuration

The Docker setup uses:

- **Node.js 18 Alpine** for minimal image size
- **Multi-stage build** to reduce production image size
- **Non-root user** for security
- **Standalone output** for optimized production builds
- **Port 3000** as default

## Environment Variables

- `NODE_ENV=production` (default)
- `PORT=3000` (default)
- `HOSTNAME=0.0.0.0` (for Docker networking)

## Development vs Production

**Development:**
- Hot reload enabled
- Source code mounted as volume
- Development dependencies included
- Next.js dev server

**Production:**
- Optimized build
- Minimal image size
- Production dependencies only
- Standalone Next.js output