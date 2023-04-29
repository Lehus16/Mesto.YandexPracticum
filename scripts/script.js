const popUp = document.querySelector('.popup');

const editButton = document.querySelector('.profile__button-edit');

const closeButton = document.querySelector('.popup__button-close');

const currentName = document.querySelector('.profile__title');
const formName = document.querySelector('.popup__field_type_name');

const currentOccupation = document.querySelector('.profile__paragraph');
const formOccupation = document.querySelector('.popup__field_type_occupation');

const popUpForm = document.querySelector('.popup__form');

const popupVisible = function () {
  popUp.classList.toggle('popup_hidden');
}

const handleFormSubmit = function (evt) {
  evt.preventDefault();
  currentName.textContent = formName.value;
  currentOccupation.textContent = formOccupation.value;
  popupVisible();
}

editButton.addEventListener('click', function () {
  popupVisible();
  formName.value = currentName.textContent;
  formOccupation.value = currentOccupation.textContent;
})

closeButton.addEventListener('click', popupVisible);

popUpForm.addEventListener('submit', handleFormSubmit);
