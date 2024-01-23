import Cookies from 'cookies';

export default class PopUps {

  _config = {
    debug: true,
    name: "PopUps",
    version: "1.0"
  }

  constructor( block=false ) {

    this.elements = document.querySelectorAll(".js--pop-up") || [];
    this.active = false;
    this.instances = [];
    this.instanceIndex = 0;

    this.init();

  }

  init() {
    this.collectInstances();
    this.renderInstance();
  }

  collectInstances() {

    this.elements.forEach((element) => {

      const id = element.id;
      const delay = parseInt(element.dataset.delay);
      const cookie = {
        duration: parseInt(element.dataset.cookieDuration),
        value: Cookies.get(`viavino--${id}`),
        expired: Cookies.get(`viavino--${id}`) ? false : true,
      };
      const priority = parseInt(element.dataset.priority);

      this.instances.push({
        id,
        delay,
        cookie,
        priority
      });

    });

    this.instances.sort((a, b) => a.priority - b.priority);

    console.log(this.instances);

  }

  renderInstance() {
    if ( this.instances.length > 0 ) {

      const instance = this.instances.shift();
      const instanceID = instance.id;

      instance.modal = new bootstrap.Modal(`#${instanceID}`, {});

      document.getElementById(instanceID).addEventListener('hidden.bs.modal', (event) => {
        //instance.modal.dispose();
        this.renderInstance();
      });

      if ( instance.cookie.expired && instance.modal ) {
        setTimeout(() => instance.modal.show(), instance.delay );
      }

    }
  }

  enableCookie() {
    console.log('cookie enabled!');
  }

}
