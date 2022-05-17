import React from "react";
import CurrentUserContext from "../contexts/currentUserContext";
const Card = ({ card, onEditPopupImage, onCardLike, onCardDelete }) => {
    const user = React.useContext(CurrentUserContext);

    // функция лайка-дизлайка карточки
    const handleLikeClick = () => {
        onCardLike(card)
    }

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner === user._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `card__delete ${isOwn ? 'card__delete_visible' : ''}`
    );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === user._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (`card__heart ${isLiked ? 'card__heart_like' : ''}`);

    // функция открытия попапа с изображением
    const handleClick = () => {
        onEditPopupImage(card)
    }
    const handCardDelete = () => {
        onCardDelete(card)
    }

    return (
        <article id="template" className="card">
            <div className="card__image-container">
                <img className="card__image" onClick={handleClick} src={card.link} alt={card.name} />
            </div>
            <div className="card__title-container">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__heard-container">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} aria-label="отметка карточки"></button>
                    <p className="card__heard-number">{card.likes.length}</p>
                </div>
            </div>
            <button className={cardDeleteButtonClassName} onClick={handCardDelete} type="button"
                aria-label="удаление карточки"></button>
        </article>
    )
}

export default Card;