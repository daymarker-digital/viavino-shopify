import Cookies from 'cookies';

const config = { debug: false, name: 'ageGate.js', version: '1.0' };
const modal = {
  element: document.getElementById('age-gate') || false,
  instance: false
};
const cookie = {
	name: 'viavino--age-gate',
	value: 'of-age',
  delay: function() {
    if ( modal.element ) {
      return parseInt( modal.element.dataset.delay || 4000 );
    }
    return 4000;
  },
  duration: function() {
    if ( modal.element ) {
      return parseInt( modal.element.dataset.cookieDuration || 30 );
    }
    return 35;
  },
  expired: function() {
    return Cookies.get( this.name ) ? false : true;
  }
};

const showAgeGate = ( modal = false, delay = 0 ) => {
  if ( modal ) {
    setTimeout(() => {
      modal.show();
    }, delay );
  }
};

const init = () => {
  if ( config.debug ) console.log(`[ ${config.name} v.${config.version} initialized ]`);
  if ( cookie.expired() && modal.element ) {
    modal.instance = new bootstrap.Modal(modal.element, {}) || false;
    showAgeGate( modal.instance, cookie.delay );
    modal.element.addEventListener( 'hide.bs.modal', function (event) {
      Cookies.set( cookie.name, cookie.value, cookie.duration() );
    });
  }
  if ( config.debug ) console.log(`[ ${config.name} v.${config.version} complete ]`);
};

export default { init };
