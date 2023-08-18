import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth,onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore, collection, query, onSnapshot,  doc, where, addDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js"
// TODO: Add SDKs for Firebase prod+ucts that you want to use
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
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById("signout").style.display = "block"

        document.getElementById("name").innerHTML = user.email
        document.getElementById("name").href = ""
    } else {

    }
})

const logout = document.getElementById("signout")

logout.addEventListener('click', () => {
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

const q1 = query(collection(db, "Nextproducts"));
onSnapshot(q1, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
        getDownloadURL(ref(storage, doc.data().Title))
            .then(async (url) => {
                document.getElementById("show").innerHTML +=
                    `   
                <div class="card1" onclick="detail('${url}' , '${doc.data().Title}' , '${doc.data().Description}' , '${doc.data().Price}')">
                <img src="${url}" alt="Products">
                <p style="margin-top:10px;">${doc.data().Title}</p>
                <i style="color: purple;" class="fa-solid fa-star"></i><i style="color: purple;" class="fa-solid fa-star"></i><i style="color: purple;" class="fa-solid fa-star"></i><i style="color: purple;" class="fa-solid fa-star"></i><i style="color: purple;" class="fa-solid fa-star"></i>
                <h4>${doc.data().Price}$</h4>
                <button>Go to detail</button> 
            </div>
                 `
            })
        })
    })
    function detail(url, title, description, price) {
        var Details = {
            Image: url,
            Title: title,
            Description: description,
            Price: price,
            Quantity: "1",
        }
    
        localStorage.setItem("Detail", JSON.stringify(Details))
        window.location.href = './Detail.html'
    }
    window.detail = detail
    
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
    