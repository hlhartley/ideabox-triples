var cardQuality = document.querySelector('.card-quality');
var titleInput = document.querySelector('.title-input');
var bodyInput = document.querySelector('.body-input');
var saveButton = document.querySelector('.save-btn');
var titleOutput = document.querySelector('.title-output');
var bodyOutput = document.querySelector('.body-output');
// var deleteButton = document.querySelector('.delete-btn');


saveButton.addEventListener('click', createCard);
// deleteButton.addEventListener('click', deleteCard);

function createCard(event) {
  event.preventDefault();
  var uniqueCardId = Math.floor(Date.now() / 1000);
  uniqueCardId = new Idea(titleInput.value, bodyInput.value);
  uniqueCardId.displayCard();
}

var cardsContainerDiv = document.querySelector('.cards-container');

cardsContainerDiv.addEventListener('click', function(event) {
  var classFind = event.target.className.substr(0,10);
  console.log(classFind);
  var del = document.querySelector('.div' + classFind);
  console.log(del);
  if (event.target.tagName.toLowerCase() === 'button') {
    console.log('hi');
    del.remove();
  }
});
  // var classFind
//   console.log(event.target.className);
// } 