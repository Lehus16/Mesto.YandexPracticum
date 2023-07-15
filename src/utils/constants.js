export const selectorsForValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};
// Константы DOM.

// Template element для создания и добавления новых карточек
export const templateElement = document.querySelector('#element').content;

// Popup редактирования профиля
export const buttonOpenEditProfileForm = document.querySelector(
  '.profile__button-edit'
);
// Данные профиля
export const profileImage = document.querySelector('.profile__image');
export const profileTitle = document.querySelector('.profile__title');
export const profileParagraph = document.querySelector('.profile__paragraph');

// Popup редактирования профиля
export const submitEditProfileForm = document.querySelector('.popup-edit__form');
export const popupEditNameField = document.querySelector('.popup__input_type_name');
export const popupEditOccupationField = document.querySelector(
  '.popup__input_type_occupation'
);

// Popup добавления картинки
export const addElementButton = document.querySelector('.profile__button-add');
export const submitAddCardForm = document.querySelector('.popup-add__form');

// Popup редактирования аватара
export const buttonOpenEditAvatarForm = document.querySelector('.profile__image-edit');
export const submitEditAvatarForm = document.querySelector('.popup-avatar__form');
/////////////////////////////////////////////////////////////////////////////////////

export const pageOverlay = document.querySelector('.page-overlay');

// const arhyz = new URL(
//   'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
//   import.meta.url
// );
// const chelyabinsk = new URL(
//   'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
//   import.meta.url
// );
// const ivanovo = new URL(
//   'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
//   import.meta.url
// );
// const kamchatka = new URL(
//   'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
//   import.meta.url
// );
// const kholmogorskyRayon = new URL(
//   'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
//   import.meta.url
// );
// const baikal = new URL(
//   'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
//   import.meta.url
// );

// export const initialCards = [
//   {
//     name: 'Архыз',
//     link: arhyz,
//   },
//   {
//     name: 'Челябинская область',
//     link: chelyabinsk,
//   },
//   {
//     name: 'Иваново',
//     link: ivanovo,
//   },
//   {
//     name: 'Камчатка',
//     link: kamchatka,
//   },
//   {
//     name: 'Холмогорский район',
//     link: kholmogorskyRayon,
//   },
//   {
//     name: 'Байкал',
//     link: baikal,
//   },
// ];

// export const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
//   },
// ];


