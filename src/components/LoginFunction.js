import { initializeApp } from "firebase/app";
import { getAuth,signInWithEmailAndPassword } from 'firebase/auth';

const LoginFunction = ( email, password ) => {
    const firebaseConfig = {
        apiKey: "AIzaSyAcdpax1Bk5XySYKC4xQ-6u05TnKkoMvEc",
        authDomain: "bella-bella-realty-website.firebaseapp.com",
        projectId: "bella-bella-realty-website",
        storageBucket: "bella-bella-realty-website.appspot.com",
        messagingSenderId: "256708251300",
        appId: "1:256708251300:web:b92120f36e9233b43ce031",
        measurementId: "G-6CSM0W2QH9"
      };
    initializeApp(firebaseConfig);
    const auth = getAuth();

    return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return true;
    })
    .catch((error) => {
      alert("Invalid Username or Password, Please Try Again!");
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Error Code: ${errorCode}, ${errorMessage}`);
      return false;
    })
} 
export default LoginFunction;

