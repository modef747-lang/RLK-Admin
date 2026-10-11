// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// Aapki asli Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTexMaw7py4kaDW9cII-v9Ks3cRtZ8pRg",
  authDomain: "rlk-reader.firebaseapp.com",
  projectId: "rlk-reader",
  storageBucket: "rlk-reader.firebasestorage.app",
  messagingSenderId: "319262863085",
  appId: "1:319262863085:web:441f3dacafea5e694266e4",
  measurementId: "G-0ZZC89V99V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const form = document.getElementById('uploadForm');
const statusDiv = document.getElementById('status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const coverUrl = document.getElementById('coverUrlInput').value;
  const bookUrl = document.getElementById('bookUrlInput').value;

  statusDiv.style.color = 'blue';
  statusDiv.innerText = 'Saving ho raha hai... Intezar karein.';

  try {
    // Yahan 'pdfUrl' kar diya hai taake mobile app ke sath match ho jaye
    await addDoc(collection(db, "book"), {
      title: title,
      author: author,
      coverUrl: coverUrl,
      pdfUrl: bookUrl,
      createdAt: serverTimestamp()
    });

    statusDiv.style.color = 'green';
    statusDiv.innerText = 'Book database mein kamyabi ke sath save ho gayi hai!';
    form.reset();
  } catch (error) {
    console.error(error);
    statusDiv.style.color = 'red';
    statusDiv.innerText = 'Error: ' + error.message;
  }
});