export default Instagram = {

  app: {
    endpoint: "https://daymarker-instagram-feed-basic-0643d6c1dbef.herokuapp.com"
  },

  asyncGetMedia: async (token = "") => {
    return await fetch( `https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink&access_token=${token}`, { method: 'GET' } )
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log('[ Instagram.asyncGetMedia() ] :: Error', error );
    });
  },

  asyncGetToken: async (account = "") => {
    return await fetch( `${Instagram.app.endpoint}/token?userAccount=${account}`, { method: 'GET' } )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .catch((error) => {
        console.log('[ Instagram.asyncGetToken() ] :: Error', error );
      });
  }

};
