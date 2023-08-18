import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB3ZvtJgykA5zlFpKuhnsSq_Ay6HKZlNec",
    authDomain: "task-e2185.firebaseapp.com",
    projectId: "task-e2185",
    storageBucket: "task-e2185.appspot.com",
    messagingSenderId: "447773639548",
    appId: "1:447773639548:web:c917761b6d901682781af9",
    measurementId: "G-0D3K0WGC3G"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
window.add = async () => {
    try {
        const docRef = await addDoc(collection(db, "Nextproducts"), {
            Title: document.getElementById("title").value,
            Price: document.getElementById("price").value,
            Description: document.getElementById("description").value,
        });
        const storageRef = ref(storage, `${document.getElementById("title").value}`);
        var file = document.getElementById("file").files[0]
        uploadBytes(storageRef, file).then((snapshot) => {
            window.location.href = "./index.html"
        });

        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error nextproducts: ", e);
    }


}
document.getElementById("signout").addEventListener('click', () => {
    signOut(auth).then(() => {
        Swal.fire({
            title: `Log Out`,
            text: `Log Out Successfully `,
            icon: 'success',
            confirmButtonText: 'OK'
        });
        function wrongs() {
            window.location.href = "./SignUp.html";
        }
        setInterval(wrongs, 3000);
    }).catch((error) => {
        console.log("LogOut Error -->",error)
    });
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log("User Checking UID: ", uid);
    }
    else {
        Swal.fire({
            title: `Account`,
            text: `First Create An Account`,
            icon: 'error',
            confirmButtonText: 'OK'
        });
        function wrong() {
            window.location.href = "./SignUp.html"
        }
        setInterval(wrong, 2000);
    }
});


