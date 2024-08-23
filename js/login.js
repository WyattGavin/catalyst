import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBWY0NRE9oQVID6E-O3MsXAB0fbZ853cOA",
    authDomain: "testdatabase-c6c9d.firebaseapp.com",
    databaseURL: "https://testdatabase-c6c9d-default-rtdb.firebaseio.com",
    projectId: "testdatabase-c6c9d",
    storageBucket: "testdatabase-c6c9d.appspot.com",
    messagingSenderId: "1031997046009",
    appId: "1:1031997046009:web:f193ed16466476c1773628",
    measurementId: "G-XRDRDQ1T9E"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);

const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login_email').value;
    const password = document.getElementById('login_password').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        localStorage.setItem('userToken', await user.getIdToken());
        window.location.reload();
    } catch (error) {
        if (error.code === 'auth/invalid-credential') {
            const loginError = document.getElementById('error_log');
            loginError.textContent = "Invalid credentials";
            console.log('Invalid credentials');
        } else {
            console.error('Error:', error.message);
        }
    }
});