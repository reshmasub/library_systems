import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import * as AWS from 'aws-sdk';
import {CognitoUserPool,CognitoUserAttribute,} from "amazon-cognito-identity-js";
import appConfig from "../../config.js";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Modal from '../../components/UI/Modal/Modal';
import EditLibrarianForm from './EditLibrarianForm';

const userPool = new CognitoUserPool({
    UserPoolId: appConfig.LibPoolId,
    ClientId: appConfig.LibClientId,
  });

class LibrarianList extends Component{
    state={
        LibrarianList: [],
        modal: false,
        openDeleteConfirmation:false,
        row:{}, 
        openEditForm:false, 
        ExistingLibrarianInfo:[]      
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

    var cognitoidentity = new AWS.CognitoIdentity();
    
    var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

    var params = {
        
        "Filter": "",
        Limit: 59,
        UserPoolId: appConfig.LibPoolId,
    };
    let LibrarianList =[];
    cognitoidentityserviceprovider.listUsers(params, function(err, data) {
        if (err){console.log(err, err.stack)}  // an error occurred
        else 
        {                        
            for (var user in data.Users){                            
                var username = data.Users[user].Username;
                var library = data.Users[user].Attributes.length > 2? data.Users[user].Attributes[2].Value:'';                             
                var name = data.Users[user].Attributes.length > 3? data.Users[user].Attributes[3].Value:''; 
                var barcode = data.Users[user].Attributes.length > 4? data.Users[user].Attributes[4].Value:'';                           
                var family_name = data.Users[user].Attributes.length > 6 ?data.Users[user].Attributes[6].Value:'';
                var email=data.Users[user].Attributes.length > 7 ?data.Users[user].Attributes[7].Value:'';
                
                var LibrarianInfo={
                    name: name,
                    family_name: family_name,
                    email: email,
                    username:username,
                    library:library,
                    barcode:barcode,                                                        
                }                 
                LibrarianList.push(LibrarianInfo); 
                       
            }                      
            this.setState({LibrarianList:LibrarianList})             
        }
    }.bind(this));       
}

handleDeleteBtn =(row) =>{    
    this.setState({openDeleteConfirmation: true, row:row})       
}

handleEditBtn = (row) =>{
        
    var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
    var username = row.original.username;
    var params = {           
        "Filter": `username = \"${username}\"`,        
        Limit: 59,
        UserPoolId: appConfig.LibPoolId,
    };
        
    let LibrarianList =[];
    cognitoidentityserviceprovider.listUsers(params, function(err, data) {
        if (err){console.log(err, err.stack)}  // an error occurred
        else 
        {                      
            console.log("data order noooowww========"+JSON.stringify(data.Users[0]))     
            var username = data.Users[0].Username;            
            var library = data.Users[0].Attributes.length > 2? data.Users[0].Attributes[2].Value:'';  
            var name = data.Users[0].Attributes.length > 3? data.Users[0].Attributes[3].Value:''; 
            var barcode = data.Users[0].Attributes.length > 4? data.Users[0].Attributes[4].Value:''; 
            var middle_name = data.Users[0].Attributes.length > 5? data.Users[0].Attributes[5].Value:''; 
            var family_name = data.Users[0].Attributes.length > 6 ?data.Users[0].Attributes[6].Value:'';
            var email=data.Users[0].Attributes.length > 7 ?data.Users[0].Attributes[7].Value:'';

            var ExistingLibrarianInfo={
                        name: name,
                        middle_name: middle_name,
                        family_name: family_name,
                        email: email,
                        username:username,
                        library:library,
                        barcode:barcode,                                                        
                    }  
                    
                    this.setState({openEditForm:true, ExistingLibrarianInfo:ExistingLibrarianInfo})
                    
        }
    }.bind(this));  
}

handleEditFormClose =() =>{
    this.setState({openEditForm:false})
}

handleCancel=()=>{
    this.setState({openDeleteConfirmation: false})
}
handleOk=()=>{         
let username= this.state.row.original.username;
    let params = {
        UserPoolId: appConfig.LibPoolId,
        Username: username
      };
      let cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
      cognitoidentityserviceprovider.adminDeleteUser(params, function(err, data) {
        if (err){           
             alert(err, err.stack); }
        else {                            
            const deletedLibrarianList = this.state.LibrarianList.filter((librarian) => librarian.username !== username);            
            this.setState({LibrarianList:deletedLibrarianList, openDeleteConfirmation: false})
             };    
      }.bind(this));                           
}

handleRefresh=()=>{
    
    this.forceUpdate();
}
    
    render(){
        const data = this.state.LibrarianList;

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
                
                {Header: 'Library ',
                accessor: 'library'},  

                {Header: 'Barcode ',
                accessor: 'barcode'},
                
                {
                    header: '',
                    id: 'click-me-button',
                    Cell: row => (
                    <div>
                        <DeleteIcon onClick={() => this.handleDeleteBtn(row)}/> 
                    </div>
                )
                  },
                  {
                    header: '',
                    id: 'click-me-button',
                    Cell: row => (
                    <div>
                        <EditIcon onClick={() => this.handleEditBtn(row)}/> 
                    </div>
                )
                  }
            ]} className="-striped -highlight"
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
            <Modal show = {this.state.openEditForm} 
            modalClosed ={this.handleEditFormClose}>
            {this.state.openEditForm && 
            <EditLibrarianForm librarianInfo={this.state.ExistingLibrarianInfo} 
            handleEditFormClose={this.handleEditFormClose}
            handleRefresh={this.handleRefresh}/>}
            </Modal>          
            </div>
        )
         
    }
}

export default LibrarianList;
