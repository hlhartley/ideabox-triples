var cardQuality = document.querySelector('.card-quality');
var titleInput = document.querySelector('.title-input');
var bodyInput = document.querySelector('.body-input');
var saveButton = document.querySelector('.save-btn');
var titleOutput = document.querySelector('.title-output');
var bodyOutput = document.querySelector('.body-output');
var cardsContainer = document.querySelector('.cards-container');

saveButton.addEventListener('click', createCard);
cardsContainer.addEventListener('click', deleteCard) 

function createCard(event) {
  event.preventDefault();
  var uniqueCardId = Math.floor(Date.now() / 1000);
  uniqueCardId = new Idea(titleInput.value, bodyInput.value);
  uniqueCardId.displayCard();
}

function deleteCard(event) {
  var classFind = event.target.className.substr(0,10);
  var del = document.querySelector('.card' + classFind);
  if (event.target.tagName.toLowerCase() === 'img') {
    del.remove();
  }
}
