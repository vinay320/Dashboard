import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBhmXITLLfb0IOCNluoGvceeHVfBZVlzwk",
  authDomain: "dash-5e681.firebaseapp.com",
  projectId: "dash-5e681",
  storageBucket: "dash-5e681.appspot.com",
  messagingSenderId: "327552583746",
  appId: "1:327552583746:web:177685dc3436e5723085db",
  measurementId: "G-LJ8WT1M5TX",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };