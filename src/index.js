import { initialCards, selectorsForValidation } from '../scripts/constants.js';
import { Card } from '../scripts/Card.js';
import { FormValidator } from '../scripts/FormValidator.js';
import { Section } from '../scripts/Section.js';
import { Popup } from '../scripts/Popup.js';
import { PopupWithImage } from '../scripts/PopupWithImage.js';
import { PopupWithForm } from '../scripts/PopupWithForm.js';
import { UserInfo } from '../scripts/UserInfo.js';

import './index.css'; // Стили для index.html

// Константы DOM.

// Template element для создания и добавления новых карточек
const templateElement = document.querySelector('#element').content;
// Popup редактирования профиля
const buttonOpenEditProfileForm = document.querySelector(
  '.profile__button-edit'
);

const submitEditProfileForm = document.querySelector('.popup-edit__form');
/////////////////////////////////////////////////////////////////////////////////////;
// Popup добавления картинки
const addElementButton = document.querySelector('.profile__button-add');

const submitAddCardForm = document.querySelector('.popup-add__form');

/////////////////////////////////////////////////////////////////////////////////////

const addFormValidator = new FormValidator(
  selectorsForValidation,
  submitAddCardForm
);
const editFormValidator = new FormValidator(
  selectorsForValidation,
  submitEditProfileForm
);

const formValidation = function (validator) {
  validator.enableValidation();
};

formValidation(addFormValidator);
formValidation(editFormValidator);

const popupWIthImage = new PopupWithImage('.popup-image');
popupWIthImage.setEventListeners();

const cards = new Section(
  {
    items: initialCards,
    renderer: function (item) {
      const card = new Card(item, templateElement, () => {
        popupWIthImage.open(item);
      });
      const cardElement = card.generateCard();
      cards.addItem(cardElement);
    },
  },
  '.elements'
);

cards.renderItems();

const popupAddForm = new PopupWithForm('.popup-add', (data) => {
  const item = {
    name: data.popup__form_type_name,
    link: data.popup__form_type_url,
  };
  const card = new Card(item, templateElement, () => {
    popupWIthImage.open(item);
  });
  const cardElement = card.generateCard();
  cards.addItem(cardElement);

  addFormValidator.disableSubmitButton();
  popupAddForm.close();
});

popupAddForm.setEventListeners();

addElementButton.addEventListener('click', () => {
  addFormValidator.disableSubmitButton();
  popupAddForm.open();
});

const popupEditForm = new PopupWithForm('.popup-edit', (data) => {
  const userInfo = new UserInfo('.profile__title', '.profile__paragraph');
  // const userData = userInfo.getUserInfo();
  const newUserData = {
    name: data.popup__input_type_name,
    about: data.popup__input_type_occupation,
  };
  userInfo.setUserInfo(newUserData);

  editFormValidator.disableSubmitButton();
  popupEditForm.close();
});

popupEditForm.setEventListeners();

buttonOpenEditProfileForm.addEventListener('click', (e) => {
  e.preventDefault();
  editFormValidator.disableSubmitButton();
  popupEditForm.open();
});
