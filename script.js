var uniqueCardId = Math.floor(Date.now() / 1000);
var cardQuality = document.querySelector('.card-quality');
var titleInput = document.querySelector('.title-input');
var bodyInput = document.querySelector('.body-input');
var saveButton = document.querySelector('.save-btn')
var titleOutput = document.querySelector('.title-output');
var bodyOutput = document.querySelector('.body-output');

saveButton.addEventListener('click', createCard);

function createCard() {
  event.preventDefault()
}