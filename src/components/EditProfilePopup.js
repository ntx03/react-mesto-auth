import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";
import CurrentUserContext from "../contexts/currentUserContext";


function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const user = React.useContext(CurrentUserContext);

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    useEffect(() => {
        setName(user.name);
        setDescription(user.about);
    }, [user, isOpen]);


    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const onChangeName = (e) => {
        setName(e.target.value)
    }
    const onChangeAboutMe = (e) => {
        setDescription(e.target.value)
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm name='editProfile' title="Редактировать профиль"
            isOpen={isOpen} onClose={onClose} handleSubmit={handleSubmit}>
            <div className="popup__text-container">
                <input id="name" type="text" required placeholder="Имя"
                    onChange={onChangeName} minLength="2" maxLenght="40"
                    value={name || ''} name="name" className="popup__text popup__text_input_name" />
                <span id="name-error" className="popup__error-message"></span>
            </div>
            <div className="popup__text-container">
                <input id="about_me" type="text" placeholder="О себе"
                    onChange={onChangeAboutMe} minLength="2" maxLenght="200" required
                    value={description || ''} name="aboutMe"
                    className="popup__text popup__text_input_job " />
                <span id="about_me-error" className="popup__error-message"></span>
            </div>   </PopupWithForm>
    );
}

export default EditProfilePopup;