import {
  initialCards,
  selectorsForValidation,
} from '../src/utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

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

const generateCard = function (item) {
  const card = new Card(item, templateElement, () => {
    popupWIthImage.open(item);
  });
  return card;
};

const popupWIthImage = new PopupWithImage('.popup-image');
popupWIthImage.setEventListeners();

const cards = new Section(
  {
    renderer: function (item) {
      const card = generateCard(item);
      const cardElement = card.generateCard();
      cards.addItem(cardElement);
    },
  },
  '.elements'
);

cards.renderItems(initialCards);

const popupAddForm = new PopupWithForm('.popup-add', (data) => {
  const item = {
    name: data.popup__form_type_name,
    link: data.popup__form_type_url,
  };
  const card = generateCard(item);
  const cardElement = card.generateCard();
  cards.addItem(cardElement);

  addFormValidator.disableSubmitButton();
  popupAddForm.close();
});

popupAddForm.setEventListeners();

addElementButton.addEventListener('click', () => {
  addFormValidator.resetInputsErrors();
  addFormValidator.disableSubmitButton();
  popupAddForm.open();
});

const userInfo = new UserInfo('.profile__title', '.profile__paragraph');

const popupEditForm = new PopupWithForm('.popup-edit', (data) => {
  // const userData = userInfo.getUserInfo();
  const newUserData = {
    name: data.popup__input_type_name,
    about: data.popup__input_type_occupation,
  };
  userInfo.setUserInfo(newUserData);

  // editFormValidator.disableSubmitButton();
  popupEditForm.close();
});

popupEditForm.setEventListeners();

const popupEditNameField = document.querySelector('.popup__input_type_name');
const popupEditOccupationField = document.querySelector(
  '.popup__input_type_occupation'
);

buttonOpenEditProfileForm.addEventListener('click', (e) => {
  e.preventDefault();
  // Сначала не понял как это сделать потому что девтулс ругался, а потом каааак понял.
  editFormValidator.resetInputsErrors();
  const currentUser = userInfo.getUserInfo();
  popupEditNameField.value = currentUser.name;
  popupEditOccupationField.value = currentUser.about;
  popupEditForm.open();
});
