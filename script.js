const popUp = document.querySelector('.popup');

const editButton = document.querySelector('.profile__button_action_edit');

const closeButton = document.querySelector('.popup__button_action_close');

const currentName = document.querySelector('.profile__title');
const formName = document.querySelector('.popup__form_name');

const currentOccupation = document.querySelector('.profile__paragraph');
const formOccupation = document.querySelector('.popup__form_occupation');

const saveButton = document.querySelector('.popup__button_action_save');

editButton.addEventListener('click', function () {
  popUp.classList.toggle('popup_hidden');
  formName.value = currentName.textContent;
  formOccupation.value = currentOccupation.textContent;
})

closeButton.addEventListener('click', function () {
  popUp.classList.toggle('popup_hidden');
})

saveButton.addEventListener('click', function() {
  currentName.textContent = formName.value;
  currentOccupation.textContent = formOccupation.value;
  popUp.classList.toggle('popup_hidden');
})
