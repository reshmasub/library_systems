import axios from 'axios';


//create an axios instance for this baseURL
const instance = axios.create({
    baseURL:'https://coen296b-scan.firebaseio.com/'
});

export default instance;