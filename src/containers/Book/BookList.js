import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import axios from 'axios';
import '../../components/Table/BookList.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Modal from '../../components/UI/Modal/Modal';
import EditBookForm from './EditBookForm';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
const styles = theme => ({
    button: {
      margin: 0,    
    },
    input: {
      display: 'none',
    },
  });

class BookList extends Component{
    constructor(){
        super();
        this.state={
            data: [],
            modal: false,
            datarow :{}
        }
        this.makeData = this.makeData.bind(this);
    }

    makeData = (state,instance) =>{        
        axios.get('https://p0kvnd5htd.execute-api.us-east-2.amazonaws.com/test/book',{
            mode: 'no-cors',
            method: 'GET',
       })
       .then((response)=> {
               console.log(response);
               this.setState({data:response.data});
       })
    }

    editBookBtnHandler = (property,info) => {
        console.log(JSON.stringify(info)+"-------"+property);
        let rowInfo = info.find((element)=>element.BookBarcode == property);
        console.log(JSON.stringify(rowInfo)+"===HHHHH+++++++") 
        this.setState({
            modal: true,
            datarow: rowInfo,
        });
       console.log(property,"====>Mounika sss");
        }
       closeBtnHandler = () => {
        this.setState({
            modal:false,
        })
    }

    deleteBookHandler = (property,info) => {
        confirmAlert({
              title: 'Book Delete',
              message: 'Are you sure to delete?',
              buttons: [
                {
                  label: 'Confirm',
                  onClick: () => this.bookDelete(property),
                },
                {
                  label: 'Cancel',
                  onClick: () => this.closeBtnHandler(),
                }
              ]
            })
    }

    bookDelete=(property)=>
    {
        axios.delete('https://p0kvnd5htd.execute-api.us-east-2.amazonaws.com/test/book/'+property,{
        mode: 'no-cors',method: 'DELETE',}).
        then(res => {
                    console.log(res);
                    console.log(res.data);
                  }).catch(e=>{
                      console.log(e);
                  })
    }
    render(){
        const { classes } = this.props;
        const Table = (<div style={{width:'95%',margin:'70px auto'}}>
        <ReactTable
                data={this.state.data}
                columns={[
                        {Header: 'Title',
                        accessor: 'Title',
                        className:'Title'},
            
                        {Header: 'FirstName',
                        accessor: 'FirstName'},
            
                        {Header: 'Last Name',
                        accessor: 'LastName'},
            
                        {Header: 'Library ',
                        accessor: 'LibraryName'},
            
                        {Header: 'Barcode ',
                        accessor: 'BookBarcode'},    
                    {
                        Header: 'Options',
                        accessor: 'BarCode',
                        width: 200,
                        style: {
                          cursor: 'pointer',
                          /* fontSize: 15, 
                          padding: "10", */
                          textAlign: "center"
                        },
                         Cell: props => <div><EditIcon onClick={()=>this.editBookBtnHandler(props.value,this.state.data)} 
                         color="default" className={classes.button}/>
                         <DeleteIcon color="default"  onClick={()=>this.deleteBookHandler(props.value,this.state.data)} 
                         className={classes.button}/></div>
                    },
                ]}
                className="-striped -highlight"
                showPagination={true}
                defaultPageSize={10}
                minRows={5}
                onFetchData={this.makeData}
                />
        </div>);
        return(
        <div>
            {Table}
            {this.state.modal ? 
            (<Modal show = {this.state.modal} modalClosed ={this.closeBtnHandler}>
            <div>
            <EditBookForm closeBtnHandler={this.closeBtnHandler} rowId={this.state.datarow}/>
            </div>
            </Modal>):null}
        </div>
    )    
}
}

BookList.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withStyles(styles)(BookList);

{/* <div className='admin-table-container'>
        <div className='admin-table'>
        {this.editBookBtnHandler} {
            this.state.splitPane ? 
            
        (<EditBook closeBtnHandler={this.closeBtnHandler} rowId={this.state.datarow}/>) :
        Table}
        </div></div> */}
