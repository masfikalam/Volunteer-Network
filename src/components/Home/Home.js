import React, {useEffect, useState} from 'react';
import './Home.css'
import { Link } from 'react-router-dom';
import Header from '../Header/Header';

const Home = () => {
    const [events, setEvents] = useState([]);

    // load all events
    useEffect(() => {
        fetch('https://serene-shore-71005.herokuapp.com/allEvents')
        .then(res => res.json())
        .then(data => setEvents(data));
    }, [])

    return (
        <main>
            <Header />
            <section id="home" className="container py-5 text-center">
                <h4 className="text-primary mb-4">Click on events to become volunteer</h4>
                <div className="row">
                    {
                        events.map(event =>
                        <div key={event._id} className="col-sm-6 col-md-4 col-xl-3 my-3">
                            <Link className="td" to={"/register/"+event.name}>
                                <div className="card h-100 bg-dark text-warning shadow">
                                    <div className="card-image-top">
                                        <img src={event.photo} alt="" width="100%" height="300px" />
                                    </div>
                                    <div className="card-body">
                                        <h3>{event.name}</h3>
                                    </div>
                                </div>
                            </Link>
                        </div>)
                    }
                </div>
            </section>
            <footer className="mt-3 py-3 text-center">
                <h5>Designed and Developed By : <a href="http://facebook.com/masfik.alam">Masfikul Alam</a></h5>
            </footer>
        </main>
    );
};

export default Home;