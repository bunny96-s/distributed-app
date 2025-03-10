## Implementing a Distributed App System: Holi Registration Web App - Leveraging Docker, Kubernetes, and GitHub.

A comprehensive distributed system developed by Aswathy Alen Joby, Kishan Mishra, Vishal Kuruba, and Maria Babu showcasing event registration functionality with containerized architecture.

## Project Overview
This project implements a modern, containerized distributed application with a complete stack:
- Web frontend displaying the Holi Registration event management interface
- RESTful API backend with user authentication and data handling
- PostgreSQL database for persistent storage
- Full Docker containerization for consistent development and deployment

**Key Features**
- User Management System: Create, retrieve, and manage user accounts
- Event Registration: Holi celebration registration system with event details and registration 
  form
- API Documentation: Interactive API documentation with OpenAPI 3.1 support
- Containerized Architecture: Fully Dockerized with multi-container configuration
- Database Integration: PostgreSQL database with persistent storage

## Components
- Frontend (HTML, CSS, JavaScript)
- Backend (Python with Flask/FastAPI)
- Database (PostgreSQL)
- Docker containerization
- Kubernetes orchestration
- Monitoring with Prometheus

## Architecture
The application follows a three-tier architecture:
- Frontend: HTML, CSS, JavaScript
- Backend: Python with FastAPI (API version 0.1.0)
- Database: PostgreSQL

## Docker Components
- Frontend container (Nginx)
- Backend container (Python/FastAPI)
- Database container (PostgreSQL)
- Custom networking with Docker Compose

## Setup Instructions
1. Clone the repository:
   - git clone -b feature-enhancement-docker https://github.com/bunny96-s/distributed-app.git
  
2. Navigate to the project directory:
   - cd distributed-app

3. Build and run the containers:
   - docker-compose up -d

4. Access the application:
   - Frontend: http://localhost
   - Backend: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## API Documentation
The API documentation is available through the interactive Swagger UI at http://localhost:8000/docs. The API follows OpenAPI 3.1 standards and provides the following endpoints:
**Core Endpoints**

**1. Health Check**
   - Endpoint: GET /api/health
   - Description: Verifies the API service is running properly
   - Response: Status of the API service
   - 
**2. User Management**
     
List Users
 - Endpoint: GET /api/users/
 - Description: Retrieves all users from the database
 - Response: Array of user objects
     
Create User
 - Endpoint: POST /api/users/
 - Description: Creates a new user
 - Request Body: User information (name, email, etc.)
 - Response: Created user object
     
Get User by ID
 - Endpoint: GET /api/users/{user_id}
 - Description: Retrieves a specific user by ID
 - Path Parameter: user_id - Unique identifier for the user
 - Response: User object
       
## Authentication
Authentication is handled through JWT tokens. To use protected endpoints:
1. Obtain a token through the authentication endpoint
2. Include the token in the Authorization header of subsequent requests

## Error Responses
The API follows standard HTTP status codes:
- 200: Success
- 400: Bad request
- 401: Unauthorized
- 404: Resource not found
- 500: Server error
  
## Deployment Guide
**Local Deployment with Docker Compose**
   1. Ensure Docker and Docker Compose are installed on your system
   2. Clone the repository:
      - git clone -b feature-enhancement-docker https://github.com/bunny96-s/distributed-app.git
   3. Navigate to the project directory:
      - cd distributed-app
   4. Create a .env file with the following environment variables (or adjust as needed):
      - POSTGRES_USER=kishan98
        POSTGRES_PASSWORD=testdb
        POSTGRES_DB=app_db
  5. Build and start the containers:
     - docker-compose up -d
  6. Verify all containers are running:
     - docker-compose ps

 **Kubernetes Deployment**
   1. Make sure you have kubectl configured with access to your Kubernetes cluster
   2. Apply the Kubernetes configuration files:
      - kubectl apply -f k8s/namespace.yaml
      - kubectl apply -f k8s/database.yaml
      - kubectl apply -f k8s/backend.yaml
      - kubectl apply -f k8s/frontend.yaml
  3. Verify the deployments are running:
     - kubectl get pods -n distributed-app
  4. Set up an Ingress or LoadBalancer service to expose the application externally





