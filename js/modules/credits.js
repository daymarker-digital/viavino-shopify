const info = { company : 'Viavino', tagline : '"The new way of (anti-table) wine."',  version : '1.0' };

const init = () => {
  console.log( `${info.company} - ${info.tagline} - Version ${info.version}` );
  console.log( 'Site by Very Polite Agency – https://weareverypolite.com/' );
};

export default { init }
