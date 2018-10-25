class Idea {
  constructor(title, body) {
    this.id = Math.floor(Date.now() / 1000); 
    this.title = title;
    this.body = body;
    this.quality = 'swill';
  }

  saveToStorage() {
    localStorage.setItem(JSON.stringify(this.id),JSON.stringify(this));
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
