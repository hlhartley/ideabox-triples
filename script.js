var cardQuality = document.querySelector('.card-quality');
var titleInput = document.querySelector('.title-input');
var bodyInput = document.querySelector('.body-input');
var saveButton = document.querySelector('.save-btn');
var titleOutput = document.querySelector('.title-output');
var bodyOutput = document.querySelector('.body-output');
var cardContainer = document.querySelector('.cards-container');

saveButton.addEventListener('click', createCard);
cardContainer.addEventListener('click', upvote);
cardContainer.addEventListener('click', deleteCard);

function createCard(event) {
  event.preventDefault();
  var uniqueCardId = Math.floor(Date.now() / 1000);
  uniqueCardId = new Idea(titleInput.value, bodyInput.value);
  uniqueCardId.displayCard();
}

function deleteCard(event) {
  if (event.target.classList.contains('delete-btn')) {
   event.target.closest('article').remove();
  }
}


function upvote(event) {
  if (event.target.classList.contains('upvote-btn')) {
    console.log(event.target.closest('.quality-header'));
    event.target.nextElementSibling.innerText = "hi";
  }
}

