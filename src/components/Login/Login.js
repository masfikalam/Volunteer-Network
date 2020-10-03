import React, {useContext} from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './fireConfig'
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import google from './google.png'
firebase.initializeApp(firebaseConfig);

const Login = () => {
    const [user, setUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const {from} = location.state || {from:{pathname:"/"}};

    // google sign in
    function googleSign() {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then(result => {
            const {displayName, email, photoURL} = result.user;
            const newUser = {
                signed: true,
                name: displayName,
                email: email,
                photo: photoURL,
                message: "Logged in successfully"
            }
            setUser(newUser);
            history.replace(from);
        })
        .catch(error => {
            const newUser = {message: error.message};
            setUser(newUser)
        });
    }

    return (
        <section id="login" className="container py-5 mt-5 text-center">
            <h1 className="text-success mt-5">Please Sign in First</h1>
            <button onClick={googleSign} className="mt-5 btn btn-light shadow border rounded-pill px-3">
                <img src={google} alt="" width="30px" className="mb-1 mr-2" />
                <span>Sign in with Google</span>
            </button>
            <h4 className="text-danger mt-5">{user.message}</h4>
        </section>
    );
};

export default Login;