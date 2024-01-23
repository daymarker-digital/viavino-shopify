import Cookies from 'cookies';

export default class CookieNotice {
  constructor() {
    this.cookie = {
      name: 'viavino--accept-cookies',
      value: 'yes',
      expired: function() {
        return Cookies.get(this.name) ? false : true;
      }
    }
    this.DOM = {
      button: document.querySelector('#shopify-section-cookie-notice .cookie-notice__button-accept'),
      main: document.querySelector('#shopify-section-cookie-notice .cookie-notice__main'),
      section: document.getElementById('shopify-section-cookie-notice')
    }
    this.init();
  }
  init() {
    console.log(this.cookie.expired());
    console.log(this.DOM.main);
  }
}

const cookie = {
	name: 'viavino--accept-cookies',
	value: 'yes',
  delay: function() {
    if ( element.main ) {
      return parseInt(element.main.dataset.delay || 3000);
    }
    return 3000;
  },
  duration: function() {
    if ( element.main ) {
      return parseInt(element.main.dataset.cookieDuration || 30);
    }
    return 35;
  },
  expired: function() {
    return Cookies.get( this.name ) ? false : true;
  }
};

const show = ( element = false, delay = 0 ) => {
  if ( element ) {
    setTimeout(() => {
      element.classList.add( 'active' );
    }, delay );
  }
};

const init = () => {
  if ( config.debug ) console.log(`[ ${config.name} v.${config.version} initialized ]`);

  if ( cookie.expired() && element.main ) {
    show( element.section, cookie.delay );
    if ( element.button ) {
      element.button.addEventListener( 'click', event => {
        Cookies.set( cookie.name, cookie.value, cookie.duration() );
        element.section.classList.remove( 'active' );
      });
    }
  }

  if ( config.debug ) console.log(`[ ${config.name} v.${config.version} complete ]`);
};

