import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
import { getStorage} from 'firebase/storage'
// deleteObject,


// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCkTINyXr1CPSiUvAFmlXnhL0CfnvGji4s",
    authDomain: "endproject-372414.firebaseapp.com",
    projectId: "endproject-372414",
    storageBucket: "endproject-372414.appspot.com",
    messagingSenderId: "711494892015",
    appId: "1:711494892015:web:1c769b0e284c1121e11e1a",
    measurementId: "G-96X5D33CH8"
  };
 
// const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig);



export const storage  = getStorage(app)
// export const deleteObjectfromStorage = deleteObject(app)


