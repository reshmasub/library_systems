import React from 'react';
import './Signout.css';
import {Link} from 'react-router-dom';
import history from '../../history';
import {Route, Switch} from 'react-router-dom';
import  Login from '../../containers/LoginDetails/login';

export default class Signout extends React.Component {
    constructor(props) {
        super(props);
        sessionStorage.removeItem("auth");
        sessionStorage.removeItem("data");
        sessionStorage.removeItem("cognitoUser");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("family_name");
        sessionStorage.removeItem("email");
       /*  history.push('/'); */
        
    }

    render() {
        return (
            <div className="signout">
                {history.push('/')}
                <h3>Signout successful</h3>
                <Link style={{color: 'white'}} to= "/">Click to Sign In</Link>
            </div>
        )
    }
}
