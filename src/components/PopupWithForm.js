import React from "react";

function PopupWithForm({ name, title, children, isOpen, onClose, handleSubmit }) {
    return (
        <div className={isOpen ? `popup popup_type_${name} popup_open` : `popup popup_type_${name}`}>
            <div className="popup__container">
                <button className="popup__icon" type="button" aria-label="закрытие" onClick={onClose}></button>
                <form name={name} onSubmit={handleSubmit} className="popup__content">
                    <h2 className="popup__title">{title}</h2>
                    {children}
                    <button className="popup__button" type="submit">Сохранить</button>
                </form>
            </div>
            <div id="overlay_profile" className="popup__overlay" onClick={onClose}></div>
        </div>
    );
}

export default PopupWithForm;