import Gliders from './gliders';
import Instagram from '../utils/Instagram';
import LocalStorage from '../utils/LocalStorage';

export default class InstagramFeed {

  _config = {
    debug: true,
    name: "InstagramFeed",
    version: "1.0"
  }

  constructor() {
    this.elements = document.querySelectorAll(".js--instagram-feed") || [];
    this.instances = [];
    this.storage = {
      maxMinutes: 300,
      prefix: "daymarker-digital-instagram-feed"
    };
    this.init();
  }

  init() {
    this.collectInstances();
    this.renderInstances();
  }

  collectInstances() {
    this.elements.forEach((element) => {

      const id = element.id;
      const carousel = {
        animationDuration: parseInt(element.dataset.carouselAnimationDuration || 450),
        autoplay: parseInt(element.dataset.carouselAutoplay || 3500),
        gap: parseInt(element.dataset.carouselGap || 30)
      };
      const feed = {
        account: element.dataset.feedAccount || "not-set",
        limit: parseInt(element.dataset.feedLimit || 9)
      };

      this.instances.push({
        element,
        id,
        carousel,
        feed
      });

    });
  }

  renderFeedFromInstance(instance = {}) {

    let itemCount = 0;
    const { carousel, element, feed, items } = instance;

    carousel.container = element.querySelector(".instagram-feed__carousel") || false;
    carousel.id = `instagram-feed__${Date.now()}`;

    if ( carousel.container && items.length ) {

      let slides = items.map((item, index) => {

        const {
          media_type: type,
          media_url: src,
          permalink: link
        } = item;

        if ( ( "CAROUSEL_ALBUM" === type || "IMAGE" === type ) && ( itemCount < feed.limit ) ) {
          itemCount++;
          return `
            <li class="glide__slide" data-count="${itemCount}">
              <div class="instagram-feed__item">
                <a class="instagram-feed__link link" href="${link}" target="_blank">
                  <img class="instagram-feed__image" src="${src}" alt="Instagram Image" width="350" height="350" />
                </a>
              </div>
            </li>
          `;
        }

      }).join('');

      carousel.container.innerHTML = `
        <div
          class="glide"
          id="${carousel.id}"
          data-glide-animation-duration="${carousel.animationDuration}"
          data-glide-autoplay="${carousel.autoplay}"
          data-glide-gap="${carousel.gap}"
          data-glide-style="instagram-feed"
        >
          <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">${slides}</ul>
          </div>
        </div>
      `;

      Gliders.createGliderFromElement(document.getElementById(carousel.id));

    }

  }

  renderInstances() {
    this.instances.forEach((instance) => {

      const { account } = instance.feed;
      const { maxMinutes: storageMaxMinutes, prefix: storagePrefix } = this.storage;
      const storedData = {};

      storedData.name = `${storagePrefix}--${account}`;
      storedData.data = LocalStorage.getDataByKey(storedData.name);
      storedData.expired = LocalStorage.expired(storedData.data, storageMaxMinutes, "minutes");

      if ( storedData.expired ) {
        Instagram.asyncGetToken(account).then((data) => {
          Instagram.asyncGetMedia(data.token).then((result) => {

            instance.items = result.data || [];

            storedData.data = JSON.stringify({
              account: account,
              date: Date.now(),
              items: instance.items
            });

            LocalStorage.setDataByKey(storedData.name, storedData.data);
            this.renderFeedFromInstance(instance);

          });
        });
      } else {

        const { items } = JSON.parse(storedData.data);
        instance.items = items;
        this.renderFeedFromInstance(instance);

      }

    });
  }

}
