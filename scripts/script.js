// Константы DOM.
// ELEMENTS
const elements = document.querySelector('.elements');
// Template element для создания и добавления новых карточек
const templateElement = document.querySelector('#element').content;
// Popup редактирования профиля
const popupEditProfile = document.querySelector('.popup-edit');
const EditProfileButton = document.querySelector('.profile__button-edit');
const popupEditProfileCloseButton = document.querySelector(
  '.popup-edit__button-close'
);
const currentName = document.querySelector('.profile__title');
const currentOccupation = document.querySelector('.profile__paragraph');
const editFormName = document.querySelector('.popup__field_type_name');
const editFormOccupation = document.querySelector(
  '.popup__field_type_occupation'
);
const editForm = document.querySelector('.popup-edit__form');

// Popup добавления картинки
const addElementButton = document.querySelector('.profile__button-add');
const popupAddElement = document.querySelector('.popup-add');
const popupAddElementButtonClose = document.querySelector(
  '.popup-add__button-close'
);
const addForm = document.querySelector('.popup-add__form');
const addFormPlace = document.querySelector('.popup__field_type_place-name');
const addFormUrl = document.querySelector('.popup__field_type_url');
// Popup картинки
const popupImage = document.querySelector('.popup-image');
const popupImagePicture = document.querySelector('.popup-image__picture');
const popupImageCaption = document.querySelector('.popup-image__caption');
const popupImageCloseButton = document.querySelector('.popup-image__button');

// ФУНКЦИИ

// Открытие/закрытие popup.
const displayPopup = function (element) {
  element.classList.toggle('popup_hidden');
};
// const popupOpen = function (element) {
//   element.classList.remove('popup_hidden');
// }
// const closePopup = function(element) {
//   element.classList.add('popup_hidden');
// }
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
    newElementButton.classList.toggle('element__button');
    newElementButton.classList.toggle('element__button-liked');
  });
  newElementImage.addEventListener('click', function () {
    displayPopup(popupImage);
    popupImagePicture.src = element.link;
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
  displayPopup(popupAddElement);
  addForm.reset();
};

// Callback редактирования профиля.
const submitEditProfileForm = function (evt) {
  evt.preventDefault();
  currentName.textContent = editFormName.value;
  currentOccupation.textContent = editFormOccupation.value;
  displayPopup(popupEditProfile);
};


// Слушатели событий

// Открытие popup с сохранением текущего имени и рода деятельности.
EditProfileButton.addEventListener('click', function () {
  displayPopup(popupEditProfile);
  editFormName.value = currentName.textContent;
  editFormOccupation.value = currentOccupation.textContent;
});

// Открытие popup
addElementButton.addEventListener('click', function () {
  displayPopup(popupAddElement);
});
// Добавление нового элемента.
addForm.addEventListener('submit', submitAddForm);
// Закрытие popup
popupAddElementButtonClose.addEventListener('click', function () {
  displayPopup(popupAddElement);
});
popupEditProfileCloseButton.addEventListener('click', function () {
  displayPopup(popupEditProfile);
});
popupImageCloseButton.addEventListener('click', function () {
  displayPopup(popupImage);
});
// Submit с именем и родом деятельности.
editForm.addEventListener('submit', submitEditProfileForm);
