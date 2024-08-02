import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCLavBenEqwqwMCJtAz1f73mdYEy7FMM6c",
  authDomain: "job-portal-7dc7e.firebaseapp.com",
  projectId: "job-portal-7dc7e",
  storageBucket: "job-portal-7dc7e.appspot.com",
  messagingSenderId: "272355316016",
  appId: "1:272355316016:web:7a82fd360980d873ae38f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
