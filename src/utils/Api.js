const config = {
    url: 'https://nomoreparties.co/v1/cohort-51',
    authorization: 'e466dc8d-1112-4a77-afc1-eb46a36ee862',
    contentType: 'application/json'
}


export class Api {
    constructor(config) {
        this._url = config.url;
        this._authorization = config.authorization;
        this._contentType = config.contentType;
    };

    //Получение карточек с сервера
    getAllCards() {
        return fetch(`${this._url}/cards`, {
            headers: { authorization: this._authorization }
        })
            .then(res =>
                this._checkServerResponse(res));
    };

    //Получение информации о пользователе
    getUserData() {
        return fetch(`${this._url}/users/me`, {
            headers: { authorization: this._authorization }
        })
            .then(res =>
                this._checkServerResponse(res));
    };

    _checkServerResponse(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    };

    //Установка информации о себе на сервере
    setUserData(input) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._authorization,
                'Content-Type': this._contentType
            },
            body: JSON.stringify({
                name: input.name,
                about: input.about,
            })
        })
            .then(res =>
                this._checkServerResponse(res));
    };

    //Смена аватара
    changeUserAvatar(input) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._authorization,
                'Content-Type': this._contentType
            },
            body: JSON.stringify(input)
        })
            .then(res =>
                this._checkServerResponse(res));
    };

    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
            return fetch(`${this._url}/cards/likes/${cardId}`, {
                method: 'DELETE',
                headers: {
                    authorization: this._authorization,
                    'Content-Type': this._contentType
                }
            })
                .then(res =>
                    this._checkServerResponse(res));
        }

        else {
            return fetch(`${this._url}/cards/likes/${cardId}`, {
                method: 'PUT',
                headers: {
                    authorization: this._authorization,
                    'Content-Type': this._contentType
                }
            })
                .then(res =>
                    this._checkServerResponse(res));
        }
    }


    //Поставить лайк
    putLike(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: {
                authorization: this._authorization,
                'Content-Type': this._contentType
            }
        })
            .then(res =>
                this._checkServerResponse(res));
    };
    //Снять лайк
    removeLike(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._authorization,
                'Content-Type': this._contentType
            }
        })
            .then(res =>
                this._checkServerResponse(res));
    };

    //Отправка новой карточки на сервер
    addNewCard(input) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._authorization,
                'Content-Type': this._contentType
            },
            body: JSON.stringify(input)
        })
            .then(res =>
                this._checkServerResponse(res));
    };

    //Удаление карточки с сервера
    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._authorization,
                'Content-Type': this._contentType
            },
        })
            .then(res =>
                this._checkServerResponse(res));

    };
}

export const reactApi = new Api(config);