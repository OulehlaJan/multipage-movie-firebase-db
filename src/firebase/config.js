import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.MULTIPAGE_FIREBASE_MOVIE_DB_API_KEY,
    authDomain: process.env.MULTIPAGE_FIREBASE_MOVIE_DB_AUTH_DOMAIN,
    projectId: process.env.MULTIPAGE_FIREBASE_MOVIE_DB_PROJECT_ID,
    storageBucket: process.env.MULTIPAGE_FIREBASE_MOVIE_DB_STORAGE_BUCKET,
    messagingSenderId: process.env.MULTIPAGE_FIREBASE_MOVIE_DB_MESSAGING_SENDER_ID,
    appId: process.env.MULTIPAGE_FIREBASE_MOVIE_DB_APP_ID
};

// init
firebase.initializeApp(firebaseConfig);

// services
const projectFirestore = firebase.firestore();

export { projectFirestore };