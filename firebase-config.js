// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyDCT2xVkAf7hlIyOyW_AwOa6d0oNNtZmg4",
  authDomain: "vtuber-music-a6006.firebaseapp.com",
  projectId: "vtuber-music-a6006",
  storageBucket: "vtuber-music-a6006.firebasestorage.app",
  messagingSenderId: "743617868846",
  appId: "1:743617868846:web:27d350fcf6aec92556dbbf",
  measurementId: "G-43R4SV87MC"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// 전역 등록 (admin.html에서 사용 가능하도록)
window.db = db;
