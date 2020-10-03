import React, {useState, useEffect} from 'react';
import trash from './trash.png';
import userIcon from './userIcon.png'

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [reload, setReload] = useState(false);

    // load all users
    useEffect(() => {
        fetch('https://serene-shore-71005.herokuapp.com/allUsers')
        .then(res => res.json())
        .then(data => {
            setUsers(data);
            setReload(false);
        });
    }, [reload])

    // remove user
    function removeUser(id) {
        fetch('https://serene-shore-71005.herokuapp.com/remove/'+id, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => setReload(data))
    }

    // addEvent
    function addEvent(e) {
        e.preventDefault();
        const EventDetails = {
            name: e.target.elements[0].value,
            photo: e.target.elements[1].value,
        }
        fetch('https://serene-shore-71005.herokuapp.com/addEvent', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(EventDetails)
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                document.getElementById('success').innerText = 'Event Added Successfully'
            }
        })
        e.target.reset();
    }

    return (
        <section id="admin" className="container py-5 mt-5">
            <h2 className="mt-5 text-center text-success">Admin Panel</h2>
            <div className="row mt-5 ">
                <div className="col-md-4 mb-4 text-center">
                    <h4 className="text-center my-4">Add New Event</h4>
                    <form method="POST" onSubmit={addEvent} className="bg-light shadow py-3 px-4 mt-3 border rounded">
                        <input type="text" name="name" className="form-control my-3" placeholder="Event Name" required />
                        <input name="email" type="url" className="form-control my-3" placeholder="Photo URL" required />
                        <input type="submit" value="Add Event" className="btn btn-primary rounded-pill my-1" />
                    </form>
                    <h5 id="success" className="mt-4 text-success">...</h5>
                </div>
                <div className="col-md-8 text-center">
                    <h4 className="text-center my-4">All Volunteers</h4>
                    <table className="table table-sm shadow table-bordered bg-light">
                        <thead>
                            <tr>
                                <th>
                                    <img src={userIcon} alt="" width="20px" />
                                </th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Event</th>
                                <th scope="col">Date</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(user => <tr key={user._id}>
                                    <td>
                                        {users.indexOf(user) + 1}
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.event}</td>
                                    <td>{user.date}</td>
                                    <td className="">
                                        <button onClick={() => removeUser(user._id)} className="btn btn-danger">
                                            <img src={trash} alt="" width="15px" className="mb-1" />
                                        </button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Admin;