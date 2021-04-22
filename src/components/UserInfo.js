export default class UserInfo {
  constructor({ nameUserSelector, infoUserSelector }) {
    this._nameUser = document.querySelector(nameUserSelector);
    this._infoUser = document.querySelector(infoUserSelector);
  }

  getUserInfo() {
    this._dataUser = {
      nameUser: this._nameUser.textContent,
      infoUser: this._infoUser.textContent
    };

    return this._dataUser;
  }

  // принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo({ data }) {
    this._nameUser.textContent = data.name_user;
    this._infoUser.textContent = data.info;
  }
}