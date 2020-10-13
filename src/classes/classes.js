class Feed {
  constructor(name, url) {
    this.url = url;
    this.key = `${url}_${new Date().toISOString()}`;
    this.isEnabled = true;
    this.name = name;
    this.shortenedUrl = this.url.length < 50 ? this.url : `${this.url.substring(0,47)}...`;
  }
}

module.exports = {
  Feed,
};

