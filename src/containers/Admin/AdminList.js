import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import * as AWS from 'aws-sdk';
import DeleteIcon from '@material-ui/icons/Delete';
import appConfig from "../../config.js";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

class AdminList extends Component{
   
    state={
        adminList: [],
        openDeleteConfirmation:false,
        row:{},

    }

    componentDidMount(){
        let token = sessionStorage.getItem("cognitoUser");    
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-east-2:81073ee5-eca0-499a-a0ea-8edab1debd6b',
            Logins: {
                'cognito-idp.us-east-2.amazonaws.com/us-east-2_SF2DCPO5Y': token.slice(1,token.length-1)
            }
        });
	
	AWS.config.region = 'us-east-2';
	
	AWS.config.credentials.refresh((error) => {
        if (error) {
            console.error("",error);
        } else {
            console.log('Successfully logged!');
        }
        });
	
	var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

	var params = {
		UserPoolId: appConfig.UserPoolId,
		AttributesToGet: [
        'email',   
        'name',     
        'family_name',        
		],
		Limit: 60,
    };

    let adminList =[];
	cognitoidentityserviceprovider.listUsers(params, function(err, data) {
		if (err){console.log(err, err.stack)}  // an error occurred
		else 
		{            
            data.Users.filter((user) => {
                if(user.UserStatus !== 'UNCONFIRMED'){                    
                    var username = user.Username;
                var name = user.Attributes.length > 0? user.Attributes[0].Value:'';                             
                var family_name = user.Attributes.length > 1 ?user.Attributes[1].Value:'';
                var email=user.Attributes.length > 2 ?user.Attributes[2].Value:'';
                
                var adminInfo={
                    name: name,
                    family_name: family_name,
                    email: email,  
                    username:username,                                  
                }   
                adminList.push(adminInfo);     
                }
            })            
			// for (var user in data.Users){                
            //     var username = data.Users[user].Username;
            //     var name = data.Users[user].Attributes.length > 0? data.Users[user].Attributes[0].Value:'';                             
            //     var family_name = data.Users[user].Attributes.length > 1 ?data.Users[user].Attributes[1].Value:'';
            //     var email=data.Users[user].Attributes.length > 2 ?data.Users[user].Attributes[2].Value:'';
                
            //     var adminInfo={
            //         name: name,
            //         family_name: family_name,
            //         email: email,  
            //         username:username,                                  
            //     }   
            //     adminList.push(adminInfo);         
            // }                      
            this.setState({adminList:adminList})             
		}
    }.bind(this));       
}

handleDeleteBtn =(row) =>{    
    this.setState({openDeleteConfirmation: true, row:row})       
}

handleCancel=()=>{
    this.setState({openDeleteConfirmation: false})
}
handleOk=()=>{     
let username= this.state.row.original.username;
    let params = {
        UserPoolId: appConfig.UserPoolId,
        Username: username
      };
      let cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
      cognitoidentityserviceprovider.adminDeleteUser(params, function(err, data) {
        if (err){        	
        	 alert(err, err.stack); }
        else {                            
            const deletedAdminList = this.state.adminList.filter((admin) => admin.username !== username);            
            this.setState({adminList:deletedAdminList, openDeleteConfirmation: false})
             };    
      }.bind(this));                           
}
    
    render(){
        const data = this.state.adminList;

        return(
        
            <div style={{width:'90%',margin:'70px auto'}}>
            {data && 
            <ReactTable 
            data={data}
            columns={[
                {Header: 'First Name',
                accessor: 'name'}, //accessor should mathc the object property name

                {Header: 'Last Name',
                accessor: 'family_name'},

                {Header: 'Email ',
                accessor: 'email'},  
                {Header: 'Username ',
                accessor: 'username'},                  
                {
                    header: '',
                    id: 'click-me-button',
                    Cell: row => (
                    <div>
                        <DeleteIcon onClick={() => this.handleDeleteBtn(row)}/> 
                    </div>
                )
                  }
            ]}                
             className="-striped -highlight"
            showPagination={true}
            defaultPageSize={10}
            minRows={5}/>}               
        
            <Dialog
            disableBackdropClick
            open={this.state.openDeleteConfirmation}
            // onClose={this.handleClose}
            aria-labelledby="confirmation-dialog-title"            
            >
            <DialogTitle id="confirmation-dialog-title">Delete Confirmation</DialogTitle>
            <DialogContent>
                Are you sure you want to delete the user
            </DialogContent>
            <DialogActions>
            <Button onClick={this.handleCancel} color="primary">
                Cancel
            </Button>
            <Button onClick={this.handleOk} color="primary">
                Ok
            </Button>
            </DialogActions>
            </Dialog>
            </div>
        )
         
    }
}

export default AdminList;