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
        element,
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
      instance.modal = new bootstrap.Modal(instance.element, {});

      document.getElementById(instance.id).addEventListener('hidden.bs.modal', (event) => {
        instance.modal.dispose();
        this.renderInstance();
      });

      if ( instance.cookie.expired && instance.modal ) {
        setTimeout(() => {
          console.log('showing new modal!');
          instance.modal.show();
        }, instance.delay );
      }

    }
  }

  handleCloseClick() {
    if ( this.DOM.button_close && this.modal.instance ) {
      this.DOM.button_close.addEventListener("click", (e) => {
        this.modal.instance.hide();
        this.enableCookie();
      })
    }
  }

  enableCookie() {
    console.log('cookie enabled!');
  }

  start() {
    if ( this.showPopUp() ) {

      let whileController = true;
      let whileCounter = 0;

      // init modal instance
      this.modal.instance = new bootstrap.Modal(this.DOM.block, {});

      // show modal
      this.renderPopUp();

      console.log('before while');
      while ( whileController ) {
        console.log(whileCounter);

      }
      console.log('after while');

      // add event listener to close button
      this.handleCloseClick();

      // log data
      console.log(this.modal);
      console.log(this.modal.instance._isShown);

    }
  }

  renderPopUp() {
    const { instance: modal } = this.modal;
    modal.show();
  }

  showPopUp() {
    const { delay } = this.modal;
    let intervalID;

    setTimeout(() => {
      modal.show();
    }, delay );

  }

}
