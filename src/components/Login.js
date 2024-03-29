import React from 'react';
import { useState } from "react";


function Login({ onLogin }) {

    const [email, setEmail] = useState('');
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const [password, setPassword] = useState('');
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }
    // собираем данные с инпутов 
    const handleSubmit = (e) => {
        e.preventDefault()
        onLogin(password, email);
    }


    return (
        <div className="page">
            <div className="login__container">
                <form className="login__content" onSubmit={handleSubmit}>
                    <h2 className="login__title">Вход</h2>
                    <div className="login__text-container">
                        <input id="email" type="email" required placeholder="email" onChange={onChangeEmail}
                            minLength="2" maxLenght="40"
                            value={email || ''} name="email" className="login__text" />
                        <span id="name-error" className="popup__error-message"></span>
                    </div>
                    <div className="popup__text-container">
                        <input id="password" type="password" placeholder="пароль" onChange={onChangePassword}
                            minLength="2" maxLenght="200" required
                            value={password || ''} name="password"
                            className="login__text " />
                        <span id="about_me-error" className="popup__error-message"></span>
                    </div>
                    <button className="login__button" type="submit">Войти</button>
                </form>

            </div>
        </div>

    );
}

export default Login;