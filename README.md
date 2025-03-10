## Implementing a Distributed App System: Holi Registration Web App - Leveraging Docker, Kubernetes, and GitHub.

A comprehensive distributed system developed by Aswathy Alen Joby, Kishan Mishra, Vishal Kuruba, and Maria Babu showcasing event registration functionality with containerized architecture.

## Project Overview
This project implements a modern, containerized distributed application with a complete stack:
- Web frontend displaying the Holi Registration event management interface
- RESTful API backend with user authentication and data handling
- PostgreSQL database for persistent storage
- Full Docker containerization for consistent development and deployment

### Key Features
- User Management System: Create, retrieve, and manage user accounts
- Event Registration: Holi celebration registration system with event details and registration 
  form
- API Documentation: Interactive API documentation with OpenAPI 3.1 support
- Containerized Architecture: Fully Dockerized with multi-container configuration
- Database Integration: PostgreSQL database with persistent storage

### Components
- Frontend (HTML, CSS, JavaScript)
- Backend (Python with Flask/FastAPI)
- Database (PostgreSQL)
- Docker containerization
- Kubernetes orchestration
- Monitoring with Prometheus

### Architecture
The application follows a three-tier architecture:
- Frontend: HTML, CSS, JavaScript
- Backend: Python with FastAPI (API version 0.1.0)
- Database: PostgreSQL

### Docker Components
- Frontend container (Nginx)
- Backend container (Python/FastAPI)
- Database container (PostgreSQL)
- Custom networking with Docker Compose

## Setup Instructions
Before running the application, ensure that you have the following installed:
- **Docker**: For containerizing the application and running containers locally.
- **Kubernetes**: You can use Minikube or Docker Desktop for local Kubernetes deployment, or a cloud-based Kubernetes service.
- **Git**: For cloning the repository.
- **Python 3.x**: For running the backend API locally.
  
### Steps to Run Locally
1. **Ensure Docker and Docker Compose are installed on your system**
2. **Clone the repository**:
      - git clone -b feature-enhancement-docker https://github.com/bunny96-s/distributed-app.git
3. **Navigate to the project directory**:
      - cd distributed-app

4. **Set Up the Virtual Environment for Python**:
   - python3 -m venv venv
        source venv/bin/activate -- For Linux/macOS
        .\venv\Scripts\activate  -- For Windows
     
5. **Install Backend Dependencies**:
   - pip install -r requirements.txt

6. **Create a .env file with the following environment variables**:
      - POSTGRES_USER={username}
        POSTGRES_PASSWORD={password}
        POSTGRES_DB=app_db
        
7. **Build and run the containers**:
   - docker-compose up -d

8. **Verify all containers are running**:
     - docker-compose ps
       
9. **Access the application locally**:
   - Frontend: http://localhost
   - Backend: http://localhost:8000
   - API Documentation: http://localhost:8000/docs
  
### Kubernetes Deployment
1. **Install Kind (Kubernetes in Docker)**:
     -  curl -Lo ./kind "https://kind.sigs.k8s.io/dl/v0.22.0/kind-linux-amd64"
     -  chmod +x ./kind
     -  sudo mv ./kind /usr/local/bin/kind

  
2. **Create a Kind Cluster**:
     -  kubectl apply -f kubernetes/
       
3. **Create the persistent volume claim first**
     - sudo kind create cluster --name my-cluster

4. **Push Docker Images to Docker Hub** 
    - sudo docker tag distributed-app_frontend:latest <your-dockerhub-username>/distributed- 
      app_frontend:latest
    - sudo docker tag distributed-app_backend:latest <your-dockerhub-username>/distributed- 
      app_backend:latest
    - sudo docker tag distributed-app_db:latest <your-dockerhub-username>/distributed- 
      app_db:latest
    - sudo docker push <your-dockerhub-username>/distributed-app_frontend:latest
    - sudo docker push <your-dockerhub-username>/distributed-app_backend:latest
    - sudo docker push <your-dockerhub-username>/distributed-app_db:latest

      
3. **Update Kubernetes YAML Files**:
   - - name: backend
     image: <your-dockerhub-username>/distributed-app_backend:latest
Repeat this for all deployments (frontend, backend, and database).

4. **Deploy the Application**:
    - sudo kubectl apply -f k8s/config/postgres-pvc.yaml
    - sudo kubectl apply -f k8s/config/db-credentials.yaml
    - sudo kubectl apply -f k8s/deployments/
    - sudo kubectl apply -f k8s/services/
    - sudo kubectl apply -f k8s/config/prometheus-configmap.yaml
     
5. **Verify the Deployment**:
    - sudo kubectl get pods
    - sudo kubectl get services
 
6. **Access the Application**:
    - http://localhost:{NodePort} # Change the node port to access frontend, backend and prometheus accordingly.

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

## Error Responses
The API follows standard HTTP status codes:
- 200: Success
- 400: Bad request
- 401: Unauthorized
- 404: Resource not found
- 500: Server error







