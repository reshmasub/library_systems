import React, { Component } from "react";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Auth } from "aws-amplify";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import backgroundImage from '../../assets/images/background.jpg';

const styles = theme =>({
  button: {
    margin: '0,4px',
    width:'100%',
    color:'white',
    backgroundColor: 'black'
  },
  formControl: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  textField: {
    flexBasis: 200,
    width: 300,
    marginBottom : '5px'
  },
  background:{
    backgroundImage : "url("+backgroundImage+")",
  },
});
  
class Login extends Component {
  constructor(props) {
  super(props);
  this.state = {
      username: "",
      password: "",
      showFormValidation:false,
      formErrorMessage:''
  };
    this.handlePassword = this.handlePassword.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleUsername = event => {
    this.setState({
      username : event.target.value
    });
  }

  handlePassword = event => {
    this.setState({
        password : event.target.value
      });
  }

  handleSubmit = async event => {
    event.preventDefault();
    try {
      const data = await Auth.signIn(this.state.username, this.state.password);
      sessionStorage.setItem("data", JSON.stringify(data));
      sessionStorage.setItem("cognitoUser", JSON.stringify(data.signInUserSession.idToken.jwtToken));
      sessionStorage.setItem("username", JSON.stringify(data.username));
      sessionStorage.setItem("name", JSON.stringify(data.signInUserSession.idToken.payload.name));
      sessionStorage.setItem("family_name", JSON.stringify(data.signInUserSession.idToken.payload.family_name));
      sessionStorage.setItem("email", JSON.stringify(data.signInUserSession.idToken.payload.email));
      Auth.currentCredentials(credentials => {
        const tokens = Auth.essentialCredentials(credentials);
        console.log(tokens);      
        
      });
      console.log(this.props);
      this.props.loginHandle();

    } catch (e) {
      console.log(e.code);
      if (e.code ==="NotAuthorizedException"||e.code ==="UserNotFoundException"||e.code ==="InvalidParameterException")
      {
        this.setState({showFormValidation:true});
        this.state.formErrorMessage='Incorrect username or password'
      }
      
    }

  }
  render() {
    const { classes } = this.props;
    return (
    <div>
    <div className = {classes.background}
    style ={{position:'fixed',top:'0px',bottom:'0px',
    left:'0px',right:'0px'}}>
    <div style ={{display :'flex',
                    'min-height':'100vh',
                    'align-items':'center',
                    'flex-direction':'column',
                    'justify-content':'flex-start',
                    backgroundSize:'cover',
                    backgroundRepeat:'no-repeat',  
                    backgroundColor: 'rgba(0,0,0,0.75)' }}>
    <div style ={{minWidth:'300px',marginTop:'9em',overflow:'hidden',  
                    boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.3)',borderRadius:'5px',
                    backgroundColor:'white'}}>
    <div style = {{margin:'1em',display:'flex',justifyContent:'center'}}>
    </div>
    <form style = {{marginTop:'0em',display:'block'}}
                    onSubmit={this.handleSubmit}>
    <div  style = {{color:'black',display:'flex',marginTop:'1em',justifyContent:'center'}}>
    FAVL Libraries
    </div>
    <div  style ={{padding:'0 1em 1em 1em'}}>
    <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}>
    <div  style ={{marginTop:'1em',display:'block'}}>
    <TextValidator
          className={classes.textField}
          label="Username"
          //id="margin-normal"
          placeholder="Username" type="text" name="username" 
          onChange={this.handleUsername}
          validators={['required']}
          errorMessages={['required']} 
          value={this.state.username}
          /></div>
      <div  style ={{marginTop:'1em',display:'block'}}>
      <TextValidator
          className={classes.textField}
          label="Password"
          type = "password"
          //id="password-input"
          placeholder="Password" name="password" 
          onChange={this.handlePassword}
          validators={['required']}
          errorMessages={['required']} 
          value={this.state.password}/></div>
       <div style = {{display:'flex',justifyContent:'center',marginBottom :'5px'}}>
       {this.state.showFormValidation && <p style={{color:'red'}}>{this.state.formErrorMessage} </p>}</div>
       <div style = {{display:'flex',justifyContent:'center',fontSize : '80%',marginBottom :'10px'}}>
                <Link to="/change_password">Forgot Password?</Link></div>
      <div style ={{padding:'0 1em 1em 1em',display:'flex',boxSizing:'border-box',alignItems:'center'}}>
      <Button variant="contained" 
         className={classes.button} 
         color = "black"
         type="submit">Sign In</Button></div>                       
      </ValidatorForm>
    </div>
    </form>
    </div>
    </div>
    
    </div>
    </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);

{/* <div style = {{backgroundColor:'black',color:'#fafafa',
                    width:'40px',height:'40px',display:'flex',position:'relative',
                    overflow:'hidden',fontSize:'1.25rem',flexShrink:0,alignItems:'center',
                    userSelect:'none',borderRadius:'50%',justifyContent:'center'}}>
      </div> 
    
    
     <FormGroup bsSize="large"> 
    <ControlLabel>Username</ControlLabel>
    <FormControl autoFocus type="text" ref={this.state.username} defaultValue="" name="username" onChange={this.handleUsername}/>
    </FormGroup></div>
    <div  style ={{marginTop:'1em',display:'block'}}>
    <FormGroup bsSize="large">  
    <ControlLabel>Password</ControlLabel><FormControl ref={this.state.password} defaultValue="" onChange={this.handlePassword}
    type="password" name="password_details"/></FormGroup></div>
    </div>
    <div style ={{padding:'0 1em 1em 1em',display:'flex',boxSizing:'border-box',alignItems:'center'}}>
    <Button variant="contained" color="primary" className={classes.button} disabled={!this.validateForm()}
    type="submit">Sign In</Button></div>
    
    <Link to="/change_password">Forgot Password?</Link></div>*/}