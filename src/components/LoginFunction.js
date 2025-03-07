import { initializeApp } from "firebase/app";
import { getAuth,signInWithEmailAndPassword } from 'firebase/auth';

const LoginFunction = ( email, password ) => {
    const firebaseConfig = {
        apiKey: "",
        authDomain: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: "",
        measurementId: ""
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

