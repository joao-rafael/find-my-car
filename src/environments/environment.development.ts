const GMAPS_API_KEY: string = 'AIzaSyCBpZX0Kqgcv790CtEr_pmAQ2qRP4ZAiAY';

export const environment = {
    production: false,
    mapsApi: `https://maps.googleapis.com/maps/api/js?key=${GMAPS_API_KEY}&callback=console.debug&libraries=maps,marker&v=beta`,
    mobi7Api: 'https://challenge-backend.mobi7.io'// real api
};
