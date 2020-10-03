import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import * as firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from '../../App';
import logo from './logo.png';

const linkStyle = {
    textDecoration: 'none'
}
const navStyle = {
    backgroundColor: '#ffffffaa'
}
const Topbar = () => {
    const [user, setUser] = useContext(UserContext);

    // signing out
    function signOutAll() {
        firebase.auth().signOut()
        .then(() => {
            const defautlUser = {
                signed: false,
                name: '',
                email: '',
                photo: '',
                message: ''
            };
            setUser(defautlUser);
        })
        .catch(error => console.log(error))  
    }

    return (
        <nav style={navStyle} className="navbar navbar-expand-md fixed-top navbar-light">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="Volunteer Network" width="170px" className="bg-white rounded-pill py-2 px-4" />
                </Link>
                <button className="btn navbar-toggler border-0" data-toggle="collapse" data-target="#nava">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse text-center" id="nava">
                    <ul className="navbar-nav ml-auto">
                        <Link style={linkStyle} to="/my-registrations" className="shadow nav-item m-2 my-md-0">
                            <button className="nav-link btn btn-block btn-danger text-white">My Registrations</button>
                        </Link>
                        <Link style={linkStyle} to="/admin" className="nav-item shadow m-2 my-md-0">
                            <button className="nav-link btn btn-block btn-dark text-white">Admin</button>
                        </Link>
                        {
                            user.signed ?
                            <button onClick={signOutAll} className="nav-item btn btn-primary m-2  my-md-0 text-white shadow">Sign out, {user.name}</button> :
                            <Link style={linkStyle} to="/login" className="nav-item m-2 my-md-0 shadow">
                                <button className="nav-link btn btn-primary btn-block text-white">Sign in</button>
                            </Link>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Topbar;