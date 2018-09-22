import React, { Component } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'; 
import classNames from 'classnames';
import {CognitoUserPool,CognitoUserAttribute,} from "amazon-cognito-identity-js";
import appConfig from "../../config.js";

const userPool = new CognitoUserPool({
    UserPoolId: appConfig.UserPoolId,
    ClientId: appConfig.ClientId,
  });

const styles = theme => ({
  root: {
    padding: '20px',
    paddingTop: '20px',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textField: {
    flexBasis: 200,
    width: '300px',
  },
  button:{
    margin: theme.spacing.unit,
  }
});

class AddNewAdminForm extends Component {
state = {
    firstname: '',
    middlename: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    confirmpassword: '',
    showPassword: false,
    showConfirmPassword: false,
    showFormValidation:false,
    formErrorMessage:'',
    open: false,
}

componentDidMount(){
    ValidatorForm.addValidationRule('isPasswordMatch', (value) =>(
     value.length ==0 ? true :value !== this.state.password ? false : true
    ))

    ValidatorForm.addValidationRule('isPasswordLength7', (value)=>(
        value.length ==0 ? true : value.length>6 ? true:false
    ))
}

handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
}

handleConfirmPasswordChange=()=>{
    
}

handleMouseDownPassword = event => {
    event.preventDefault();
};

handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
};

handleClickShowConfirmPassword = () => {
    this.setState(state => ({ showConfirmPassword: !state.showConfirmPassword }));
};


handleSubmit=(e) =>{
    e.preventDefault();
    const email = this.state.email.trim();
    const password = this.state.password.trim();
    const name = this.state.firstname.trim();
    const family_name = this.state.lastname.trim();
    const middle_name = this.state.middlename.trim();
    const username = this.state.username.trim();
    
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'name',
        Value: name,
      }),
      new CognitoUserAttribute({
        Name: 'family_name',
        Value: family_name,
      }),
      new CognitoUserAttribute({
        Name: 'middle_name',
        Value: middle_name,
      }),
      new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      })
    ];
    
    userPool.signUp(username, password, attributeList, null, (err, result) => {
        let errorMessage;
      if (err) {          
        errorMessage = err.message.includes(':')?err.message.split(":")[1]:err.message;
        this.setState({formErrorMessage:errorMessage,showFormValidation:true}
        )
        return;
      }
      else{
        this.setState({formErrorMessage:'',showFormValidation:false, open: true},
            () => {
                !this.state.showFormValidation && this.props.closeBtnHandler()
                
            }
        )
        this.props.getEmail(this.state.email);
    }
      console.log('user name is ' + result.user.getUsername());
      console.log('call result: ' + JSON.stringify(result));         
    });
     
  }

closeHandler=() =>{
    this.props.closeBtnHandler();
}

  render() {
    const { classes } = this.props;
    return (      
    <div>
        <div >
            <AppBar position="static" color="default" >
                <Toolbar variant="dense">
                <Typography variant="title" color="inherit">
                    Add New Admin
                </Typography>
                <div className="add_admin_close">
                <a className="close" onClick={this.closeHandler}>
                        &times;
                    </a>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
        <div className={classes.root}>
        <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}>
            <TextValidator                  
                className={classNames(classes.margin, classes.textField)}
                label="First Name"
                id="margin-normal"                
                placeholder="First Name" type="text" name="firstname" value={this.state.firstname}
                onChange={this.handleChange('firstname')} 
                validators={['required']}
                errorMessages={['this field is required']}
                />
            <TextValidator
                className={classNames(classes.margin, classes.textField)}
                label="Middle Name"
                id="margin-normal"
                placeholder="Middle Name" type="text" name="middlename" value={this.state.middlename}                
                onChange={this.handleChange('middlename')} />
            <TextValidator
                className={classNames(classes.margin, classes.textField)}
                label="Last Name"
                id="margin-normal"
                placeholder="Last Name" type="text" name="lastname" value={this.state.lastname}
                onChange={this.handleChange('lastname')}
                validators={['required']}
                errorMessages={['this field is required']} />
            <TextValidator
                className={classNames(classes.margin, classes.textField)}
                label="Email"
                id="margin-normal"
                placeholder="Email" type="text" name="email" value={this.state.email}
                onChange={this.handleChange('email')}
                validators={['required','isEmail']}
                errorMessages={['this field is required', 'email is not valid']} />
            <TextValidator
                className={classNames(classes.margin, classes.textField)}
                label="User Name"
                id="margin-normal"
                placeholder="User Name" type="text" name="username" value={this.state.username}
                onChange={this.handleChange('username')}
                validators={['required']}
                errorMessages={['this field is required']} />
            <TextValidator
                className={classNames(classes.margin, classes.textField)}
                label="Password"
                id="margin-normal"
                placeholder="Password" name="password" value={this.state.password}
                type={this.state.showPassword ? 'text' : 'password'}
                onChange={this.handleChange('password')}
                validators={['required','isPasswordLength7']}
                errorMessages={['this field is required', 'password length should be greater than 6']}
                InputProps={{
                    endAdornment: <InputAdornment position="end">
                        <IconButton
                            aria-label="Toggle password visibility"
                            onClick={this.handleClickShowPassword}
                            onMouseDown={this.handleMouseDownPassword}>
                            {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>,
                }}/>
                <TextValidator
                    className={classNames(classes.margin, classes.textField)}
                    label="Confirm Password"
                    id="margin-normal"
                    placeholder="Confirm Password" name="confirmpassword" value={this.state.confirmpassword}
                    type={this.state.showConfirmPassword ? 'text' : 'password'}
                    onChange={this.handleChange('confirmpassword')}                    
                    validators={['required', 'isPasswordMatch']}
                    errorMessages={['this field is required', 'should match the password entered']}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <IconButton
                                aria-label="Toggle password visibility"
                                onClick={this.handleClickShowConfirmPassword}
                                onMouseDown={this.handleMouseDownPassword}>
                                {this.state.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>,
                }}/>     
                <Button
                className={classes.button}
                size="small"
                variant="contained"                                
                color="secondary"
                type="submit"
                >Save </Button>   
            {this.state.showFormValidation && <p style={{color:'red'}}>{this.state.formErrorMessage} </p>}                       
          </ValidatorForm>
        </div>                        
    </div>             
    );
  }
}

AddNewAdminForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddNewAdminForm);

