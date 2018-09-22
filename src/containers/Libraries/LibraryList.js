import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EditLibraryForm from './EditLibraryForm';
import Modal from '../../components/UI/Modal/Modal';
import '../../components/Table/BookList.css';
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

class LibraryList extends Component{
    constructor(){
        super();
        this.state={
            data: [],
            modal: false,
            datarow :{}
        }
       /*  this.makeData = this.makeData.bind(this); */
    }
   /*  makeData = (state,instance) =>{        
        axios.get('https://p0kvnd5htd.execute-api.us-east-2.amazonaws.com/test/book',{
            mode: 'no-cors',
            method: 'GET',
       })
       .then((response)=> {
               console.log(response);
               this.setState({data:response.data});
       })
    } */
    editBookBtnHandler = (property,info) => {
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

    render(){
        const { classes } = this.props;
        const Table = (<div style={{width:'90%',margin:'70px auto'}}><ReactTable 
        data={this.state.data}
        columns={[
            {Header: 'Library Name',
            accessor: 'Title',
            className:'Title'},
            {Header: 'Library Village',
            accessor: 'FirstName'},
            {Header: 'Library Country ',
            accessor: 'LibraryName'},
            {
                Header: 'Options',
                width: 200,
                style: {
                  cursor: 'pointer',
                  /* fontSize: 15,
                  padding: "10", */
                  textAlign: "center"
                },
                 Cell: props => <div><EditIcon onClick={()=>this.editBookBtnHandler(props.value,this.state.data)} 
                 color="default" className={classes.button}/>
                 <DeleteIcon color="default" className={classes.button}/></div>
            },
            /* {   
                Header: 'DELETE',
                expander:true,
                width: 100,
                Expander: ({ isExpanded, ...rest}) =>
                <Button color="primary" className={classes.button}>Delete</Button>, 
                style: {
                    cursor: "pointer",
                    fontSize: 15,
                    padding: "10", 
                    textAlign: "center",
                    userSelect: "none"
                  }, 
            } */
        ]}   
        className="-striped -highlight"
        showPagination={true}
        defaultPageSize={10}
        minRows={5}
        onFetchData={this.makeData} 
        />
    </div>
    );
    return(
        <div>
            {Table}
            {this.state.modal ? 
            (<Modal show = {this.state.modal} modalClosed ={this.closeBtnHandler}>
            <div>
            <EditLibraryForm closeBtnHandler={this.closeBtnHandler} rowId={this.state.datarow}/>
            </div>
            </Modal>):null}
        </div>
    )    
}
}

LibraryList.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withStyles(styles)(LibraryList);

{/* <div className='admin-table-container'>
        <div className='admin-table'>
        {this.editBookBtnHandler} {
            this.state.splitPane ? 
            
        (<EditBook closeBtnHandler={this.closeBtnHandler} rowId={this.state.datarow}/>) :
        Table}
        </div></div> */}