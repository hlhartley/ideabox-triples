// ** Event Listeners **
document.querySelector('.search-bar-input').addEventListener('keyup', filterSearch);
document.querySelector('.title-input').addEventListener('keyup', disableSaveButton);
document.querySelector('.body-input').addEventListener('keyup', disableSaveButton);
document.querySelector('.cards-container').addEventListener('click', checkDeleteButton);
document.querySelector('.cards-container').addEventListener('change', saveUserInput);
document.querySelector('.save-btn').addEventListener('click', createInitialCard);
document.querySelector('.garbage-button').addEventListener('click', filterByQuality);
document.querySelector('.swill-button').addEventListener('click', filterByQuality);
document.querySelector('.plausible-button').addEventListener('click', filterByQuality);
document.querySelector('.genius-button').addEventListener('click', filterByQuality);
document.querySelector('.louisa-tier-button').addEventListener('click', filterByQuality);
document.querySelector('.show-all-button').addEventListener('click', showAllIdeas);
document.querySelector('.show-more-btn').addEventListener('click', showMoreLessCards);
document.querySelector('.show-less-btn').addEventListener('click', showMoreLessCards);

// ** Functions **
function showMoreLessCards() {
  let showLess = document.querySelector('.show-less-btn');
  let showMore = document.querySelector('.show-more-btn');
  var cardsContainer = document.querySelector('.cards-container');
  event.target === showMore ? cardsContainer.classList.remove('max-height') : cardsContainer.classList.add('max-height');
  showMore.classList.toggle('more-less-toggle');
  showLess.classList.toggle('more-less-toggle');
}

function checkEnterKey(type) {
  const key = event.keyCode;
  if (key === 13) { 
    event.preventDefault();
    saveUserInput(type);
  }
}

function saveUserInput(text) {
  if (text === 'title') {
    let changedElement = 'title';
    let changedTextID = event.target.dataset.titleid;
    let changedTextValue = event.target.innerText;
  } else if (text === 'body') {
    let changedElement = 'body';
    let changedTextID = event.target.dataset.bodyid;
    let changedTextValue = event.target.innerText;
  }
  Idea.prototype.updateSelf(changedElement, changedTextID, changedTextValue);
}

function createInitialCard() {
  event.preventDefault();
  var bodyInput = document.querySelector('.body-input');
  var titleInput = document.querySelector('.title-input');
  var idea = new Idea(titleInput.value, bodyInput.value);
  createCardTemplate(idea.id, idea.title, idea.body, idea.quality);
  idea.saveToStorage();
  clearInputs();
  disableSaveButton();
  updateIdeaArray();
}

// updateIdeaArray();


function createCardTemplate(id, title, body, quality) {
  var qualityList = ['Garbage','Swill','Plausible','Genius','Louisa Tier'];
  var cardsContainer = document.querySelector('.cards-container');
  let stringQuality = qualityList[quality];
  let newCard = `<article id="${id}" class="idea-card">
  <section class="output-container">
  <h1 onkeydown="checkEnterKey('title')" onfocusout="saveUserInput('title')" data-titleID="${id}" class="title-output" contenteditable="true">${title}</h1> 
  <p onkeydown="checkEnterKey('body')" onfocusout="saveUserInput('body')" data-bodyID="${id}" class="body-output" contenteditable="true">${body}</p>
  </section>
  <section class="quality-container">
  <div class="left-quality-container">
  <img onclick="updateVote('down')" data-ideaID="${id}" class="quality-icons downvote-btn" src="images/downvote.svg">
  <img onclick="updateVote('up')" data-ideaID="${id}" class="quality-icons upvote-btn" src="images/upvote.svg">
  <h2 class="quality-header">Quality: <span class="quality-actual">${stringQuality}<span></h2>
  </div>
  <div class="right-quality-container">
  <img class="quality-icons delete-btn" src="images/delete.svg">
  </div>
  </section>
  </article>`;
  cardsContainer.innerHTML = newCard + cardsContainer.innerHTML;
}

function checkDeleteButton() {
  if (event.target.classList.contains('delete-btn')) {
   event.target.closest('article').remove();
   const cardToDeleteId = event.target.closest('article').id;
   Idea.prototype.deleteFromStorage(cardToDeleteId);
   updateIdeaArray();
 }
}

function updateVote(type) {
  var qualityList = ['Garbage','Swill','Plausible','Genius','Louisa Tier'];
  var ideaID = event.target.dataset.ideaid;
  let qualityStatus = event.target.parentElement.childNodes[5].firstElementChild.innerText;
  let qualityIndex = qualityList.indexOf(qualityStatus);
  if (type ==='up' && (qualityIndex === qualityList.length-1)) {
    let newQualityIndex = qualityList.length-1; 
  } else if (type ==='up') {
    let newQualityIndex = qualityIndex + 1;
  }
  if (type === 'down' && qualityIndex === 0) {
    let newQualityIndex = 0; 
  } else if (type === 'down') { 
    let newQualityIndex = qualityIndex - 1;    
  }
  let output = event.target.parentElement.childNodes[5].firstElementChild; 
  output.innerText = qualityList[newQualityIndex];
  Idea.prototype.updateQuality(ideaID, newQualityIndex);
}

function disableSaveButton() {
  let saveButton = document.querySelector('.save-btn');
  var titleInput = document.querySelector('.title-input');
  var bodyInput = document.querySelector('.body-input');
   if (titleInput.value === '' || bodyInput.value === ''){
    saveButton.disabled = true;
    } else {
     saveButton.disabled = false;
  }
}

function clearInputs() {
  var titleInput = document.querySelector('.title-input');
  var bodyInput = document.querySelector('.body-input');
  titleInput.value = '';
  bodyInput.value = '';
}

function updateIdeaArray(){
  return document.getElementsByClassName('idea-card');
}

function filterSearch() {
  const searchBarInput = document.querySelector('.search-bar-input');
  let filterInput = searchBarInput.value.toLowerCase();
  let ideaArray = updateIdeaArray();
  for (var i = 0; i < ideaArray.length; i++) {  
    if(ideaArray[i].childNodes[1].childNodes[1].innerText.toLowerCase().indexOf(filterInput) === -1 
      && ideaArray[i].childNodes[1].childNodes[3].innerText.toLowerCase().indexOf(filterInput) === -1) {
      ideaArray[i].setAttribute('style', 'display: none');
      } else {
      ideaArray[i].setAttribute('style', 'display: block');
    } 
  }
}

function displayIdeas() {
  const mostRecentFilter = localStorage.mostRecentFilter;
  if (mostRecentFilter) {
    showFilteredIdeas(mostRecentFilter);
  } else {
    showAllIdeas();
  }
}

displayIdeas();

function showAllIdeas() {
  removeAll();
  delete localStorage.mostRecentFilter;
  allIdeas().forEach(function(idea) {
    const { id, title, body, quality } = idea;
    createCardTemplate(id, title, body, quality);
  })
}

function showFilteredIdeas(filterQualityNumber) {
  removeAll();
  filteredIdeas(filterQualityNumber).forEach(function(idea) {
    const { id, title, body, quality } = idea;
    createCardTemplate(id, title, body, quality);
  })
}

function allIdeas() {
  let tempStorage = Object.assign({}, localStorage);
  delete tempStorage.mostRecentFilter;
  return Object.values(tempStorage).map(ideaString => JSON.parse(ideaString));
}

function filteredIdeas(filterQualityNumber) {
  return allIdeas().filter(eachIdea => eachIdea.quality == filterQualityNumber);
}

function filterByQuality() {
  const filterQualityNumber = event.target.dataset.qualitynumber;
  localStorage.setItem('mostRecentFilter', filterQualityNumber);
  showFilteredIdeas(filterQualityNumber);
}

function removeAll() {
  var cardsContainer = document.querySelector('.cards-container');
  cardsContainer.innerHTML = ''; 
}



