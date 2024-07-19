// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC1tbdd2i4K4ubeDqzDNA5-zSe3y6-dRB4",
    authDomain: "steps-ai-f5047.firebaseapp.com",
    projectId: "steps-ai-f5047",
    storageBucket: "steps-ai-f5047.appspot.com",
    messagingSenderId: "417130856629",
    appId: "1:417130856629:web:d6b4b2b00ec4c7d82ebefc",
    measurementId: "G-NTF7HCCRQ0"
  };

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);