import Cookies from 'cookies';

export default class CookieNotice {

  constructor() {
    this.DOM = {
      button: document.querySelector('#shopify-section-cookie-notice .cookie-notice__button-accept'),
      main: document.querySelector('#shopify-section-cookie-notice .cookie-notice__main'),
      section: document.getElementById('shopify-section-cookie-notice')
    }
    this.cookie = {
      duration: parseInt(this.DOM.main.dataset.cookieDuration || 30),
      expired: Cookies.get('viavino--accept-cookies') ? false : true,
      name: 'viavino--accept-cookies',
      value: 'accept'
    }
    this.delay = parseInt(this.DOM.main.dataset.delay || 3000);

    this.init();
  }

  init() {
    console.log(this.showNotice());
    if ( this.showNotice() ) {
      this.renderNotice();
      this.handleClick();
    }
  }

  showNotice() {
    return this.DOM.main && this.cookie.expired;
  }

  renderNotice() {
    setTimeout(() => this.DOM.section.classList.add('active'), this.delay);
  }

  handleClick() {
    this.DOM.button.addEventListener('click', () => {
      this.DOM.section.classList.remove('active');
      Cookies.set( this.cookie.name, this.cookie.value, this.cookie.duration );
    });
  }

}
