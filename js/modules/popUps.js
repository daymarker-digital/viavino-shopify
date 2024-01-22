export default class PopUps {

  _config = {
    debug: true,
    name: "PopUps",
    version: "1.0"
  }

  constructor( block=false ) {

    this.elements = document.querySelectorAll(".js--pop-up") || [];
    this.active = false;
    this.instances = {};

    this.collectInstances();
    this.renderInstances();

  }

  collectInstances() {
    this.elements.forEach((element) => {

      const id = element.id;
      const delay = parseInt(element.dataset.delay);
      const cookie_duration = parseInt(element.dataset.cookieDuration);
      const priority = parseInt(element.dataset.priority);
      const modal = new bootstrap.Modal(element, {});

      this.instances[id] = {
        delay,
        cookie_duration,
        modal,
        priority
      }

    });
  }

  renderInstances() {

    const instances = Object.values(this.instances).sort((a, b) => a.priority - b.priority);




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
