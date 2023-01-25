
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAIg5QPF4ayiBrk9NVUCVuW4cZuJPMXpjg",
  authDomain: "pechal-4e650.firebaseapp.com",
  projectId: "pechal-4e650",
  storageBucket: "pechal-4e650.appspot.com",
  messagingSenderId: "955924851159",
  appId: "1:955924851159:web:dd5ab6cf8ae3f0b0598392"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app)
export default firebaseConfig