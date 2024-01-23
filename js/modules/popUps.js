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
        expired: Cookies.get(`viavino--${id}`) ? false : true,
        name: `viavino--${id}`,
        value: 'accept'
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

  }

  renderInstance() {
    if ( this.instances.length > 0 ) {

      const instance = this.instances.shift();
      const instanceID = instance.id;

      instance.modal = new bootstrap.Modal(`#${instanceID}`, {});

      document.getElementById(instanceID).addEventListener('hidden.bs.modal', (event) => {
        console.log(instance.cookie);
        Cookies.set( instance.cookie.name, instance.cookie.value, instance.cookie.duration );
        this.renderInstance();
      });

      if ( instance.cookie.expired && instance.modal ) {
        setTimeout(() => instance.modal.show(), instance.delay );
      } else {
        this.renderInstance();
      }

    }
  }

  setCookie(cookie={}) {



  }

}
