
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBNj8kY6frSKGHG1_HWrr_9ZSy35i3M9tc",
  authDomain: "library-project-ac76d.firebaseapp.com",
  projectId: "library-project-ac76d",
  storageBucket: "library-project-ac76d.appspot.com",
  messagingSenderId: "543230471243",
  appId: "1:543230471243:web:2ccd93f3faf04aa815f1ce"
};


const app = initializeApp(firebaseConfig);

const fireDB =getFirestore(app);
const auth =getAuth(app);

export {fireDB, auth}