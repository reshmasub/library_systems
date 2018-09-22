import React, { Component,history} from 'react';
import {BrowserRouter} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import Home from './containers/Home/Home';
import Books from './containers/Book/Book';
import Admin from './containers/Admin/Admin';
import Library from './containers/Libraries/Library';
import Readers from './containers/Readers/Reader';
import Librarian from './containers/Librarians/Librarian';
import FullWidthTabs from './containers/Graph/graph';
import Login from './containers/LoginDetails/login';
import Changepassword from './containers/LoginDetails/change_password';
import Signout from './containers/Authentication/Signout';
import Profile from './containers/Authentication/Profile';
import {browserHistory} from 'react-router';

let loggedIn = false;

class App extends Component {
    constructor(props) {
      super(props);
      this.loginHandle = this.loginHandle.bind(this);
    }

componentDidMount = () => {
  console.log("Component did mount logged in - "+loggedIn);
}

state = {
  alwaysTrue: true
}

loginHandle = () => {
  localStorage.setItem("auth",true);
  localStorage.removeItem("justOnce")
  sessionStorage.setItem("auth",true);
  loggedIn = true;
  this.setState({
    alwaysTrue: true
  });
}

logoutHandle(props){
  localStorage.removeItem("auth");
  sessionStorage.removeItem("cognitoUser");
  if (!localStorage.justOnce) {
    localStorage.setItem("justOnce", "true");
    window.location.reload();
  }
  return(<Layout isLoggedIn = {localStorage.getItem("auth")}>
  <Login {...props} loginHandle={this.loginHandle} />
  <Redirect to="/" />
  </Layout>);
}
render() {
    return (
      <BrowserRouter>
          <Switch>
          <Layout isLoggedIn = {localStorage.getItem("auth")}>
          <Route exact path='/login' render={() => (<Login/>)} />

          <Route exact path='/change_password' render={() => (<Changepassword />)} />
          
          <Route exact path='/' render={(props) => 
           (this.state.alwaysTrue&&localStorage.getItem("auth") ? <Home/> :
           <Login {...props} loginHandle={this.loginHandle}/>)}/>

          <Route exact path='/books'  render={(props) => 
           (this.state.alwaysTrue&&localStorage.getItem("auth") ? <Books/> :
           <Login {...props} loginHandle={this.loginHandle}/>)}/>

          <Route path ="/libraries" render={(props) => 
           (this.state.alwaysTrue&&localStorage.getItem("auth") ? <Library/> :
           <Login {...props} loginHandle={this.loginHandle}/>)}/>

          <Route exact path='/readers' render={(props) => 
           (this.state.alwaysTrue&&localStorage.getItem("auth") ? <Readers/> :
           <Login {...props} loginHandle={this.loginHandle}/>)}/>

          <Route exact path='/librarians' render={(props) => 
           (this.state.alwaysTrue&&localStorage.getItem("auth") ? <Librarian/> :
           <Login {...props} loginHandle={this.loginHandle}/>)}/>

          <Route exact path='/admin' render={(props) => 
           (this.state.alwaysTrue&&localStorage.getItem("auth") ? <Admin/> :
           <Login {...props} loginHandle={this.loginHandle}/>)}/>

          <Route exact path='/statistics' render={(props) => 
           (this.state.alwaysTrue&&localStorage.getItem("auth") ? <FullWidthTabs/> :
           <Login {...props} loginHandle={this.loginHandle}/>)}/>

          <Route exact path='/profile' render={(props) => 
            (this.state.alwaysTrue&&localStorage.getItem("auth") ? <Profile/> : 
            <Login {...props} loginHandle={this.loginHandle}/>)}/>

          <Route exact path='/login' render={(props) =>  
           this.logoutHandle()}/> 
          </Layout>
          
        </Switch>
      </BrowserRouter>
    );
  }
}

export default withRouter(App);
