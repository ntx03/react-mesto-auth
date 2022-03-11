import { useState, useEffect } from "react";
import { Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import EditProfilePopup from '../components/EditProfilePopup';
import AddPlasePopup from './AddPlacePopup';
import EditAvararPopup from './EditAvatarPopup';
import Login from './Login';
import api from "../utils/api";
import ImagePopup from './ImagePopup';
import CurrentUserContext from '../contexts/currentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ isOpen: false });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  // получаем данные от сервера информацию о себе и карточки
  useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch(e => console.log(e))
    api.getInitialCards()
      .then((data) => {
        setCards(data)
      })
      .catch(err => console.log(err))
  }, [])

  // функция установки лайков
  function handleCardLike(card) {

    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err))

  }

  // удаление карточки
  const handleCardDelete = (card) => {
    api.removeCard(card._id)
      .then(() => {
        setCards(state => state.filter(c => c._id !== card._id))
      })
      .catch(err => console.log(err));
  }
  //добавление карточки
  const handleAddPlace = (data) => {
    api.patchCard(data)
      .then(newCard => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(err => console.log(err));
  }

  // обработчик информации о пользователе
  const handleUpdateUser = (userData) => {
    api.patchProfileInfo(userData)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch(err => console.log(err));
  }

  // обработчик информации об аватаре
  const handleUpdateAvatar = (avatar) => {
    api.newAvatar(avatar)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch(err => console.log(err));
  }

  // функция открытия попапа с аватаром
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }
  // функция открытия попапа с профилем
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }
  // функция открытия попапа с изображением
  const handleCardClick = ({ link, name, isOpen }) => {
    setSelectedCard({ link, name, isOpen: !isOpen })
  }
  // функция открытия попапа с аватаром
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }
  // функция закрытия всех попапов
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard({ isOpen: false })
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <div className="page">
          <Route path="/">
            <Login />
          </Route>
          <Route path="/1">
            <Header />
          </Route>
          <Route path="/1">
            <Main onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardDelete={handleCardDelete}
              onCardLike={handleCardLike}
              cards={cards}
              onEditPopupImage={handleCardClick}
            />
          </Route>
          <Route path="/1">
            <Footer />
          </Route>
        </div>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlasePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlase={handleAddPlace} />
        <EditAvararPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
