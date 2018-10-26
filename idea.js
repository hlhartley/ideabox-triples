class Idea {
  constructor(title, body) {
    this.id = Math.floor(Date.now() / 1000); 
    this.title = title;
    this.body = body;
    this.quality = 'Swill';
  }

  saveToStorage() {
    localStorage.setItem(JSON.stringify(this.id),JSON.stringify(this));
  }


  deleteFromStorage(cardToDeleteId) {
    localStorage.removeItem(cardToDeleteId);
  }

  updateSelf() {
    // after modifying card it will save to local storage
  }

  updateQuality() {
    console.log('hi');
    // clicking up/down vote buttons will update quality
  }
}

// module.exports = Idea;
