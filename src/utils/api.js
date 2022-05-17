class Api {
    constructor(config) {
        this._headers = config.headers
    }

    _checkError(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    //получаем список всех карточек
    getInitialCards() {
        return fetch('https://back.kachur.nomoreparties.sbs/cards', {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        })
            .then(this._checkError);
    }


    //получаем информацию пользователя
    getUserInfo() {
        return fetch('https://back.kachur.nomoreparties.sbs/users/me', {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
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
        return fetch(`https://back.kachur.nomoreparties.sbs/users/me/avatar`, newConfing)
            .then(this._checkError);
    }

    // удаляем карточку
    removeCard(cardId) {
        const newConfing = {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            method: 'DELETE',
        }
        return fetch(`https://back.kachur.nomoreparties.sbs/cards/${cardId}`, newConfing)
            .then(this._checkError);
    }

    // ставим и удаляем лайк 
    changeLikeCardStatus(cardId, isLiked) {
        const updateLike = {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            method: 'PUT',
        }

        const deleteLike = {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            method: 'DELETE',
        }
        return fetch(`https://back.kachur.nomoreparties.sbs/cards/${cardId}/likes`, isLiked ? deleteLike : updateLike)
            .then(this._checkError);
    }

    // отправляем информацию 
    patchProfileInfo(userData) {
        const newConfing = {
            method: 'PATCH',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        }
        return fetch('https://back.kachur.nomoreparties.sbs/users/me', newConfing)
            .then(this._checkError);
    }

    //создаем новую карточку
    patchCard(inputsValue) {
        const newConfing = {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputsValue),

        }
        return fetch('https://back.kachur.nomoreparties.sbs/cards', newConfing)
            .then(this._checkError);
    }
}

export default new Api({
    baseUrl: `https://back.kachur.nomoreparties.sbs`,
    headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('token')}`,
    }
});



