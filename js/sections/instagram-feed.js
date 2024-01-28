class InstagramFeed {

  _config = {
    debug: true,
    name: "InstagramFeed",
    version: "1.0"
  }

  constructor() {
    this.elements = document.querySelectorAll(".js--instagram-feed") || [];
    this.instances = [];
    this.init();
  }

  init() {
    this.collectInstances();
    this.log();
  }

  collectInstances() {
    this.elements.forEach((element) => {

      const id = element.id;
      const feed = {
        account: element.dataset.feedAccount || "not-set",
        limit: parseInt(element.dataset.feedLimit || 9)
      };
      const localStorage = {};

      this.instances.push({
        element,
        id,
        feed,
        localStorage,
      });

    });
  }

  log() {
    console.log(`Logging ${this._config.name} v.${this._config.version}`);
    console.log(`Elements ::`, this.elements);
    console.log(`Instances ::`, this.instances);
    console.log(`Done Logging.`);
  }

}

new InstagramFeed();
