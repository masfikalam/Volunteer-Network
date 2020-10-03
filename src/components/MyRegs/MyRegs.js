import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from '../../App';

const MyRegs = () => {
    const [user] = useContext(UserContext);
    const [myEvents, setMyEvents] = useState([]);
    const [reload, setReload] = useState(false);

    // load all events
    useEffect(() => {
        fetch('https://serene-shore-71005.herokuapp.com/oneUser?email='+user.email)
        .then(res => res.json())
        .then(data => {
            setMyEvents(data);
            setReload(false);
        });
    }, [reload, user.email])

    // remove event
    function removeEvent(id) {
        fetch('https://serene-shore-71005.herokuapp.com/remove/'+id, {
            method: 'DELETE'
        }).then(res => res.json())
        .then(data => setReload(data))
    }

    return (
        <section id="myRegs" className="py-5 mt-5 container">
            <h2 className="text-center my-5 text-info">You are registered in {myEvents.length} events</h2>
            <div className="row">
            {
                myEvents.map(user =>
                    <div key={user._id} className="col-md-4 my-3">
                        <div className="card h-100 text-center shadow px-3 py-4">
                            <h4>Name: {user.name}</h4>
                            <h3>Event: <span className="text-success">{user.event}</span></h3>
                            <h4>Date: {user.date}</h4>
                            <button onClick={() => removeEvent(user._id)} className="btn mt-3 btn-danger">Cancel</button>
                        </div>
                    </div>)
            }
            </div>
        </section>
    );
};

export default MyRegs;