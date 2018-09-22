import React, { Component } from 'react';
import ReaderList from './ReaderList'
import TablePaper from '../../components/UI/TablePaper/TablePaper';
import Modal from '../../components/UI/Modal/Modal';
import AddNewReaderForm from './AddNewReaderForm'
import AddButton from '../../components/UI/Buttons/AddButton';

class Reader extends Component {
    state = {
        modal:false,
    }
    addReaderBtnHandler = () => {
        this.setState({
            modal:true,
        });
       
    }
    closeBtnHandler = () => {
        this.setState({
           modal:false,   
        })
    }
    render() {
        return (
            <div>
              <TablePaper title = {'Readers'}>
                <AddButton buttonName = {'Add Reader'} onClick={this.addReaderBtnHandler}/>
                <div><ReaderList /></div>
                {this.state.modal ? (<Modal show = {this.state.modal} modalClosed ={this.closeBtnHandler} >
                <div>
                    <AddNewReaderForm closeBtnHandler={this.closeBtnHandler}/>
                </div>
                </Modal> ):(null)}</TablePaper>
            </div>
          );
    }
}


export default Reader;