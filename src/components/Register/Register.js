import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../App';

const formStyle = {
    maxWidth : '400px',
    margin: 'auto'
}
const Register = () => {
    const {eventName} = useParams();
    const [user] = useContext(UserContext);

    function subForm(e) {
        e.preventDefault();
        const userDetails = {
            name: e.target.elements[0].value,
            email: e.target.elements[1].value,
            age: e.target.elements[2].value,
            date: e.target.elements[3].value,
            event: e.target.elements[4].value
        }
        
        // adding user
        fetch('https://serene-shore-71005.herokuapp.com/register', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(userDetails)
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                document.getElementById('register').innerHTML = '<h2 class="text-center text-success mt-5 pt-5">Registered Successfully</h2><h4 class="text-center">See your all registrations in the "My Registrations" page.</h4><h4 class="text-center text-primary">Thank You 😊</h4>'
            }
        })
    }

    return (
        <section id="register" className="container py-5 mt-5">
            <form style={formStyle} method="POST" onSubmit={subForm} className="bg-light shadow py-3 px-4 mt-5 border rounded">
                <h4 className="text-center text-primary my-3">Registration Form</h4>
                <div className="input-group my-2">
                    <h5 className="mt-1 mr-2">Name : </h5>
                    <input type="text" name="name" defaultValue={user.name} className="form-control" required />
                </div>
                <div className="input-group my-2">
                    <h5 className="mt-1 mr-2">Email : </h5>
                    <input name="email" type="email" defaultValue={user.email} className="form-control" required />
                </div>
                <div className="input-group my-2">
                    <h5 className="mt-1 mr-2">Age : </h5>
                    <input name="age" type="number" className="form-control" required />
                </div>
                <div className="input-group my-2">
                    <h5 className="mt-1 mr-2">Date : </h5>
                    <input name="date" type="date" className="form-control" required />
                </div>
                <div className="input-group my-2">
                    <h5 className="mt-1 mr-2">Event : </h5>
                    <input name="event" type="text" defaultValue={eventName} className="form-control" required />
                </div>
                <input type="submit" value="Register" className="btn btn-success btn-block w-50 mx-auto mt-3" />
            </form>
        </section>
    );
};

export default Register;