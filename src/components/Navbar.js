import React from 'react';
import BNavbar from 'react-bootstrap/Navbar';
import BNav from 'react-bootstrap/Nav';
import history from '../history';
const Link = ({ to, children, onClick, ...props }) => (<a onClick={(e) => {
    e.preventDefault();
    history.push(to);
    if (onClick) {
        onClick();
    }
}} href={to} {...props}>{children}</a>);

const Navbar = ({ isLoggedIn, user, logout }) => {console.log(isLoggedIn); return (
    <BNavbar bg="dark" variant="dark">
         <BNavbar.Brand href="/">Sentiment-Analyzer</BNavbar.Brand>
         <BNav className="mr-auto">
            {isLoggedIn && <Link className="nav-link" to="/my-sentences">Propozițiile mele</Link>}
        </BNav>
        <BNav>
            {isLoggedIn ? (
                <>
                    <BNav.Link style={{ color: 'white' }}>{ user.name }</BNav.Link>
                    <BNav.Link onClick={logout}>Ieși</BNav.Link>
                </>
            ) : (
                <>
                    <Link className="nav-link" to="/login">Intră</Link>
                    <Link className="nav-link" to="/register">Înregistrează-te</Link>
                </>
            )}
        </BNav>
    </BNavbar>
)};

export default Navbar;