export default class UserInfo {
  constructor({ nameUserSelector, infoUserSelector, avatarUserSelector }) {
    this._nameUser = document.querySelector(nameUserSelector);
    this._infoUser = document.querySelector(infoUserSelector);
    this._avatar = document.querySelector(avatarUserSelector)
  }

  getUserInfo() {
    this._dataUser = {
      nameUser: this._nameUser.textContent,
      infoUser: this._infoUser.textContent,
    };

    return this._dataUser;
  }

  // принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(data) {
    this._nameUser.textContent = data.name;
    this._infoUser.textContent = data.about;

    this.setUserAvatar(data)
  }

  setUserAvatar(data) {
    this._avatar.src = data.avatar;
    console.log(this._avatar)
  }
}