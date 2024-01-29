export default LocalStorage = {

  expired: (data = "", limit = 0, scale = "minutes") => {

    if ( !data ) {
      return true;
    }

    const dataJSON = JSON.parse(data) || {};
    const dataDate = dataJSON?.date || 0;
    const dateNow = Date.now();
    const timeDifference = {
      milliseconds: dateNow - dataDate,
      minutes: ((dateNow - dataDate) / 60000 ).toFixed(2)
    };

    switch (scale) {
      case "milliseconds": {
        if ( timeDifference.milliseconds > limit ) {
          return true;
        }
      }
      case "minutes": {
        if ( timeDifference.minutes > limit ) {
          return true;
        }
      }
    }

    return false;

  },

  getDataByKey: (key = "") => {
    return localStorage.getItem(key);
  },

  setDataByKey: (key = "", data = "") => {
    localStorage.setItem(key, data);
  }

};
