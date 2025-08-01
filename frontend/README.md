# 🧠 Support Ticket Classification System

An intelligent web-based system that automatically classifies support tickets into appropriate departments (IT, HR, Finance) using a machine learning model. Built with **FastAPI**, **Next.js**, **Supabase**, and **scikit-learn**, this full-stack application streamlines support workflows and boosts response efficiency.

---

## 🌐 Live Demo

👉 [View Deployed App](https://your-deployment-url.com) *(replace with actual link)*

---

## 🎯 Key Features

- 🧾 **Ticket Submission Interface** (via Next.js)
- 🤖 **Real-Time Department Prediction** using an ML model
- 🔐 **User Authentication** (Signup, Login, Logout, Forgot Password)
- 📜 **Prediction History Logging** per user
- 📊 **Department-wise classification** (IT, HR, Finance)
- 🌍 **Supabase integration** for user & ticket storage
- ⚡ **FastAPI backend** for scalable API endpoints

---

## 🛠️ Tech Stack

| Layer       | Technology                                  |
|-------------|---------------------------------------------|
| Frontend    | Next.js, TypeScript, Tailwind CSS           |
| Backend     | FastAPI, Python, Uvicorn                    |
| ML Model    | scikit-learn (Naive Bayes or similar)       |
| Database    | Supabase (PostgreSQL)                       |
| Auth        | Supabase Auth + bcrypt                      |
| Hosting     | Vercel (frontend), Render/Heroku (backend)  |

---

## 📁 Project Structure

support-ticket-classification-system/
├── backend/
│ ├── main.py # FastAPI backend with endpoints
│ ├── model.pkl # Trained ML model
│ ├── requirements.txt # Python dependencies
│ └── utils/ # Helper functions for prediction
├── frontend/
│ ├── src/
│ │ ├── app/ # Next.js App directory
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Login, Signup, Dashboard
│ │ └── utils/ # API helpers
│ └── tailwind.config.ts # Styling config
└── README.md


---

## 🧠 How the ML Works

1. Preprocessed historical ticket data (text + labels)
2. Trained using scikit-learn (e.g., MultinomialNB)
3. Serialized to `model.pkl`
4. FastAPI loads model and classifies new tickets on submission
5. Predicted department and confidence returned to frontend

---

## 🚀 Getting Started

### 🖥️ Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload

🌐 Frontend

cd frontend
npm install
npm run dev
Access the app at http://localhost:3000

🧪 API Endpoints (FastAPI)
POST /signup – Register user

POST /login – Authenticate user

POST /predict – Predict department based on ticket text

POST /forgot-password – Changs password

🔒 Authentication Flow

Users sign up with name, email, password

Login returns session info

Local storage maintains session

Logout clears session


👨‍💻 Author
Leo Mazive
Full Stack Developer | ML Enthusiast
📧 [your-email@example.com]
