import React from "react";
import successfully from '../images/successfully.svg'
import error from '../images/error.svg'

function InfoTooltip({ isOpen, onClose, isRegistration, textOk, textError }) {
    return (
        <div className={isOpen ? `popup  popup_open` : `popup`}>
            <div className="popup__container popup__container-mobile">
                <button className="popup__icon" type="button" aria-label="закрытие" onClick={onClose}></button>
                <form className="popup__content">
                    <img className="popup__successfully" src={isRegistration ? successfully : error} alt="галочка в круге" />
                    <h2 className="popup__title  popup__title_center">{isRegistration ? textOk : textError}</h2>
                </form>
            </div>
            <div id="overlay_profile" className="popup__overlay" onClick={onClose}></div>
        </div>
    );
}

export default InfoTooltip;