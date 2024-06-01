import firebase from 'firebase/app';
import 'firebase/firestore';

console.log("API Key:", process.env.REACT_APP_MULTIPAGE_MOVIE_FIREBASE_DB_API_KEY);
console.log("Auth Domain:", process.env.REACT_APP_MULTIPAGE_MOVIE_FIREBASE_DB_AUTH_DOMAIN);
console.log("Project ID:", process.env.REACT_APP_MULTIPAGE_MOVIE_FIREBASE_DB_PROJECT_ID);
console.log("Storage Bucket:", process.env.REACT_APP_MULTIPAGE_MOVIE_FIREBASE_DB_STORAGE_BUCKET);
console.log("Messaging Sender ID:", process.env.REACT_APP_MULTIPAGE_MOVIE_FIREBASE_DB_MESSAGING_SENDER_ID);
console.log("App ID:", process.env.REACT_APP_MULTIPAGE_MOVIE_FIREBASE_DB_APP_ID);

const firebaseConfig = {
    apiKey: process.env.REACT_APP_MULTIPAGE_MOVIE_FIREBASE_DB_API_KEY,
    authDomain: process.env.REACT_APP_MULTIPAGE_MOVIE_FIREBASE_DB_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_MULTIPAGE_MOVIE_FIREBASE_DB_PROJECT_ID,
    storageBucket: process.env.REACT_APP_MULTIPAGE_MOVIE_FIREBASE_DB_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MULTIPAGE_MOVIE_FIREBASE_DB_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_MULTIPAGE_MOVIE_FIREBASE_DB_APP_ID
};

// init
firebase.initializeApp(firebaseConfig);

// services
const projectFirestore = firebase.firestore();

export { projectFirestore };
