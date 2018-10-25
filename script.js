var cardQuality = document.querySelector('.card-quality');
var titleInput = document.querySelector('.title-input');
var bodyInput = document.querySelector('.body-input');
var saveButton = document.querySelector('.save-btn');
var titleOutput = document.querySelector('.title-output');
var bodyOutput = document.querySelector('.body-output');
var cardContainer = document.querySelector('.cards-container');

saveButton.addEventListener('click', createCard);
cardContainer.addEventListener('click', upvote);
cardContainer.addEventListener('click', downvote);
cardContainer.addEventListener('click', deleteCard);

function createCard(event) {
  event.preventDefault();
  var idea = new Idea(titleInput.value, bodyInput.value);
  displayCard(idea);
  // uniqueCardId.saveToStorage(uniqueCardId, titleInput.value, bodyInput);

}

function displayCard(idea) {
  var uniqueCardId = Math.floor(Date.now() / 1000);
  var cardsContainer = document.querySelector('.cards-container');
  var card = `<article id="${idea.id}" class="idea-card">
  <section class="output-container">
  <h1 class="title-output" contenteditable="true">${idea.title}</h1> 
  <p class="body-output" contenteditable="true">${idea.body}</p>
  </section>
  <section class="quality-container">
  <div class="left-quality-container">
  <img class="quality-icons downvote-btn" src="images/downvote.svg">
  <img class="quality-icons upvote-btn" src="images/upvote.svg">
  <h2 class="quality-header">Quality: Plausible</h2>
  </div>
  <div class="right-quality-container">
  <img class="quality-icons delete-btn" src="images/delete.svg">
  </div>
  </section>
  </article>`;
  cardsContainer.innerHTML = cardsContainer.innerHTML + card;
  idea.saveToStorage();
}

function deleteCard(event) {
  if (event.target.classList.contains('delete-btn')) {
   event.target.closest('article').remove();
 }
}

function upvote(event) {
  var qualityStatus = event.target.nextElementSibling.innerText;
  if (event.target.classList.contains('upvote-btn')) {
   if (qualityStatus === 'Quality: Swill') {
    event.target.nextElementSibling.innerText = 'Quality: Plausible';
  } else if (qualityStatus === 'Quality: Plausible') {
    event.target.nextElementSibling.innerText = 'Quality: Genius';
  } else {
  }
}
}

function downvote(event) {
  console.log(event.target.nextElementSibling.innerText)
  var qualityStatus = event.target.nextElementSibling.innerText;
  if (event.target.classList.contains('downvote-btn')) {
   if (qualityStatus === 'Quality: Genius') {
    event.target.nextElementSibling.innerText = 'Quality: Plausible';
  } else if (qualityStatus === 'Quality: Plausible') {
    event.target.nextElementSibling.innerText = 'Quality: Swill';
  } else {
  }
}
}