# CloudCart - Azure AKS Cloud Deployment

## Project Overview

CloudCart is a cloud-native e-commerce application deployed on Microsoft Azure using Azure Kubernetes Service (AKS).

The application follows a three-tier architecture:

- Frontend: React.js application
- Backend: Flask REST API
- Database: Azure Database for PostgreSQL Flexible Server

The project demonstrates containerization, Kubernetes orchestration, CI/CD automation, secure secret management, and production-style networking using Ingress.

---

# Architecture

```
                         Users
                           |
                           |
                    Azure Public IP
                     (Ingress IP)
                           |
                           |
              NGINX Ingress Controller
                           |
             ----------------------------
             |                          |
             |                          |
             ▼                          ▼

     Frontend Service             Backend Service
       (ClusterIP)                 (ClusterIP)

             |                          |
             ▼                          ▼

      React Frontend Pod          Flask Backend Pod
                                        |
                                        |
                              Kubernetes Secret
                                        |
                                        |
                              Azure PostgreSQL

```

---

# Technology Stack

| Component | Technology |
|-----------|------------|
| Frontend | React.js |
| Backend | Flask Python |
| Containerization | Docker |
| Container Registry | Azure Container Registry |
| Kubernetes Platform | Azure Kubernetes Service |
| Database | Azure PostgreSQL Flexible Server |
| CI/CD | GitHub Actions |
| Networking | NGINX Ingress Controller |
| Cloud Provider | Microsoft Azure |

---

# Application Flow

1. User accesses the application through the Ingress public IP.

2. NGINX Ingress Controller routes traffic:

```
/        → Frontend Service
/api     → Backend Service
```

3. React frontend sends API requests to the backend.

Example:

```
GET /api/products
```

4. Flask backend processes the request.

5. Backend connects to Azure PostgreSQL and retrieves product data.

6. Database response is returned back to the frontend.

---

# Backend API

## Get Products

Endpoint:

```
GET /api/products
```

Response:

```json
[
 {
  "id":1,
  "name":"Laptop",
  "price":75000
 },
 {
  "id":2,
  "name":"Phone",
  "price":30000
 }
]
```

---

# Docker Implementation

Both frontend and backend are containerized.

## Backend Image

```
cloudcartacr001.azurecr.io/backend
```

## Frontend Image

```
cloudcartacr001.azurecr.io/frontend
```

Images are stored in Azure Container Registry (ACR).

---

# Kubernetes Implementation

Resources created:

## Deployments

```
cloudcart-backend
cloudcart-frontend
```

Deployments manage application pods and rolling updates.

---

## Services

Frontend:

```
frontend-service
```

Backend:

```
backend-service
```

Both services use ClusterIP and communicate internally inside AKS.

---

## Kubernetes Secret

Database credentials are stored securely using Kubernetes Secrets.

Stored values:

```
DB_HOST
DB_USER
DB_PASSWORD
DB_NAME
```

The backend application consumes these values as environment variables.

---

# Database

Azure PostgreSQL Flexible Server is used as the managed database service.

Database:

```
cloudcart
```

Table:

```
products
```

Schema:

| Column | Type |
|--------|------|
| id | SERIAL |
| name | VARCHAR |
| price | INTEGER |

---

# CI/CD Pipeline

GitHub Actions automates the complete deployment process.

Pipeline:

```
Developer
    |
    |
 git push
    |
    |
GitHub Actions
    |
    |
Docker Build
    |
    |
Push Image to ACR
    |
    |
Connect to AKS
    |
    |
Update Kubernetes Deployment
    |
    |
New Pod Deployment
```

---

# CI/CD Steps

1. Checkout source code

2. Authenticate with Azure

3. Login to Azure Container Registry

4. Build Docker image

5. Push image to ACR

6. Connect to AKS cluster

7. Deploy updated image

8. Verify rollout status

---

# Ingress Implementation

Initially:

```
Frontend → LoadBalancer IP
Backend  → LoadBalancer IP
```

After implementing NGINX Ingress:

```
Single Public IP

       |
       |
Ingress Controller

       |
 ------------------
 |                |

Frontend        Backend

```

Benefits:

- Single entry point
- Path-based routing
- Reduced public IP usage
- Production-style architecture

---

# Scaling

Kubernetes allows horizontal scaling.

Example:

```
kubectl scale deployment cloudcart-backend --replicas=5
```

Creates multiple backend pods:

```
Backend Deployment

 |
 |-- Pod 1
 |-- Pod 2
 |-- Pod 3
 |-- Pod 4
 |-- Pod 5
```

---

# Security

Implemented:

- Kubernetes Secrets for sensitive information
- Database credentials not stored in code
- Backend-only database access
- Container images stored securely in ACR

---

# Future Improvements

- Azure Monitor + Container Insights
- Horizontal Pod Autoscaling
- TLS/HTTPS certificates
- Azure Key Vault integration

---

# Author
Athyul Thomas V S - Cloud Engineer
CloudCart Azure AKS Project
