# MediHerb

## Project Description

MediHerb is a comprehensive web application of Ayurvedic Doctor Recommendation System and Pharmacy Directory.
Key features include:

- **User Management**: Registration, login, and profile management for users.
- **Doctor Management**: Admin can add, update, and manage doctor profiles.
- **Pharmacy Management**: Admin can manage pharmacy listings and details.
- **Drug Management**: Pharmacies can manage their drug inventory.
- **Chatbot Integration**: An AI-powered chatbot using NLP models to recommended doctors based on symptoms.
- **Responsive Frontend**: Built with React, Material-UI, and Bootstrap for a modern user interface.

The application consists of three main components:
- **Backend**: Node.js/Express server with MongoDB for data storage.
- **Frontend**: React application for user interaction.
- **Server**: Python/FastAPI service for the chatbot functionality.

## Prerequisites

Before running the application, ensure you have the following installed:
- Node.js (version 14 or higher)
- npm or yarn
- Python (version 3.8 or higher)
- MongoDB (running locally or accessible via connection string)
- Git

## Project Initialization Steps

### 1. Clone the Repository
```bash
git clone <repository-url>
cd MediHerb
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mediherb
JWT_SECRET=your_jwt_secret_key
```

### 3. Frontend Setup
Navigate to the frontend directory and install dependencies:
```bash
cd ../frontend
npm install
```

### 4. Server (Chatbot) Setup
Navigate to the server directory, create a virtual environment, and activate it:
```bash
cd ../server
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
# source venv/bin/activate
```

Install Python dependencies:
```bash
pip install -r requirements.txt
```

Install the required spaCy models:
```bash
pip install https://s3-us-west-2.amazonaws.com/ai2-s2-scispacy/releases/v0.5.4/en_core_sci_sm-0.5.4.tar.gz
pip install https://s3-us-west-2.amazonaws.com/ai2-s2-scispacy/releases/v0.5.4/en_ner_bc5cdr_md-0.5.4.tar.gz
```

### 5. Database Setup
Ensure MongoDB is running. If using a local instance, start MongoDB service.

## Running the Application

### 1. Start the Backend Server
In the backend directory:
```bash
npm run dev
```
The backend will run on `http://localhost:5000`.

### 2. Start the Frontend Application
In the frontend directory:
```bash
npm start
```
The frontend will run on `http://localhost:3000`.

### 3. Start the Chatbot Server
In the server directory:
```bash
python run.py
```
Or using uvicorn:
```bash
uvicorn app.main:app --reload
```
The chatbot service will run on `http://localhost:8000`.

### 4. Access the Application
Open your browser and navigate to `http://localhost:3000` to access the MediHerb application.

## Additional Notes

- Ensure all services are running simultaneously for full functionality.
- The chatbot requires the NLP models to be downloaded and installed as specified.
- For production deployment, consider using environment variables for sensitive data and configuring proper CORS settings.
- The training folder contains a Jupyter notebook for model training if needed.

## Contributing

Please follow standard Git workflow for contributions. Ensure all dependencies are installed and tests pass before submitting pull requests.

## License

This project is licensed under the ISC License.
