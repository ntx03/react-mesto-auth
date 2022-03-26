import React from 'react';
import { useState } from "react";
import { Link } from 'react-router-dom';


function Register({ onRegister }) {
    const [email, setEmail] = useState('');
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const [password, setPassword] = useState('');
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }
    // собираем данные с инпутов и очищаем поля
    const handleSubmit = (e) => {
        e.preventDefault()
        onRegister(password, email);
        setEmail('');
        setPassword('');
    }

    return (
        <div className="page">
            <div className="login__container">
                <form className="login__content" onSubmit={handleSubmit}>
                    <h2 className="login__title">Регистрация</h2>
                    <div className="login__text-container">
                        <input id="Email" type="email" required placeholder="Email"
                            minLength="2" maxLenght="40" onChange={onChangeEmail}
                            value={email || ''} name="Email" className="login__text" />
                        <span id="name-error" className="popup__error-message"></span>
                    </div>
                    <div className="popup__text-container">
                        <input id="Password" type="password" placeholder="password" onChange={onChangePassword}
                            minLength="2" maxLenght="200" required
                            value={password || ''} name="password"
                            className="login__text " />
                        <span id="about_me-error" className="popup__error-message"></span>
                    </div>
                    <button className="login__button" type="submit">Зарегистрироваться</button>
                </form>
                <Link to='/sign-in' className="login__text login__enter">Уже зарегистрированы? Войти</Link>
            </div>
        </div>
    );
}

export default Register;