import React from "react";
import Logo from '../images/Vector.svg';
import { Link } from 'react-router-dom';
function Header() {
    return (
        <header className="header">
            <img className='header__logo' src={Logo} alt="Логотип место россия" />
            <div className='header__text-container'>
                <p className='header__text'>email@mail.com</p>
                <Link className='header__text header__text_gray'>Выйти</Link>
            </div>
        </header>
    );
}

export default Header;