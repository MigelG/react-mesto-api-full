class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getAppInfo() {
        return Promise.all([this.getUserInfo(), this.getCardList()])
    }

    getCardList() {
        return fetch(this._baseUrl + '/cards', {
            headers: this._headers
        })
            .then(this._checkResponse);
    }

    addCard(data) {
        return fetch(this._baseUrl + '/cards', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data),
        })
            .then(this._checkResponse);
    }

    getUserInfo() {
        return fetch(this._baseUrl + '/users/me', {
            headers: this._headers
        })
            .then(this._checkResponse);
    }

    saveUserInfo(data) {
        return fetch(this._baseUrl + '/users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data),
        })
            .then(this._checkResponse);
    }

    deleteCard(id) {
        return fetch(this._baseUrl + `/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._checkResponse);
    }

    likeCard(id, method) {
        return fetch(this._baseUrl + `/cards/likes/${id}`, {
            method: `${method}`,
            headers: this._headers,
        })
            .then(this._checkResponse);
    }

    editAvatar(avatar) {
        return fetch(this._baseUrl + '/users/me/avatar', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(avatar),
        })
            .then(this._checkResponse);
    }

    _checkResponse(res) {
        if (res.ok) { return res.json() }
        return Promise.reject(res);
    }

}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-29',
    headers: {
        authorization: 'abaeba32-e658-413f-86b2-3d2488ef3044',
        'Content-Type': 'application/json'
    }
});

export default api;