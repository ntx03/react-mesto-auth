class Api {
    constructor(confing) {
        this._headers = confing.headers
    }

    _checkError(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    //получаем список всех карточек
    getInitialCards() {
        return fetch('http://back.kachur.nomoreparties.sbs/cards', {
            method: 'GET',
            headers: this._headers
        })
            .then(this._checkError);
    }


    //получаем информацию пользователя
    getUserInfo() {
        return fetch('http://back.kachur.nomoreparties.sbs/users/me', {
            method: 'GET',
            headers: this._headers
        })
            .then(this._checkError);
    }

    //обновляем аватар 
    newAvatar(avatarUrl) {
        const newConfing = {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatarUrl['avatar']
            }),

        }
        return fetch(`http://back.kachur.nomoreparties.sbs/users/me/avatar`, newConfing)
            .then(this._checkError);
    }

    // удаляем карточку
    removeCard(cardId) {
        const newConfing = {
            headers: this._headers,
            method: 'DELETE',
        }
        return fetch(`http://back.kachur.nomoreparties.sbs/cards/${cardId}`, newConfing)
            .then(this._checkError);
    }

    // ставим и удаляем лайк 
    changeLikeCardStatus(cardId, isLiked) {
        const updateLike = {
            headers: this._headers,
            method: 'PUT',
        }

        const deleteLike = {
            headers: this._headers,
            method: 'DELETE',
        }
        return fetch(`http://back.kachur.nomoreparties.sbs/cards/likes/${cardId}`, isLiked ? deleteLike : updateLike)
            .then(this._checkError);
    }

    // отправляем информацию 
    patchProfileInfo(userData) {
        const newConfing = {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(userData),
        }
        return fetch('http://back.kachur.nomoreparties.sbs/users/me', newConfing)
            .then(this._checkError);
    }

    //отправляем информацию о фото и пользователе на сервер
    patchCard(inputsValue) {
        const newConfing = {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(inputsValue),

        }
        return fetch('http://back.kachur.nomoreparties.sbs/cards', newConfing)
            .then(this._checkError);
    }
}

export default new Api({
    baseUrl: `http://back.kachur.nomoreparties.sbs`,
    headers: {
        'Content-Type': 'application/json',
    }
});



