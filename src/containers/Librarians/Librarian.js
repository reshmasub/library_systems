import React, { Component } from 'react';
import LibrarianList from './LibrarianList'
import TablePaper from '../../components/UI/TablePaper/TablePaper';
import AddButton from '../../components/UI/Buttons/AddButton';
import AddNewLibrarianForm from './AddNewLibrarianForm';
import Modal from '../../components/UI/Modal/Modal';
import SnackBarForLibrarianVerification from './SnackBarForLibrarianVerification';
 
class Librarian extends Component {
    state = {
        modal:false,
        openSnackBar:false,
        email:'',
    }

    addLibrarianBtnHandler = () => {
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
            <TablePaper title = {'Librarians'}>
            <AddButton buttonName = {'Add Librarian'} onClick={this.addLibrarianBtnHandler}/>
            <div><LibrarianList /></div>           
            {this.state.modal ? (<Modal show = {this.state.modal} modalClosed ={this.closeBtnHandler} >
            <div><AddNewLibrarianForm closeBtnHandler={this.closeBtnHandler}/></div></Modal> ):(null)}
            {this.state.email.length>0 && <SnackBarForLibrarianVerification handleClose={this.handleClose} open={this.state.openSnackBar}
            email={this.state.email}/>}
            </TablePaper>
          </div>
        )
    }
}

export default Librarian;
