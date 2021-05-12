let APIURL = ''
switch (window.location.hostname) {
  // localhost name of react app
  case 'localhost' || '127.0.0.1':
    // local hostname name of your API
    APIURL = 'http://localhost:3000'
    break
  // deployed react application
  case 'clt-takeofftravelapp.herokuapp.com':
    // deployed API/server
    APIURL = 'https://clt-takeoff.herokuapp.com'
}
export default APIURL
