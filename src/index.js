import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Router,Route } from 'react-router-dom';
import Amplify from "aws-amplify";
import config from "./config";
import history from './history';
import Login from './containers/LoginDetails/login';

Amplify.configure({
    Auth: {
      mandatorySignIn: true,
      region: config.cognito.REGION,
      userPoolId: config.cognito.USER_POOL_ID,
      identityPoolId: config.cognito.IDENTITY_POOL_ID,
      userPoolWebClientId: config.cognito.APP_CLIENT_ID
    }
  });
ReactDOM.render(
    <Router history={history}>
        <div>
        <App  style={{height :'Auto'}}/>
        </div>
    </Router>
, document.getElementById('root'));
registerServiceWorker();

