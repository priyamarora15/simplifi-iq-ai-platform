import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDjOWql9yHSndx9PyM0W8NexaloAQrlr74",
  authDomain: "simplifiiq-65ad8.firebaseapp.com",
  projectId: "simplifiiq-65ad8",
  storageBucket: "simplifiiq-65ad8.firebasestorage.app",
  messagingSenderId: "711697540970",
  appId: "1:711697540970:web:775f69f90a9de354e12713",
  measurementId: "G-2R1S2KW0GN"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();