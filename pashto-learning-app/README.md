# Pashto Learning App

## Overview

The Pashto Learning App is a full-stack application designed to help users learn the Pashto language. It consists of a frontend built with React and a backend powered by Node.js and Express.

## Project Structure

```
pashto-learning-app
├── backend
│   ├── src
│   │   └── index.js
│   ├── package.json
│   └── Dockerfile
├── frontend
│   ├── src
│   │   └── App.js
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Setup

1. Clone the repository:

   ```
   git clone <repository-url>
   cd pashto-learning-app
   ```

2. Build and run the application using Docker Compose:
   ```
   docker-compose up --build
   ```

### Accessing the Application

- The frontend will be available at `http://localhost:5173`
- The backend API will be available at `http://localhost:5000`

## Usage

- Follow the instructions on the frontend to navigate through the learning modules.
- The backend handles all API requests and serves the necessary data to the frontend.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.
