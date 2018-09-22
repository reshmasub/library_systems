import React, { Component } from 'react';
import LibraryList from './LibraryList'
import TablePaper from '../../components/UI/TablePaper/TablePaper';
import Modal from '../../components/UI/Modal/Modal';
import AddNewLibraryForm from './AddNewLibraryForm'
import AddButton from '../../components/UI/Buttons/AddButton';
import Form from '../../components/Form/Form'; 

class Library extends Component {
    state = {
        open:false,
    }
    handleClickOpen = () => {
        this.setState({ open: true });
      };
      
    handleClose = () => {
        this.setState({ open: false });
      };

    render() {
        return (
            <div>
              <TablePaper title = {'Libraries'}>
                <AddButton buttonName = {'Add Library'} onClick={this.handleClickOpen}/>
                <div><LibraryList /></div>
                {this.state.open ?
                <Form open={this.state.open} onClose= {this.handleClose}
                      formTitle={'Library'}>
                    <AddNewLibraryForm closeBtnHandler={this.handleClose}/>
                </Form> : null}
              {/*   {this.state.modal ? (<Modal show = {this.state.modal} modalClosed ={this.closeBtnHandler} >
                <div>
                    <AddNewLibraryForm closeBtnHandler={this.closeBtnHandler}/>
                </div>
                </Modal> ):(null)} */}</TablePaper>
            </div>
          );

        }   
}

export default Library;
