import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBZTQOyD204rDwcEUmyBzjTyhYqDJNXWE8",
  authDomain: "potitama.firebaseapp.com",
  projectId: "potitama-91e99",
  storageBucket: "potitama-91e99.appspot.com",
  messagingSenderId: "182683334450",
  appId: "1:182683334450:web:b50952dcee41387dcb892b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
