import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBbSiNVkJTn-SjWOLdGQvsVRPoLFYDzQ9c",
    authDomain: "snippet-cheatsheet.firebaseapp.com",
    databaseURL: "https://snippet-cheatsheet-default-rtdb.firebaseio.com",
    projectId: "snippet-cheatsheet",
    storageBucket: "snippet-cheatsheet.appspot.com",
    messagingSenderId: "119708306094",
    appId: "1:119708306094:web:4c1c17aaff4fe808013b3f",
    measurementId: "G-D1CHXGBPP9"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
export { auth, database };