document.querySelector('.save-btn').addEventListener('click', createInitialCard);
document.querySelector('.cards-container').addEventListener('change', saveUserInput);
document.querySelector('.title-input').addEventListener('keyup', disableSaveButton);
document.querySelector('.body-input').addEventListener('keyup', disableSaveButton);
document.querySelector('.cards-container').addEventListener('click', checkDeleteButton);
document.querySelector('.search-bar-input').addEventListener('keyup', filterSearch);
document.querySelector('.garbage-button').addEventListener('click', filterByQuality);
document.querySelector('.swill-button').addEventListener('click', filterByQuality);
document.querySelector('.plausible-button').addEventListener('click', filterByQuality);
document.querySelector('.genius-button').addEventListener('click', filterByQuality);
document.querySelector('.louisa-tier-button').addEventListener('click', filterByQuality);
document.querySelector('.show-all-button').addEventListener('click', showAllIdeas);
document.querySelector('.show-more-btn').addEventListener('click', showMoreLessCards);
document.querySelector('.show-less-btn').addEventListener('click', showMoreLessCards);

function createInitialCard() {
  event.preventDefault();
  const titleInput = document.querySelector('.title-input');
  const bodyInput = document.querySelector('.body-input');
  const idea = new Idea(titleInput.value, bodyInput.value);
  createCardTemplate(idea.id, idea.title, idea.body, idea.quality);
  idea.saveToStorage();
  clearInputs();
  disableSaveButton();
  updateIdeaArray();
}

function createCardTemplate(id, title, body, quality) {
  const qualityList = ['Garbage','Swill','Plausible','Genius','Louisa Tier'];
  const cardsContainer = document.querySelector('.cards-container');
  const stringQuality = qualityList[quality];
  const newCard = 
  `<article id="${id}" class="idea-card">
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

function clearInputs() {
  const titleInput = document.querySelector('.title-input');
  const bodyInput = document.querySelector('.body-input');
  titleInput.value = '';
  bodyInput.value = '';
}

function disableSaveButton() {
  const saveButton = document.querySelector('.save-btn');
  const titleInput = document.querySelector('.title-input');
  const bodyInput = document.querySelector('.body-input');

  if (titleInput.value === '' || bodyInput.value === '') {
    saveButton.disabled = true;
  } else {
    saveButton.disabled = false;
  }
}

function updateIdeaArray(){
  return document.getElementsByClassName('idea-card');
}

function saveUserInput(text) {
  if (text === 'title') {
    var changedElement = 'title';
    var changedTextID = event.target.dataset.titleid;
    var changedTextValue = event.target.innerText;
  } else if (text === 'body') {
    var changedElement = 'body';
    var changedTextID = event.target.dataset.bodyid;
    var changedTextValue = event.target.innerText;
  }
  Idea.prototype.updateSelf(changedElement, changedTextID, changedTextValue);
}

function checkEnterKey(type) {
  const key = event.keyCode;
  if (key === 13) { 
    event.preventDefault();
    saveUserInput(type);
  }
}

function updateVote(type) {
  const qualityList = ['Garbage','Swill','Plausible','Genius','Louisa Tier'];
  const ideaID = event.target.dataset.ideaid;
  const qualityStatus = event.target.parentElement.childNodes[5].firstElementChild.innerText;
  const output = event.target.parentElement.childNodes[5].firstElementChild; 
  const qualityIndex = qualityList.indexOf(qualityStatus);
  let newQualityIndex;

  if (type ==='up' && (qualityIndex === qualityList.length-1)) {
    newQualityIndex = qualityList.length-1; 
  } else if (type ==='up') {
    newQualityIndex = qualityIndex + 1;
  }
  if (type === 'down' && qualityIndex === 0) {
    newQualityIndex = 0; 
  } else if (type === 'down') { 
    newQualityIndex = qualityIndex - 1;    
  }
  output.innerText = qualityList[newQualityIndex];
  Idea.prototype.updateQuality(ideaID, newQualityIndex);
}

function checkDeleteButton() {
  if (event.target.classList.contains('delete-btn')) {
   event.target.closest('article').remove();
   var cardToDeleteId = event.target.closest('article').id;
   Idea.prototype.deleteFromStorage(cardToDeleteId);
   updateIdeaArray();
 }
}

function filterSearch() {
  var searchBarInput = document.querySelector('.search-bar-input');
  var filterInput = searchBarInput.value.toLowerCase();
  var ideaArray = updateIdeaArray();

  for (var i = 0; i < ideaArray.length; i++) {  
    if(ideaArray[i].childNodes[1].childNodes[1].innerText.toLowerCase().indexOf(filterInput) === -1 
      && ideaArray[i].childNodes[1].childNodes[3].innerText.toLowerCase().indexOf(filterInput) === -1) {
      ideaArray[i].setAttribute('style', 'display: none');
      } else {
      ideaArray[i].setAttribute('style', 'display: block');
    } 
  }
}

function showMoreLessCards() {
  const showLess = document.querySelector('.show-less-btn');
  const showMore = document.querySelector('.show-more-btn');
  const cardsContainer = document.querySelector('.cards-container');

  event.target === showMore ? cardsContainer.classList.remove('max-height') : cardsContainer.classList.add('max-height');
  showMore.classList.toggle('more-less-toggle');
  showLess.classList.toggle('more-less-toggle');
}

function filterByQuality() {
  const filterQualityNumber = event.target.dataset.qualitynumber;
  localStorage.setItem('mostRecentFilter', filterQualityNumber);
  showFilteredIdeas(filterQualityNumber);
}

function showFilteredIdeas(filterQualityNumber) {
  removeAll();
  filteredIdeas(filterQualityNumber).forEach(function(idea) {
    const { id, title, body, quality } = idea;
    createCardTemplate(id, title, body, quality);
  })
}

function removeAll() {
  const cardsContainer = document.querySelector('.cards-container');
  cardsContainer.innerHTML = ''; 
}

function filteredIdeas(filterQualityNumber) {
  return allIdeas().filter(eachIdea => eachIdea.quality == filterQualityNumber);
}

function allIdeas() {
  let tempStorage = Object.assign({}, localStorage);
  delete tempStorage.mostRecentFilter;
  return Object.values(tempStorage).map(ideaString => JSON.parse(ideaString));
}

function showAllIdeas() {
  removeAll();
  delete localStorage.mostRecentFilter;
  allIdeas().forEach(function(idea) {
    const { id, title, body, quality } = idea;
    createCardTemplate(id, title, body, quality);
  })
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