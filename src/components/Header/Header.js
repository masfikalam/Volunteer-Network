import React, {useState, useEffect} from 'react';
import './header.css'

const Header = ({setEvents}) => {
    const [search, setSearch] = useState('');

    // handle blur
    function handleBlur(e) {
        const keyword = e.target.value;
        setSearch(keyword);
    }

    // load search event
    useEffect(() => {
        fetch('https://serene-shore-71005.herokuapp.com/allEvents?event='+search)
        .then(res => res.json())
        .then(data => setEvents(data));
    }, [search, setEvents])

    return (
        <header className="shadow">
            <h1 className="mt-5 py-5">WE GROW BY HELPING PEOPLE IN NEED</h1>
            <div className="input-group mb-5 search">
                <input onBlur={handleBlur} type="text" className="mx-auto form-control form-control-lg" placeholder="Search Event" />
                <div className="input-group-append">
                    <button className="btn btn-success">SEARCH</button>
                </div>
            </div>
        </header>
    );
};

export default Header;