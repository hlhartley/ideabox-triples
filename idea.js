class Idea {
  constructor(title, body) {
    this.title = title;
    this.body = body;
    console.log(this.body);
    console.log(this.title);
  }

  displayCard() {
    var uniqueCardId = Math.floor(Date.now() / 1000);
    var cardsContainer = document.querySelector('.cards-container');
    var card = `<article class="card${uniqueCardId} idea-card">
      <section class="output-container">
        <h1 class="title-output" contenteditable="true">${this.title}</h1> 
        <p class="body-output" contenteditable="true">${this.body}</p>
      </section>
      <section class="quality-container">
        <div class="left-quality-container">
          <img class="quality-icons downvote-btn" src="images/downvote.svg">
          <img class="quality-icons upvote-btn" src="images/upvote.svg">
          <h2 class="quality-header">Quality: <span class=".card-quality">Swill</span></h2>
        </div>
        <div class="right-quality-container">
        <img class="${uniqueCardId} quality-icons delete-btn" src="images/delete.svg">
        </div>
      </section>
    </article>`;
    cardsContainer.innerHTML = cardsContainer.innerHTML + card;
  }

  saveToStorage() {
    // save info to local storage
  }

  deleteFromStorage() {
    // delete from local storage
  }

  updateSelf() {
    // after modifying card it will save to local storage
  }

  updateQuality() {
    // clicking up/down vote buttons will update quality
  }
}

// module.exports = Idea;
