import React from "react";
import { Link, Redirect } from 'react-router-dom';
//import LoginHeader from './login_header';
import { Auth } from "aws-amplify";
import history from '../../history';
import './login.css';


export default class Changepassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            resetPassword: true,
            emailSubmit : false,
            email: undefined,
            successful: false,
            unsuccessful: false,
            forgotpassData: false
        }
        this.submitHandle = this.submitHandle.bind(this);
        this.codeHandle = this.codeHandle.bind(this);
    }

    
    render() {
        return(
            <div>
                {/* <LoginHeader /> */}
                <div style ={{display:'block'}}>
                    <div style ={{display :'flex',
                                    'min-height':'100vh',
                                    'align-items':'center',
                                    'flex-direction':'column',
                                    'justify-content':'flex-start',
                                    background:'background :linear-gradient(to right,#52688c,#516b86,#588688)',
                                    backgroundSize:'cover',
                                    backgroundRepeat:'no-repeat'   }}>
                    <div style ={{minWidth:'300px',marginTop:'6em',overflow:'hidden',  
                                    boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.3)',borderRadius:'5px',
                                    backgroundColor:'white'}}>
                    <div style = {{margin:'1em',display:'flex',justifyContent:'center'}}>
                    </div>
                    <form style = {{marginTop:'0em',display:'block'}}
                                    onSubmit={this.handleSubmit}>
                    <div  style = {{color:'#000',display:'flex',marginTop:'1em',justifyContent:'center'}}>
                    FAVL Libraries
                    </div>
                    <div class="main" style={{textAlign:'center'}}>
                                    <h1 style={{margin:"20px"}}>SCAN Reset password:</h1>
                                    {
                                        this.state.resetPassword &&
                                    <form onSubmit={this.submitHandle}>
                                        <div className="form-group">
                                            <label htmlFor="emailaddress" style={{display:"block"}}>Please enter your USERNAME!</label>
                                            <input type="text" className="form-control" id="emailaddress" placeholder="Enter Username..." style={{width:"200px"}} />
                                        </div>
                                        <button type="submit" className="btn btn-primary" style={{margin:"20px"}}>Submit</button>
                                    </form>
                                    }
                                    {
                                        this.state.emailSubmit && 
                                        <div>
                                            <form onSubmit={this.codeHandle}>
                                                <div className="form-group">
                                                    <p style={{color:"white", "fontWeight":"bold", "textDecoration":"underline"}}>An email with reset code has been sent to your email address, Please enter the code below:</p>
                                                    <input type="text" placeholder="Enter the code.." id="code" style={{display:"block", margin:"0 auto",height:"25px"}} />
                                                    <input type="text" placeholder="Enter the new Password.." id="newPasswd" style={{display:"block",margin:"0 auto",height:"25px"}} />
                                                </div>
                                                <button type="submit" className="btn btn-light" style={{margin:"20px"}}>Submit</button>
                                            </form>
                                        
                                        </div>
                                    }
                                    {
                                        this.state.successful && 
                                        <div className="confirmText">
                                            <p style={{color:"#07889B", "fontWeight":"bold", "textDecoration":"underline"}}>Thank you, your password has been changed successfully!!</p>
                                            <Link to="/" style={{color: "#7E685A", "fontWeight":"bold", "textDecoration":"underline"}}>Click here to Login</Link>
                                        </div>
                                    }
                                    {
                                        this.state.unsuccessful &&
                                        <div className="confirmText">
                                            <p style={{color:"#07889B", "fontWeight":"bold", "textDecoration":"underline"}}>Sorry, There is some incorrect information while changing password, try again!</p>
                                            <Link to="/" style={{color: "#7E685A", "fontWeight":"bold", "textDecoration":"underline" }}>Click here to Login</Link>
                                        </div>
                                    } 
                                    </div>
                            </form>

                                
                            </div>
                        </div>
                </div>
            </div>
                        
        );
    }

    submitHandle = (e) => {
        e.preventDefault();
        console.log("email has been entered");
        console.log(e.target.emailaddress.value);
        const email = e.target.emailaddress.value;
        Auth.forgotPassword(email)
        .then(data => console.log(data))
        .catch(err => {
            console.log("Error Message");
            alert(err.message);
            history.push('/');
        });
        this.setState({ 
            resetPassword: false,
            emailSubmit: true,
            email: email
        });
    }

    codeHandle = (e) => {
        e.preventDefault();
        console.log("button bressed");
        const username = this.state.email;
        const code = e.target.code.value;
        const newpass = e.target.newPasswd.value;
        Auth.forgotPasswordSubmit(username, code, newpass)
        .then(data => {
            console.log(data);
            this.setState({
                resetPassword: false,
                emailSubmit: false,
                successful: true
            });
        })
        .catch(err => {
            console.log("Error Message");
            alert(err.message);
            this.setState({
                        resetPassword: false,
                        emailSubmit: false,
                        unsuccessful: true
                    });
            history.push('/');
        }); 
    }

            
}