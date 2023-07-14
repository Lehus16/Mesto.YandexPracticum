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
import { Api } from '../components/Api.js';

import './index.css'; // Стили для index.html

// Константы DOM.

// Template element для создания и добавления новых карточек
const templateElement = document.querySelector('#element').content;

const elementLikes = document.querySelector('.element__likes');
// Popup редактирования профиля
const buttonOpenEditProfileForm = document.querySelector(
  '.profile__button-edit'
);
// Данные профиля
const profileImage = document.querySelector('.profile__image');
const profileTitle = document.querySelector('.profile__title');
const profileParagraph = document.querySelector('.profile__paragraph');

// Popup редактирования профиля
const submitEditProfileForm = document.querySelector('.popup-edit__form');
const popupEditNameField = document.querySelector('.popup__input_type_name');
const popupEditOccupationField = document.querySelector(
  '.popup__input_type_occupation'
);

// Popup добавления картинки
const addElementButton = document.querySelector('.profile__button-add');
const submitAddCardForm = document.querySelector('.popup-add__form');

// Popup редактирования аватара
const buttonOpenEditAvatarForm = document.querySelector('.profile__image-edit');
const submitEditAvatarForm = document.querySelector('.popup-avatar__form');
/////////////////////////////////////////////////////////////////////////////////////

const pageOverlay = document.querySelector('.page-overlay');
setTimeout(() => {
  pageOverlay.style.opacity = 0;
  pageOverlay.style.visibility = 'hidden';
}, 2000);

// Валидация форм
const addFormValidator = new FormValidator(
  selectorsForValidation,
  submitAddCardForm
);
const editFormValidator = new FormValidator(
  selectorsForValidation,
  submitEditProfileForm
);

const editAvatarValidator = new FormValidator(
  selectorsForValidation,
  submitEditAvatarForm
);

const formValidation = function (validator) {
  validator.enableValidation();
};

formValidation(addFormValidator);
formValidation(editFormValidator);
formValidation(editAvatarValidator);

// 229a23af-9dc4-41d6-bbdd-adedac035c83
// const apiKey = prompt('Введите свой ключ API', '');

// Класс api для запросов на сервер.
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-71',
  headers: {
    authorization: '229a23af-9dc4-41d6-bbdd-adedac035c83',
    'Content-Type': 'application/json',
  },
});

// fetch('https://mesto.nomoreparties.co/v1/cohort-71/cards', {
//   method: 'GET',
//   headers: {
//     authorization: '229a23af-9dc4-41d6-bbdd-adedac035c83',
//     'Content-Type': 'application/json',
//   },
// }).then((res) => res.json()).then((result) => {
//   console.log(result)
// })
// Popup с картинкой
const popupWIthImage = new PopupWithImage('.popup-image');
popupWIthImage.setEventListeners();

const popupDeleteCard = new PopupWithForm('.popup-delete', () => {});
popupDeleteCard.setEventListeners();
const generateCard = function (item) {
  const card = new Card(
    item,
    templateElement,
    () => {
      popupWIthImage.open(item);
    },
    () => {
      api.putCardLike(item);
    },
    () => {
      api.deleteCardLike(item);
    },
    () => {
      api.deleteCard(item);
      popupDeleteCard.close();
      popupDeleteCard.submitFormButtonTextReset('Да');
    }
  );
  return card;
};

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

api.getUserInfo().then((result) => {
  profileImage.src = result.avatar;
  profileTitle.textContent = result.name;
  profileParagraph.textContent = result.about;
});

api.getInitialCards().then((result) => {
  cards.renderItems(result);
  console.log(result);
});

// Popup добавления карточки
const popupAddForm = new PopupWithForm('.popup-add', (data) => {
  const item = {
    name: data.popup__form_type_name,
    link: data.popup__form_type_url,
  };
  api
    .postNewCard(item)
    .then((result) => {
      const card = generateCard(result);
      const cardElement = card.generateCard();
      cards.addItem(cardElement, 'prepend');
    })

    .then(() => {
      addFormValidator.disableSubmitButton();
      popupAddForm.close();
    })
    .finally(() => {
      popupAddForm.submitFormButtonTextReset('Создать');
    });
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

  api
    .patchUserInfo(newUserData)
    .then((result) => {
      userInfo.setUserInfo(result);
    })
    .then(() => {
      popupEditForm.close();
    })
    .finally(() => {
      popupEditForm.submitFormButtonTextReset('Сохранить');
    });

  // editFormValidator.disableSubmitButton();
});

popupEditForm.setEventListeners();

buttonOpenEditProfileForm.addEventListener('click', (e) => {
  e.preventDefault();
  editFormValidator.resetInputsErrors();
  const currentUser = userInfo.getUserInfo();
  popupEditNameField.value = currentUser.name;
  popupEditOccupationField.value = currentUser.about;
  popupEditForm.open();
});

const popupAvatarForm = new PopupWithForm('.popup-avatar', (data) => {
  const newAvatarData = {
    avatar: data.popup__form_type_avatar,
  };
  api
    .patchUserAvatar(newAvatarData)
    .then((result) => {
      profileImage.src = result.avatar;
    })
    .then(() => {
      popupAvatarForm.close();
    })
    .finally(() => {
      popupAvatarForm.submitFormButtonTextReset('Сохранить');
    });
});

popupAvatarForm.setEventListeners();

buttonOpenEditAvatarForm.addEventListener('click', (e) => {
  e.preventDefault();
  editAvatarValidator.resetInputsErrors();
  popupAvatarForm.open();
});

// fetch('https://mesto.nomoreparties.co/v1/cohort-71/users/me', {
//   headers: {
//     authorization: '229a23af-9dc4-41d6-bbdd-adedac035c83',
//   },
// })
//   .then((res) => res.json())
//   .then((result) => {
//     profileImage.src = result.avatar;
//     profileTitle.textContent = result.name;
//     profileParagraph.textContent = result.about;
//   });

// Добавить карточки из массива на сервер
// initialCards.forEach((item) => {
//   fetch('https://mesto.nomoreparties.co/v1/cohort-71/cards', {
//     method: 'POST',
//     headers: {
//       authorization: '229a23af-9dc4-41d6-bbdd-adedac035c83',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       name: item.name,
//       link: item.link,
//     }),
//   })
// })

// Очистить все карточки с сервера.
// fetch('https://mesto.nomoreparties.co/v1/cohort-71/cards', {
//   headers: {
//     authorization: '229a23af-9dc4-41d6-bbdd-adedac035c83',
//     'Content-Type': 'application/json',
//   },
// }).then((res) => res.json())
//   .then((result) => {
//     console.log(result);
//     result.forEach((item) => {
//       fetch(`https://mesto.nomoreparties.co/v1/cohort-71/cards/${item._id}`, {
//         method: 'DELETE',
//         headers: {
//           authorization: '229a23af-9dc4-41d6-bbdd-adedac035c83',
//           'Content-Type': 'application/json',
//         },
//       })
//         .then((res) => res.json())
//         .then((result) => {
//           console.log(result);
//         });
//     });
//   });
