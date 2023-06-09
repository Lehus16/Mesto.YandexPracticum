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
const popupImagePicture = document.querySelector('.popup-image__picture');
const popupImageCaption = document.querySelector('.popup-image__caption');
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

const createElement = function (element) {
  const newElement = templateElement.querySelector('.element').cloneNode(true);
  const newElementButton = newElement.querySelector('.element__button');
  const newElementButtonTrash = newElement.querySelector('.element__trash');
  const newElementImage = newElement.querySelector('.element__image');
  newElementImage.src = element.link;
  newElementImage.alt = element.name;
  newElement.querySelector('.element__paragraph').textContent = element.name;
  newElementButtonTrash.addEventListener('click', function () {
    newElement.remove();
  });
  newElementButton.addEventListener('click', function () {
    newElementButton.classList.toggle('element__button-liked');
  });
  newElementImage.addEventListener('click', function () {
    openPopup(popupImage);
    popupImagePicture.src = element.link;
    popupImagePicture.alt = element.name;
    popupImageCaption.textContent = element.name;
  });

  return newElement;
};
const addElement = function (element) {
  elements.prepend(element);
};
// 6 картинок из коробки
initialCards.map(createElement).forEach(addElement);

// Открытие/закрытие popup добавление картинки.
const submitAddForm = function (evt) {
  evt.preventDefault();
  const newCard = { name: addFormPlace.value, link: addFormUrl.value };
  const newElement = createElement(newCard);
  addElement(newElement);
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

// Открытие popup с сохранением текущего имени и рода деятельности.
buttonOpenEditProfileForm.addEventListener('click', function () {
  openPopup(popupEditProfile);
  // editFormName.value = currentName.textContent;
  // editFormOccupation.value = currentOccupation.textContent;
});
// Открытие popup

addElementButton.addEventListener('click', function (e) {
  openPopup(popupAddElement);
  submitAddCardForm.reset();
  // if (!submitAddCardForm.validity.valid) {
  //   submitAddCardForm.querySelector('.popup__button').disabled = true;
  //   submitAddCardForm.classList.add('')
  // }
});
// Добавление нового элемента.
submitAddCardForm.addEventListener('submit', submitAddForm);
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
