# Sample Bank

Sample Bank allows you to manage your account, choose the cheaper account plan based on your needs and find the nearest branch from your location.  

## Live Demo

Credentials:  
Branch: 0001   
Account number: 12345   
Password: Qwerty@123  

[Access Live Demo](https://samplebank.amirelemam.com/)

## Table of Contents
- [Architecture](#architecture)
- [Services](#services)
- [Requirements](#requirements)
- [Run](#run)
- [Backend](#backend)
  * [Account Manager](#account-manager)
  * [Plan Simulator](#plan-simulator)
  * [Branch Finder](#branch-finder)
- [Frontend](#frontend)
- [Generate Architecture Diagram](#generate-architecture-diagram)
- [License](#license)

## Architecture
<img src="./architecture-diagram/sample_bank_architecture.png" alt="Architecure Diagram" />

## Services

- Account Manager: Transfer and get balance of Savings and Checking accounts  
- Plan Simulator: Check the cheapest plan based on your needs  
- Branch Finder: Find the nearest branch to your location  
- Frontend: Application interface  

## Requirements

- Node.js 12+  
- PostgreSQL 12+  
- MongoDB 4.2+  
- Google Maps API key  
- Docker (optional)

## Run

You can run all services with docker-compose (now a Docker command)   
`$ docker compose up --build`  
After all services are up, go to each service and populate the tables on the database (you can find the routes on Postman)  

## Backend

### Account Manager

**Features**  
- Transfer money between accounts  
- Get balance for Savings and Checking accounts  

**Stack**
- Node.js
- Jest
- PostgreSQL

**External Services**
- PostgreSQL

**Environment Variables**
- DB_HOST: Postgres host
- DB_USER: Postgres user
- DB_PASSWORD: Postgres password
- DB_NAME: Postgres DB name
- SECRET_TOKEN: Secret used to create JWT tokens

**Docs**

[Live OpenAPI (former Swagger)](`https://account-manager-vikfo2njwa-uc.a.run.app/api/docs`)   
Postman collection on `./backend/account-manager/src/docs/postman.json`  

**Run**

- Docker (recommended)  
  Make sure you have the `.env` file with the environment variables  
  `$ test -e ./backend/account-manager/.env && echo file exists || echo file not found`  
  Add permission to execute the script  
  `$ chmod +x startAccountManagerWithDocker.sh`  
  Run the script  
  `$ ./startAccountManagerWithDocker`  
  **On first run: populate tables on DB (you can find the route on Postman)**  

- Local  
  Go to the service folder  
  `$ cd backend/account-manager`  
  Install dependencies  
  `$ npm install`  
  Run tests  
  `$ npm test`  
  Start service  
  `$ npm run start:local`  
  **On first run: populate tables on DB (you can find the route on Postman)**  

### Plan Simulator

**Features**  
- Simulate which plan is cheaper for your needs: Basic or Pro
- Get pricing for all plans

**Stack**
- Node.js
- Jest
- PostgreSQL

**External Services**
- PostgreSQL

**Environment Variables**
- DB_HOST: Postgres host
- DB_USER: Postgres user
- DB_PASSWORD: Postgres password
- DB_NAME: Postgres DB name

**Docs**

[Live OpenAPI (former Swagger)](`https://plan-simulator-vikfo2njwa-uc.a.run.app/api/docs`)   
Postman collection on `./backend/plan-simulator/src/docs/postman.json`  

**Run**

- Docker (recommended)   
  Make sure you have the `.env` file with the environment variables  
  `$ test -e ./backend/plan-simulator/.env && echo file exists || echo file not found`  
  Add permission to execute the script  
  `$ chmod +x startPlanSimulatorWithDocker.sh`  
  Run the script  
  `$ ./startPlanSimulatorWithDocker`  
  **On first run: populate tables on DB (you can find the route on Postman)**  

- Local  
  Go to the service folder  
  `$ cd backend/plan-simulator`  
  Install dependencies  
  `$ npm install`  
  Run tests  
  `$ npm test`  
  Start service  
  `$ npm run start:local`  
  **On first run: populate tables on DB (you can find the route on Postman)**   

### Branch Finder

**Stack**
- Typescript
- Jest
- MongoDB

**External Services**  
- MongoDB  

**Features**  
- Find the nearest branch to the given location (latitude, longitude).  

**Environment Variables**
- DB_CONN_STR: MongoDB connection string

**Docs**

[Live OpenAPI (former Swagger)](`https://branch-finder-vikfo2njwa-uc.a.run.app/api/docs`)   
Postman collection on `./backend/branch-finder/src/docs/postman.json`  

**Run**

- Docker (recommended)  
  Make sure you have the `.env` file with the environment variables  
  `$ test -e ./backend/branch-finder/.env && echo file exists || echo file not found`  
  Add permission to execute the script  
  `$ chmod +x startBranchFinderWithDocker.sh`  
  Run the script  
  `$ ./startBranchFinderWithDocker`  
  **On first run: populate tables on DB (you can find the route on Postman)**  

- Local  
  Go to the service folder  
  `$ cd backend/branch-finder`  
  Install dependencies  
  `$ npm install`  
  Run tests  
  `$ npm test`  
  Start service  
  `$ npm run start:local`  
  **On first run: populate tables on DB (you can find the route on Postman)**  

## Frontend

**Stack**
- React.js
- Material UI

**External Services**  
- Google Maps API  

**Environment Variables**
- ACCOUNT_MANAGER_API: Account Manager backend URL
- PLAN_SIMULATOR_API: Plan Simulator backend URL
- BRANCH_FINDER_API: Branch Finder backend URL
- Google Maps key (on `public/index.html`)

**Requirements**

- [Generate Google Maps API Key](https://developers.google.com/maps/documentation/javascript/get-api-key)
- [Enable Places API](https://console.cloud.google.com/marketplace/product/google/places-backend.googleapis.com)
- [Enable Geocoding API](https://console.cloud.google.com/marketplace/product/google/geocoding-backend.googleapis.com)
- [Enable Maps Javascript API](https://console.cloud.google.com/marketplace/product/google/maps-backend.googleapis.com)

**Run**

Before running, you need to replace the Google Maps API Key on `./frontend/public/index.html`  

- Docker (recommended)  
  Make sure you have the `.env` file with the environment variables  
  `$ test -e ./fronend/.env && echo file exists || echo file not found`  
  Add permission to execute the script  
  `$ chmod +x startFrontendWithDocker.sh`  
  Run the script  
  `$ ./startFrontendWithDocker`

- Local  
  Go to the service folder  
  `$ cd frontend`  
  Install dependencies  
  `$ npm install`  
  Start service  
  `$ npm start`

### Generate Architecture Diagram

The architecture diagram was generated using Python's lib [Diagram](https://diagrams.mingrammer.com/).  

**Requirements**

- Python 3.7+  
- Graphviz  
For MacOS: `$ brew install graphviz`  
For another OS, check [the installation info](https://graphviz.org/download)  

**Install**  
- Install dependencies  
`$ pip install -r requirements.txt`  

**Run**  
- Generate diagram  
`$ python architecure-diagram.py`  

The file will be saved on the current working directory.  

## License

These files are licensed under the [MIT License](LICENSE)
