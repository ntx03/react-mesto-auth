import React from "react";
import { useState, useEffect } from "react";
import Logo from '../images/Vector.svg';
import { Link, useLocation } from 'react-router-dom';
function Header({ loggedIn, exitProfile, email }) {

    // хук useLocation();
    let location = useLocation();

    const [linkName, setlinkName] = useState('');
    const [link, setLink] = useState('');

    // меняем название в header в зависимости от того, где находится пользователь
    useEffect(() => {
        if (location.pathname === '/sign-in') {
            setlinkName('Регистрация');
            setLink('/sign-up');
        }
        if (location.pathname === '/sign-up') {
            setlinkName('Войти');
            setLink('/sign-in');
        }
    }
    )

    return (
        <header className="header">
            <img className='header__logo' src={Logo} alt="Логотип место россия" />
            <div className='header__text-container'>
                <p className='header__text-email'>{email}</p>
                {loggedIn ? <Link to="/sign-in" onClick={exitProfile} className="header__text header__text_gray">Выйти</Link> : <Link to={link} className="header__text ">{linkName}</Link>}
            </div>
        </header>
    );
}

export default Header;