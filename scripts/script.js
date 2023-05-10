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
// ELEMENTS
const elements = document.querySelector('.elements');
const elementImages = document.querySelectorAll('.element__image');
const elementParagraphs = document.querySelectorAll('.element__paragraph');
// Загрузка карточек из массива объектов(базы данных). Реализовал циклом(?) через отдельную функцию, чтобы можно было вызывать её в других функциях при необходимости. Если в перспективе повторное использование не понадобиться можно переделать на IIFE.
const displayElements = function () {
  for (let i = 0; i < elementImages.length; i++) {
    elementImages[i].setAttribute('src', initialCards[i].link);
    elementImages[i].setAttribute('alt', initialCards[i].name);
    elementParagraphs[i].textContent = initialCards[i].name;
  }
}
displayElements();

// Popup редактирования имени и рода деятельности.
const popupEdit = document.querySelector('.popup-edit');
const editButton = document.querySelector('.profile__button-edit');
const closeButtonPopupEdit = document.querySelector('.popup-edit__button-close');
const currentName = document.querySelector('.profile__title');
const formName = document.querySelector('.popup__field_type_name');
const currentOccupation = document.querySelector('.profile__paragraph');
const formOccupation = document.querySelector('.popup__field_type_occupation');
const editPopupForm = document.querySelector('.popup-edit__form');
const formPhotoUrl = document.querySelector('.popup__field_type_photo-url');
const currentPhoto = document.querySelector('.profile__image');

// Popup добавления картинки
const addButton = document.querySelector('.profile__button-add');
const popupAdd = document.querySelector('.popup-add');
const closeButtonPopupAdd = document.querySelector('.popup-add__button-close');
const makeButtonPopupAdd = document.querySelector('.popup__button-make');
const addPopupForm = document.querySelector('.popup-add__form');
const formPlaceName = document.querySelector('.popup__field_type_place-name');
const formUrl = document.querySelector('.popup__field_type_url');

// Открытие/закрытие popup редактирования профиля.
const popupVisible = function () {
  popupEdit.classList.toggle('popup_hidden');
};
// Callback редактирования профиля.
const handleFormSubmit = function (evt) {
  evt.preventDefault();
  currentName.textContent = formName.value;
  currentOccupation.textContent = formOccupation.value;
  currentPhoto.src = formPhotoUrl.value;
  formPhotoUrl.value = '';
  popupVisible();
};
// Submit с именем и родом деятельности.
editPopupForm.addEventListener('submit', handleFormSubmit);
// Открытие popup с сохранением текущего имени и рода деятельности.
editButton.addEventListener('click', function () {
  popupVisible();
  formName.value = currentName.textContent;
  formOccupation.value = currentOccupation.textContent;
  formPhotoUrl.value = currentPhoto.src;
});
// Закрытие popup.
closeButtonPopupEdit.addEventListener('click', popupVisible);



// Открытие/закрытие popup добавление картинки.
const addPopupVisible = function () {
  popupAdd.classList.toggle('popup_hidden');
};
// Открытие popup
addButton.addEventListener('click', addPopupVisible);
// Callback для добавления нового элемента
const handleAddFormSubmit = function (evt) {
  evt.preventDefault();
  const templateElement = document.querySelector('#element').content;
  const newElement = templateElement.querySelector('.element').cloneNode(true);
  newElement.querySelector('.element__image').src = `${formUrl.value}`;
  newElement.querySelector('.element__image').alt = `${formPlaceName.value}`;
  newElement.querySelector('.element__paragraph').textContent = `${formPlaceName.value}`;
  elements.prepend(newElement);
  addPopupVisible();
  formPlaceName.value = '';
  formUrl.value = '';
}
// Добавление нового элемента.
addPopupForm.addEventListener('submit', handleAddFormSubmit);
// Закрытие popup
closeButtonPopupAdd.addEventListener('click', addPopupVisible);
