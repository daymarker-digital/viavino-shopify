import AgeGate from './modules/ageGate';
import Announcements from './modules/announcements';
import Cart from './modules/cart';
import CookieNotice from './modules/cookieNotice';
import Credits from './modules/credits';
import Drawers from './modules/drawers';
import Forms from './modules/forms';
import Gliders from './modules/gliders';
import InstagramFeed from './modules/instagramFeed';
import PopUps from './modules/popUps';
import Product from './modules/product';
import Scrolling from './modules/scrolling';
import Tools from './modules/tools';

Announcements.init();
Cart.init();

Credits.init();
Drawers.init();
Forms.init();

Product.init();
Scrolling.init();

AOS.init({
  offset: 150,                // offset (in px) from the original trigger point
  delay: 0,                   // values from 0 to 3000, with step 50ms
  duration: 500,              // values from 0 to 3000, with step 50ms
  easing: 'ease-in-out',      // default easing for AOS animations
});

// ---------------------------------------- On Load
window.addEventListener( 'load', (event) => {

  Tools.setViewportHeightCSSVariable();
  Tools.themeClasses();

  new PopUps();
  new CookieNotice();

  InstagramFeed.init();
  Gliders.init();

  AOS.refresh();

  if ( document.querySelector(".storerocket-store-locator") ) {
    StoreRocket.init({
      selector: ".storerocket-store-locator",
      account: "6wpZKO14An",
    });
  }

});

// ---------------------------------------- On Resize
window.addEventListener( 'resize', Tools.debounce(() => {}, 300));

window.addEventListener( 'resize', Tools.throttle(() => {
  Tools.setViewportHeightCSSVariable();
}, 300));

// ---------------------------------------- On Scroll
window.addEventListener( 'scroll', Tools.debounce(() => {}, 300));

window.addEventListener( 'scroll', Tools.throttle(() => {
  Tools.setViewportHeightCSSVariable();
}, 300));
