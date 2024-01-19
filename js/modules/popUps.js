const elements = document.querySelectorAll(".js--pop-up") || [];

class PopUps {

  _config = {
    debug: true,
    name: "PopUps",
    version: "1.0"
  }

  constructor( block=false ) {
    this.DOM = {
      block,
    };
    this.modal = {
      id: block.id,
      instance: false,
      delay: parseInt(block.dataset.delay),
      cookie_duration: parseInt(block.dataset.cookieDuration)
    };
    this.start();
  }

  start() {
    if ( true ) {
      this.modal.instance = new bootstrap.Modal(this.DOM.block, {});
      this.showPopUp();
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
