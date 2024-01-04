const addClass = ( $class = '', $elements = [] ) => {
  if ( $class && $elements.length ) {
    for ( let i = 0; i < $elements.length; i++ ) {
      if ( $elements[i] ) {
        $elements[i].classList.add( $class );
      }
    }
  }
};

const debounce = (func, delay) => {
  let inDebounce;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
};

const getArrayOfElementsByTag = ( $elements = [ 'body', 'footer', 'header', 'main' ] ) => {
  let filteredElements = $elements.filter( tag => { return document.getElementsByTagName( tag )[0] } ) || [];
  return filteredElements.map( tag => document.getElementsByTagName( tag )[0] ) || [];
};

const getElementHeightByTag = ( $tag = '' ) => {
  return document.getElementsByTagName( $tag )[0].offsetHeight || 0;
};

const getLocalStorageDataByKey = ( $key = '' ) => {
  return localStorage.getItem( $key );
}

const getTimeStamp = () => {
  let d = new Date();
  return d.getTime();
}

const isMobileDevice = () => {
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return true;
  }
  return false;
}

const removeClass = ( $class = '', $elements = [] ) => {
  if ( $class && $elements.length ) {
    for ( let i = 0; i < $elements.length; i++ ) {
      if ( $elements[i] ) {
        $elements[i].classList.remove( $class );
      }
    }
  }
};

const setCSSVariable = ( $id = '', $value = '' ) => {
  if ( $id && $value ) document.documentElement.style.setProperty( '--' + $id, $value );
};

const setHeaderHeightCSSVariable = () => {
  setCSSVariable('theme-header-height-total', getElementHeightByTag('header') + 'px'  );
};

const setViewportHeightCSSVariable = () => {
  setCSSVariable('theme-viewport-height', window.innerHeight + 'px'  );
};

const setLocalStorageDataByKey = ( $key = '', $value = '' ) => {
  localStorage.setItem( $key, $value );
};

const themeClasses = () => {
  document.body.classList.add( isMobileDevice() ? "is-mobile-device" : "is-not-mobile-device" );
};

const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function() {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function() {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

const toggleClass = ( $class = '', $elements = [] ) => {
  if ( $class && $elements.length ) {
    for( let i = 0; i < $elements.length; i++ ) {
      if ( $elements[i] ) {
        $elements[i].classList.toggle( $class );
      }
    }
  }
};

export default {
  addClass,
  debounce,
  getArrayOfElementsByTag,
  getElementHeightByTag,
  getLocalStorageDataByKey,
  getTimeStamp,
  isMobileDevice,
  removeClass,
  setCSSVariable,
  setHeaderHeightCSSVariable,
  setViewportHeightCSSVariable,
  setLocalStorageDataByKey,
  themeClasses,
  throttle,
  toggleClass
};
