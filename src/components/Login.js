import React from 'react';
import Logo from '../images/Vector.svg';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div className="page">
            <header className="header">
                <img className='header__logo' src={Logo} alt="Логотип место россия" />
                <Link className='header__text'>Войти</Link>
            </header>
            <div className="login__container">
                <form className="login__content">
                    <h2 className="login__title">Регистрация</h2>
                    <div className="login__text-container">
                        <input id="name" type="text" required placeholder="Имя"
                            minLength="2" maxLenght="40"
                            value="Email" name="name" className="login__text login__text_input_name" />
                        <span id="name-error" className="popup__error-message"></span>
                    </div>
                    <div className="popup__text-container">
                        <input id="about_me" type="text" placeholder="О себе"
                            minLength="2" maxLenght="200" required
                            value="Пароль" name="aboutMe"
                            className="popup__text popup__text_input_job " />
                        <span id="about_me-error" className="popup__error-message"></span>
                    </div>
                    <button className="popup__button" type="submit">Сохранить</button>
                </form>
            </div>
        </div>

    );
}

export default Login;