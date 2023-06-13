import { Card } from "./Card.js";


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];
// Константы DOM.
// ELEMENTS
const elements = document.querySelector('.elements');
// Template element для создания и добавления новых карточек
const templateElement = document.querySelector('#element').content;
// Popup редактирования профиля
const popupEditProfile = document.querySelector('.popup-edit');
const buttonOpenEditProfileForm = document.querySelector(
  '.profile__button-edit'
);
const popupEditProfileCloseButton = document.querySelector(
  '.popup-edit__button-close'
);
const popupEditProfileSaveButton = document.querySelector(
  '.popup__button-save'
);
const currentName = document.querySelector('.profile__title');
const currentOccupation = document.querySelector('.profile__paragraph');
const editFormName = document.querySelector('.popup__input_type_name');
const editFormOccupation = document.querySelector(
  '.popup__input_type_occupation'
);
const submitEditProfileForm = document.querySelector('.popup-edit__form');
/////////////////////////////////////////////////////////////////////////////////////
// POPUPS
const popUps = document.querySelectorAll('.popup');
// Popup добавления картинки
const addElementButton = document.querySelector('.profile__button-add');
const popupAddElement = document.querySelector('.popup-add');
const popupAddElementButtonClose = document.querySelector(
  '.popup-add__button-close'
);
const submitAddCardForm = document.querySelector('.popup-add__form');
const addFormPlace = document.querySelector('.popup__input_type_place-name');
const addFormUrl = document.querySelector('.popup__input_type_url');
const popupAddCardFormButton = document.querySelector('.popup__button-make');
// Popup картинки
const popupImage = document.querySelector('.popup-image');
const popupImageCloseButton = document.querySelector('.popup-image__button');
/////////////////////////////////////////////////////////////////////////////////////
// ФУНКЦИИ
// Открытие/закрытие popup.
const escClosePopupHandler = function (e) {
  if (e.key === 'Escape') {
    const currentPopup = document.querySelector('.popup__openned');
    closePopup(currentPopup);
  }
};

const openPopup = function (element) {
  element.classList.add('popup__openned');
  document.addEventListener('keydown', escClosePopupHandler);
};

const closePopup = function (element) {
  element.classList.remove('popup__openned');
  document.removeEventListener('keydown', escClosePopupHandler);
};

// Создание карточки.

// Карточки из массива.
initialCards.forEach((item) => {
  const card = new Card(item, templateElement);

  const cardElement = card.generateCard();

  elements.prepend(cardElement);
});


// Колбэк добавления новой карточки.
const submitAddForm = function (e) {
  e.preventDefault();
  const newCard = new Card(
    { name: addFormPlace.value, link: addFormUrl.value },
    templateElement
  );
  const card = newCard.generateCard();
  elements.prepend(card);
  closePopup(popupAddElement);
  popupAddCardFormButton.disabled = true;
  popupAddCardFormButton.classList.add('popup__button_disabled');
};



// Callback редактирования профиля.
const submitEditForm = function (evt) {
  evt.preventDefault();
  currentName.textContent = editFormName.value;
  currentOccupation.textContent = editFormOccupation.value;
  closePopup(popupEditProfile);
};
/////////////////////////////////////////////////////////////////////////////////////
// Слушатели событий
// Добавление новой карточки

submitAddCardForm.addEventListener('submit', submitAddForm);


// Открытие popup с сохранением текущего имени и рода деятельности.
buttonOpenEditProfileForm.addEventListener('click', function () {
  openPopup(popupEditProfile);
});
// Открытие popup

addElementButton.addEventListener('click', function (e) {
  openPopup(popupAddElement);
  submitAddCardForm.reset();
});

// Закрытие popup
popupAddElement.addEventListener('click', function (e) {
  if (e.target === popupAddElement || e.target === popupAddElementButtonClose) {
    closePopup(popupAddElement);
  }
});
popupEditProfile.addEventListener('click', function (e) {
  if (
    e.target === popupEditProfile ||
    e.target === popupEditProfileCloseButton
  ) {
    closePopup(popupEditProfile);
  }
});
popupImage.addEventListener('click', function (e) {
  if (e.target === popupImage || e.target === popupImageCloseButton) {
    closePopup(popupImage);
  }
});
// Submit с именем и родом деятельности.
submitEditProfileForm.addEventListener('submit', submitEditForm);


