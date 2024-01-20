const elements = document.querySelectorAll(".js--pop-up") || [];

class PopUps {

  _config = {
    debug: true,
    name: "PopUps",
    version: "1.0"
  }

  constructor( block=false ) {
    this.DOM = {
      block: block,
      button_close: block.querySelector(".js--close-pop-up")
    };
    this.modal = {
      id: block.id,
      instance: false,
      delay: parseInt(block.dataset.delay),
      cookie_duration: parseInt(block.dataset.cookieDuration)
    };
    this.start();
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
    if ( true ) {

      // init modal instance
      this.modal.instance = new bootstrap.Modal(this.DOM.block, {});
      // show modal
      this.showPopUp();
      // add event listener to close button
      this.handleCloseClick();

      // log data
      console.log(this.modal);
      console.log(this.modal.instance._isShown);

    }
  }

  showPopUp() {
    const { instance: modal, delay } = this.modal;
    setTimeout(() => {
      modal.show();
    }, delay );
  }

}

const init = () => {
  elements.forEach((block) => {
    new PopUps(block);
  });
};

export default { init };
