// firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, where, getDocs }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDQ86GFuKwiD-nenQAaNkMXD2AB9KLA_5M",
  authDomain: "nicasa-6a4fa.firebaseapp.com",
  projectId: "nicasa-6a4fa",
  storageBucket: "nicasa-6a4fa.firebasestorage.app",
  messagingSenderId: "159871097953",
  appId: "1:159871097953:web:64155a28b56f575a615e20",
  measurementId: "G-SP6L09SRJ6"
};

const app     = initializeApp(firebaseConfig);
const auth    = getAuth(app);
const db      = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

// Exportar al objeto global para que app.js lo use
window.NICASA_FB = {
  auth, db, storage, provider,
  GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged,
  collection, addDoc, onSnapshot, query, orderBy, where, getDocs,
  ref, uploadBytes, getDownloadURL
};
