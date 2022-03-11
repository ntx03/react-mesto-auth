import React from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/currentUserContext";

const Main = ({ onEditProfile, onAddPlace, onEditAvatar,
    cards, onCardLike, onCardDelete, onEditPopupImage }) => {

    const user = React.useContext(CurrentUserContext);
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container">
                    <img className="profile__avatar" src={user.avatar} />
                    <button title="Загрузить новый аватар" onClick={onEditAvatar}
                        className="profile__avatar-button"></button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__title">{user.name}</h1>
                    <button className="profile__button-edit" type="button" onClick={onEditProfile}
                        aria-label="редактирование профиля"></button>
                    <p className="profile__subtitle">{user.about}</p>
                </div>
                <button className="profile__button-add" type="button" onClick={onAddPlace}
                    aria-label="добавление карточек"></button>
            </section>
            <section className="cards">
                {Array.prototype.map.call(cards, function (item) {
                    return (
                        <Card key={item._id} onCardLike={onCardLike} onCardDelete={onCardDelete} card={item} onEditPopupImage={onEditPopupImage} />
                    )
                })}
            </section>
        </main>
    )
}

export default Main;

