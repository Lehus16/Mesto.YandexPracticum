// Константы DOM.
// ELEMENTS
const elements = document.querySelector('.elements');
// Template element для создания и добавления новых карточек
const templateElement = document.querySelector('#element').content;
// Popup редактирования профиля
const popupEditProfile = document.querySelector('.popup-edit');
const buttonOpenEditProfileForm = document.querySelector('.profile__button-edit');
const popupEditProfileCloseButton = document.querySelector(
  '.popup-edit__button-close'
);
const currentName = document.querySelector('.profile__title');
const currentOccupation = document.querySelector('.profile__paragraph');
const editFormName = document.querySelector('.popup__field_type_name');
const editFormOccupation = document.querySelector(
  '.popup__field_type_occupation'
);
const submitEditProfileForm = document.querySelector('.popup-edit__form');

// Popup добавления картинки
const addElementButton = document.querySelector('.profile__button-add');
const popupAddElement = document.querySelector('.popup-add');
const popupAddElementButtonClose = document.querySelector(
  '.popup-add__button-close'
);
const submitAddCardForm = document.querySelector('.popup-add__form');
const addFormPlace = document.querySelector('.popup__field_type_place-name');
const addFormUrl = document.querySelector('.popup__field_type_url');
// Popup картинки
const popupImage = document.querySelector('.popup-image');
const popupImagePicture = document.querySelector('.popup-image__picture');
const popupImageCaption = document.querySelector('.popup-image__caption');
const popupImageCloseButton = document.querySelector('.popup-image__button');

// ФУНКЦИИ

// Открытие/закрытие popup.
const openPopup = function (element) {
  element.classList.remove('popup_hidden');
};
const closePopup = function (element) {
  element.classList.add('popup_hidden');
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
    newElementButton.classList.toggle('element__button-liked');
  // сам не понял зачем я сделал toggle для двух классов.
  });
  newElementImage.addEventListener('click', function () {
    openPopup(popupImage);
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
  closePopup(popupAddElement);
  submitAddCardForm.reset();
};

// Callback редактирования профиля.
const submitEditForm = function (evt) {
  evt.preventDefault();
  currentName.textContent = editFormName.value;
  currentOccupation.textContent = editFormOccupation.value;
  closePopup(popupEditProfile);
};


// Слушатели событий

// Открытие popup с сохранением текущего имени и рода деятельности.
buttonOpenEditProfileForm.addEventListener('click', function () {
  openPopup(popupEditProfile);
  editFormName.value = currentName.textContent;
  editFormOccupation.value = currentOccupation.textContent;
});

// Открытие popup
addElementButton.addEventListener('click', function () {
  openPopup(popupAddElement);
});
// Добавление нового элемента.
submitAddCardForm.addEventListener('submit', submitAddForm);
// Закрытие popup
popupAddElementButtonClose.addEventListener('click', function () {
  closePopup(popupAddElement);
});
popupEditProfileCloseButton.addEventListener('click', function () {
  closePopup(popupEditProfile);
});
popupImageCloseButton.addEventListener('click', function () {
  closePopup(popupImage);
});
// Submit с именем и родом деятельности.
submitEditProfileForm.addEventListener('submit', submitEditForm);
// Не совсем понял, у меня же уже есть функция submitEditProfileForm
