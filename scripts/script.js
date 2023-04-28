const popUp = document.querySelector('.popup');

const editButton = document.querySelector('.profile__button-edit');

const closeButton = document.querySelector('.popup__button-close');

const currentName = document.querySelector('.profile__title');
const formName = document.querySelector('.popup__name');

const currentOccupation = document.querySelector('.profile__paragraph');
const formOccupation = document.querySelector('.popup__occupation');

const popUpForm = document.querySelector('.popup__form-container');

const hidePopup = function () {
  popUp.classList.toggle('popup_hidden');
}

editButton.addEventListener('click', function () {
  hidePopup();
  formName.value = currentName.textContent;
  formOccupation.value = currentOccupation.textContent;
})

closeButton.addEventListener('click', function () {
  hidePopup();
})

const handleFormSubmit = function (evt) {
  evt.preventDefault();
  currentName.textContent = formName.value;
  currentOccupation.textContent = formOccupation.value;
  hidePopup();
}
popUpForm.addEventListener('submit', handleFormSubmit);
