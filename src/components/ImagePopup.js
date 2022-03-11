import React from "react";

function ImagePopup({ card, onClose }) {

    return (
        <div id="popup_image" className={card.isOpen ? `popup popup_open` : `popup`}>
            <div className="popup__container-image">
                <button className="popup__icon popup__icon-image" onClick={onClose} type="button"
                    aria-label="закрытие"></button>
                <img className="popup__image" src={card.link}
                    alt={card.name} />
                <p className="popup__title-image">{card.name}</p>
            </div>
            <div id="overlay_image" onClick={onClose} className="popup__overlay"></div>
        </div>
    );
}

export default ImagePopup;