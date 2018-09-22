import React, { Component } from 'react';
import AdminList from './AdminList'
import TablePaper from '../../components/UI/TablePaper/TablePaper';
import Modal from '../../components/UI/Modal/Modal';
import AddNewAdminForm from './AddNewAdminForm'
import AddButton from '../../components/UI/Buttons/AddButton';
import SnackBarForAdminVerification from './SnackBarForAdminVerification.js';

class Admin extends Component {
    state = {
        modal:false,
        openSnackBar:false,
        email:'',
    }

    addAdminBtnHandler = () => {
        this.setState({
            modal: true,
        })
    }

    closeBtnHandler = () => {
        this.setState({
            modal: false,
        })
    }
    
    handleClose = (event, reason) => {
        this.setState({ open: false });
    };

    getEmail = (email) => {
         this.setState({email, open:true});         
    }
    render() {
        return (
            <div>
            <TablePaper title = {'Administrators'}>
            <AddButton buttonName = {'Add Admin'} onClick={this.addAdminBtnHandler}/>
            <div><AdminList /></div>   
            {this.state.modal ? (<Modal show = {this.state.modal} modalClosed ={this.closeBtnHandler} >
            <div><AddNewAdminForm closeBtnHandler={this.closeBtnHandler}/></div></Modal> ):(null)}
            {this.state.email.length>0 && <SnackBarForAdminVerification handleClose={this.handleClose} open={this.state.openSnackBar}
            email={this.state.email}/>}
            </TablePaper>
          </div>
        )
    }
}

export default Admin;