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
import EditReaderForm from './EditReaderForm';
import Modal from '../../components/UI/Modal/Modal';
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

class ReaderList extends Component{
    constructor(){
        super();
        this.state={ 
            data: [],
            modal: false,
            datarow :{}
        }
        this.makeData = this.makeData.bind(this);
    }

    makeData= (state,instance)=>{
        let self = this;
        axios.get('https://p0kvnd5htd.execute-api.us-east-2.amazonaws.com/test/reader',{
             mode: 'no-cors',
             method: 'GET',
        })
        .then((response)=> {
                console.log(response);
                this.setState({data:response.data});
        })

    }
    
    editReaderBtnHandler = (property,info) => {
        let rowInfo = info.find((element)=>element.BarCode == property);
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
    deleteReaderHandler = (property,info) => {
        confirmAlert({
              title: 'Reader Delete',
              message: 'Are you sure to delete?',
              buttons: [
                {
                  label: 'Confirm',
                  onClick: () => this.readDelete(property),
                },
                {
                  label: 'Cancel',
                  onClick: () => this.closeBtnHandler(),
                }
              ]
            })
    }
     readDelete=(property)=>
    {
        axios.delete('https://p0kvnd5htd.execute-api.us-east-2.amazonaws.com/test/reader/'+property,{
        mode: 'no-cors',
                    method: 'DELETE',}).
        then(res => {
                    console.log(res);
                    console.log(res.data);
                  }).catch(e=>{
                      console.log(e);
                  })
    }

    render(){
        const { classes } = this.props;
        const Table = (<div style={{width:'90%',margin:'70px auto'}}>
        <ReactTable
                data={this.state.data}
                columns={[
                    {Header: 'First Name',
                    accessor: 'FirstName'},
                    {Header: 'Last Name',
                    accessor: 'LastName'},
                    {Header:'Community',
                    accessor: 'LibraryName'},
                    {Header: 'Barcode ',
                    accessor: 'BarCode'},
                    {Header: 'Checkouts ',
                    accessor: 'Checkouts'},
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
                         Cell: props => <div><EditIcon onClick={()=>this.editReaderBtnHandler(props.value,this.state.data)} 
                         color="default" className={classes.button}/>
                         <DeleteIcon color="default"  onClick={()=>this.deleteReaderHandler(props.value,this.state.data)} 
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
            <EditReaderForm closeBtnHandler={this.closeBtnHandler} rowId={this.state.datarow}/>
            </div>
            </Modal>):null}
            </div>
        ) 

    }
}

ReaderList.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withStyles(styles)(ReaderList);