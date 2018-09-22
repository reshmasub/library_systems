import React from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {CognitoUserPool,CognitoUserAttribute,} from "amazon-cognito-identity-js";
import appConfig from "../../config.js";
import { Auth } from "aws-amplify";

const userPool = new CognitoUserPool({
    UserPoolId: appConfig.UserPoolId,
    ClientId: appConfig.ClientId,
  });


const styles = theme => ({
    root: {
      padding: '20px',
      paddingTop: '20px',
      backgroundColor: "#E7E5E6",
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
      display: "block",
    //   margin: "0 auto",
      marginTop: "15px",
    },
    button:{
    //   margin: theme.spacing.unit,
      display: "block",
    //   margin: "0 auto",
      marginTop: "20px",
    }
  });

class Profile extends React.Component {
    constructor(props) {
        super(props);
        console.log(sessionStorage.getItem("cognitoUser"));
        console.log(sessionStorage.getItem("data"));
        let firstname = undefined;
        let lastname = undefined;
        let email = undefined;
        let username = undefined;
        if(sessionStorage.getItem("name"))
            firstname = sessionStorage.getItem("name").replace(/['"]+/g, '');
        if(sessionStorage.getItem("family_name"))
            lastname = sessionStorage.getItem("family_name").replace(/['"]+/g, '');
        if(sessionStorage.getItem("email"))
            email = sessionStorage.getItem("email").replace(/['"]+/g, '');
        if(sessionStorage.getItem("username"))
            username = sessionStorage.getItem("username").replace(/['"]+/g, '');

        this.state={
            firstname:firstname,
            lastname: lastname,
            email:email,
            username,
            btnInfo: "Edit Details",
            textDisable: true,
            confirmation: false,
            email_change: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    }

    handleSubmit = async e => {
        e.preventDefault();
        if(this.state.btnInfo === "Edit Details") {
            this.setState({
                btnInfo: "Submit Changes",
                textDisable: false
            });
        }
        else {
            console.log("Handle the change submission...");

            const username = this.state.username.trim();
            const email = this.state.email.trim();    
            const name = this.state.firstname.trim();
            const family_name = this.state.lastname.trim();        
            
            
            // const attributeList = [
            // new CognitoUserAttribute({
            //     Name: 'username',
            //     Value: username,
            // }),
            // new CognitoUserAttribute({
            //     Name: 'name',
            //     Value: name,
            // }),
            // new CognitoUserAttribute({
            //     Name: 'family_name',
            //     Value: family_name,
            // }),    
            // new CognitoUserAttribute({
            //     Name: 'email',
            //     Value: email,
            // })
            // ];

            // userPool.updateAttributes(attributeList, function(err, result) {
            //     if (err) {
            //         alert(err);
            //         return;
            //     }
            //     console.log('call result: ' + result);
            // });
            
            let user = await Auth.currentAuthenticatedUser();
            
            
            let last_email = sessionStorage.getItem("email").replace(/['"]+/g, '');
            let email_change = false;

            if(last_email != email) {
                email_change=true;
            }
            let result = await Auth.updateUserAttributes(user, {
                'name': name,
                'email': email,
                'family_name': family_name
            });
            console.log(result)

            if(email_change) {
            this.setState({
                btnInfo: "Edit Details",
                textDisable: true,
                confirmation: true,
                email_change: true
            });
        } else if(sessionStorage.getItem("name").replace(/['"]+/g, '')!=name || sessionStorage.getItem("family_name").replace(/['"]+/g, '')!=family_name) {
            this.setState({
                btnInfo: "Edit Details",
                textDisable: true,
                confirmation: true
            });
        }
        else {
            this.setState({
                btnInfo: "Edit Details",
                textDisable: true
            });
        }
        }
        
    }

    handleChangeEmail = async e => {
        e.preventDefault();
        let email = this.state.email;
        let code = e.target.emailChange.value;
        this.setState({
            email_change: false
        });
        try {
        let result = await Auth.verifyCurrentUserAttributeSubmit(email, code);
        console.log(result.message);
        }
        catch(e) {
            console.log(e.message);
        }
    }


    render() {
        const { classes } = this.props;

        return(
            <div>
                 <div>
               
               <div >
                   <AppBar position="static" color="default" >
                       <Toolbar variant="dense">
                       <Typography variant="title" color="inherit">
                           Profile Information:
                       </Typography>
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
                       disabled={this.state.textDisable}
                       />
                   <TextValidator
                       className={classNames(classes.margin, classes.textField)}
                       label="Last Name"
                       id="margin-normal"
                       placeholder="Last Name" type="text" name="lastname" value={this.state.lastname}
                       onChange={this.handleChange('lastname')}
                       validators={['required']}
                       errorMessages={['this field is required']}
                       disabled={this.state.textDisable} />
                   <TextValidator
                       className={classNames(classes.margin, classes.textField)}
                       label="Email"
                       id="margin-normal"
                       placeholder="Email" type="text" name="email" value={this.state.email}
                       onChange={this.handleChange('email')}
                       validators={['required','isEmail']}
                       errorMessages={['this field is required', 'email is not valid']}
                       disabled={this.state.textDisable} />
                   <TextValidator
                       className={classNames(classes.margin, classes.textField)}
                       label="User Name"
                       id="margin-normal"
                       placeholder="User Name" type="text" name="username" value={this.state.username}
                       onChange={this.handleChange('username')}
                       validators={['required']}
                       errorMessages={['this field is required']}
                       disabled />
                   {/* <TextValidator
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
                       }}/> */}  
                       <Button
                       className={classes.button}
                       size="small"
                       variant="contained"                                
                       color="secondary"
                       type="submit"
                       >{this.state.btnInfo} </Button>   
                   {this.state.showFormValidation && <p style={{color:'red'}}>{this.state.formErrorMessage} </p>}                       
                 </ValidatorForm>
               </div>
               {
                   this.state.email_change &&
                   <div>
                       <p style={{backgroundColor:"red", color: "white", textAlign:"center"}}>The email change has been requested, please enter the code sent to new email address.</p>
                       <form onSubmit={this.handleChangeEmail}>
                           <input type="text" placeholder="Enter the code here..." name="emailChange" />
                           <button type="submit" style={{display:"block"}}>Email Change</button>
                       </form>
                    </div>
               } 
               {
                   this.state.confirmation &&
                   <div>
                       <p style={{backgroundColor:"red", color: "white", textAlign:"center"}}>The changes have been saved, please sign out and sign in again to reflect the changes.</p>
                       <button onClick={() => {
                           this.setState({
                            confirmation: false
                           })
                       }}>Close</button>
                    </div>
               }                        
           </div>       
            </div>
        )
    }
}

export default withStyles(styles)(Profile);
