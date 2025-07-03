# 💰 Budget Tracker

A responsive and themeable React-based budget tracking app that helps users monitor income and expenses in real-time with visualizations and Firebase authentication.

## 🔥 Features

- ✅ Add & delete transactions
- ✅ Real-time balance updates
- ✅ Income vs Expense doughnut chart
- ✅ Dark/Light theme toggle
- ✅ Sound toggle (🔊/🔇)
- ✅ Firebase Authentication (Sign Up / Login / Logout)
- ✅ Personalized dashboard for each user
- ✅ Responsive UI
- ✅ Toast notifications

## 🎥 Demo (YouTube)

👉 [Watch Demo on YouTube](https://youtu.be/LPnj2ZLSb_k?si=Ji8kakjMIDlm-r_Z)

## 🛠 Tech Stack

- **Frontend:** React, Chart.js, CSS
- **Backend:** Firebase Authentication
- **Tools:** React Toastify, GitHub

## 🚀 Getting Started

1. **Clone the repo**

   ```git clone https://github.com/Shweta4499/Budget_Tracker.git```
   
   ```cd Budget_Tracker```
3.  Install dependencies
   ```npm install```
3.Add Firebase Config
 Create a firebase.js file inside src/firebase/ with the following:
 ```
 import { initializeApp } from "firebase/app";
 import { getAuth } from "firebase/auth";
 const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
 };

 const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);
```
4. Run the app
   ```npm start```


   🙋‍♀️ Author
Made with ❤️ by Shweta Gurav

