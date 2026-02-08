import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-database.js";

// Firebase config (replace with yours)
const firebaseConfig = {
  apiKey: "AIzaSyCO25iHc8wuGiKJjMBRMXzPRsW51c6o8p4",
  authDomain: "my-portfolio-9d5aa.firebaseapp.com",
  databaseURL: "https://my-portfolio-9d5aa-default-rtdb.firebaseio.com/", // MUST end with /
  projectId: "my-portfolio-9d5aa",
  storageBucket: "my-portfolio-9d5aa.appspot.com",
  messagingSenderId: "830401755026",
  appId: "1:830401755026:web:51a57d8773dd58a780734b",
  measurementId: "G-12XPCCSLRL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Form handling
const form = document.getElementById("feedbackForm");
const status = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    status.textContent = "⚠️ All fields are required!";
    status.style.color = "orange";
    return;
  }

  try {
    // Create a new feedback reference
    const feedbackRef = push(ref(database, "feedback"));

    // Save data
    await set(feedbackRef, {
      name,
      email,
      message,
      createdAt: new Date().toISOString()
    });

    status.textContent = "✅ Feedback sent successfully!";
    status.style.color = "#22c55e";
    form.reset();
    console.log("✅ Feedback saved to Firebase");

  } catch (error) {
    console.error("❌ Error saving feedback:", error);
    status.textContent = "❌ Error sending feedback. Check console.";
    status.style.color = "red";
  }
});
