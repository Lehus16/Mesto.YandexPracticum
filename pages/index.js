import {
  selectorsForValidation,
  templateElement,
  buttonOpenEditProfileForm,
  profileImage,
  profileTitle,
  profileParagraph,
  submitEditProfileForm,
  popupEditNameField,
  popupEditOccupationField,
  addElementButton,
  submitAddCardForm,
  buttonOpenEditAvatarForm,
  submitEditAvatarForm,
  pageOverlay,
} from '../src/utils/constants.js';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithFormButWithoutInputs } from '../components/PopupWithFormButWithoutInputs.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

import './index.css'; // Стили для index.html
pageOverlay.style.opacity = 0;
pageOverlay.style.visibility = 'hidden';
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

const currentUser = await api.getUserInfo();
const cardsData = await api.getInitialCards();

Promise.all([currentUser, cardsData])
  .then(([userData, cardsData]) => {
    profileImage.src = userData.avatar;
    profileTitle.textContent = userData.name;
    profileParagraph.textContent = userData.about;
    cards.renderItems(cardsData);
    setTimeout(() => {
      pageOverlay.style.opacity = 0;
      pageOverlay.style.visibility = 'hidden';
    }, 2000);
  })
  .catch((err) => {
    alert('Ошибка: ' + err);
  });

// Popup с картинкой
const popupWIthImage = new PopupWithImage('.popup-image');
popupWIthImage.setEventListeners();

const popupDeleteCard = new PopupWithFormButWithoutInputs(
  '.popup-delete',
  (item, element) => {
    api
      .deleteCard(item)
      .then(() => {
        cards.removeItem(element);
        popupDeleteCard.close();
      })
      .catch((err) => {
        alert(err);
      });
  }
);

popupDeleteCard.setEventListeners();

const generateCard = function (item) {
  const card = new Card(
    item,
    templateElement,
    () => {
      popupWIthImage.open(item);
    },
    () => {
      api
        .putCardLike(item)
        .then((res) => {
          card.setLikes(res.likes.length);
        })
        .catch((err) => {
          alert('Ошибка: ' + err);
        });
    },
    () => {
      api
        .deleteCardLike(item)
        .then((res) => {
          card.setLikes(res.likes.length);
        })
        .catch((err) => {
          alert('Ошибка: ' + err);
        });
    },
    popupDeleteCard.open.bind(popupDeleteCard),
    currentUser
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
    .catch((err) => {
      alert('Ошибка: ' + err);
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
    .catch((err) => {
      alert('Ошибка: ' + err);
    })
    .finally(() => {
      popupEditForm.submitFormButtonTextReset('Сохранить');
    });
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
    .catch((err) => {
      alert('Ошибка: ' + err);
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

// const dataAAA = {
//   name: '111',
//   link: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Sochi_Marine_passenger_terminal_P5010102_2175.jpg',
// };

// for (let i = 0; i < 10; i++) {
//   api.postNewCard(dataAAA);
// }

// console.log(api.deleteCard())
