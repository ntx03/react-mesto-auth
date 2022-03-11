import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react"

function AddPlasePopup({ isOpen, onClose, onAddPlase }) {

    const [namePlace, setNamePlase] = useState('')
    const [link, setLink] = useState('')

    // изменение иппута названия карточки
    const onChangePlase = (e) => {
        setNamePlase(e.target.value)
    }
    // изменение инпута ссылка на картинку
    const onChangeLink = (e) => {
        setLink(e.target.value)
    }
    // функция отправки формы 
    function handleSubmit(e) {
        e.preventDefault();
        onAddPlase({
            link: link,
            name: namePlace,
        });
    }
    // очищаем форму после отправки формы
    useEffect(() => {
        setNamePlase('');
        setLink('');
    }, [isOpen]);


    return (
        <PopupWithForm name='addCard' title="Новое место" isOpen={isOpen} onClose={onClose} handleSubmit={handleSubmit}><div className="popup__text-container">
            <input id="title" type="text" required placeholder="Название" minLength="2" maxLenght="30"
                onChange={onChangePlase}
                value={namePlace} name="title" className="popup__text popup__text_input_title" />
            <span id="title-error" className="popup__error-message"></span>
        </div>
            <div className="popup__text-container">
                <input id="link_to_the_picture" type="url" placeholder="Ссылка на картинку" required
                    value={link} onChange={onChangeLink} name="link_to_the_picture" className="popup__text popup__text_input_picture" />
                <span id="link_to_the_picture-error" className="popup__error-message"></span>
            </div></PopupWithForm>
    );
}

export default AddPlasePopup;