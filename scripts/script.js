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
const elementButtons = document.querySelectorAll('.element__button');
// Загрузка карточек из массива объектов(базы данных).
    const addNewElement = function (elem, index, array) {
      const templateElement = document.querySelector('#element').content;
      const newElement = templateElement.querySelector('.element').cloneNode(true);
      const newElementImage = newElement.querySelector('.element__image');
      const newElementParagraph = newElement.querySelector('.element__paragraph');
      const newElementButton = newElement.querySelector('.element__button');
      newElementImage.src = elem.link;
      newElementImage.alt = elem.name;
      newElementParagraph.textContent = elem.name;
      newElementButton.addEventListener('click', function() {
        newElementButton.style.background = 'url("images/BlackLike.svg")';
    })
    elements.append(newElement);
// Хотел сделать функцию, которую вызвал бы в обработчике события при добавлении новой картинки, но отличается append и prepend.
  }
    initialCards.forEach(addNewElement);

// Popup редактирования имени и рода деятельности.
const popupEdit = document.querySelector('.popup-edit');
const editButton = document.querySelector('.profile__button-edit');
const closeButtonPopupEdit = document.querySelector('.popup-edit__button-close');
const currentName = document.querySelector('.profile__title');
const formName = document.querySelector('.popup__field_type_name');
const currentOccupation = document.querySelector('.profile__paragraph');
const formOccupation = document.querySelector('.popup__field_type_occupation');
const editPopupForm = document.querySelector('.popup-edit__form');

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
  popupVisible();
};
// Submit с именем и родом деятельности.
editPopupForm.addEventListener('submit', handleFormSubmit);
// Открытие popup с сохранением текущего имени и рода деятельности.
editButton.addEventListener('click', function () {
  popupVisible();
  formName.value = currentName.textContent;
  formOccupation.value = currentOccupation.textContent;
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
  initialCards.unshift({name: formPlaceName.value, link: formUrl.value});
  const templateElement = document.querySelector('#element').content;
  const newElement = templateElement.querySelector('.element').cloneNode(true);
  const newElementImage = newElement.querySelector('.element__image');
  const newElementParagraph = newElement.querySelector('.element__paragraph');
  const newElementButton = newElement.querySelector('.element__button');
  newElementImage.src = initialCards[0].link;
  newElementImage.alt = initialCards[0].name;
  newElementParagraph.textContent = initialCards[0].name;
  newElementButton.addEventListener('click', function() {
  newElementButton.style.background = 'url("images/BlackLike.svg")';
    })
  elements.prepend(newElement);
  addPopupVisible();
  formPlaceName.value = '';
  formUrl.value = '';
  console.log(initialCards);
}


// Добавление нового элемента.
addPopupForm.addEventListener('submit', handleAddFormSubmit);
// Закрытие popup
closeButtonPopupAdd.addEventListener('click', addPopupVisible);
