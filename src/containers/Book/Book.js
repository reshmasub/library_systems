import React, { Component } from 'react';
import BookList from './BookList'
import TablePaper from '../../components/UI/TablePaper/TablePaper';
import Modal from '../../components/UI/Modal/Modal';
import AddNewBookForm from './AddNewBookForm';
import AddButton from '../../components/UI/Buttons/AddButton';

class Book extends Component {
    state = {
        modal:false,
    }
    addBookBtnHandler = () => {
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
                <TablePaper title = {'Book'}>
                <AddButton buttonName = {'Add Book'}  onClick={this.addBookBtnHandler}/>
                <div><BookList /></div>
                {this.state.modal ? (<Modal show={this.state.modal} closeBtnHandler={this.closeBtnHandler}>
                <div>
                <AddNewBookForm closeBtnHandler={this.closeBtnHandler}/>
                </div></Modal>):(null)}
                </TablePaper>
            </div>
          );

        }   
}


export default Book;
 