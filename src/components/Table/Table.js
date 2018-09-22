import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    button: {
      margin: 0,    
    },
    input: {
      display: 'none',
    },
});

class Table extends Component{
    render(){
        const {classes} = this.props;
        let columnProps = this.props.columns;
        console.log(columnProps)
        console.log(this.props.options)
        const totalColumns =  [{
              Header: 'Options',
              accessor: 'Barcode',
              width: 200,
              style: {
                cursor: 'pointer',
                /* fontSize: 15,
                padding: "10", */
                textAlign: "center"
                 },
             Cell: this.props.options
        }]
        console.log(totalColumns)
        columnProps = columnProps.concat(totalColumns)
        console.log(columnProps)
        return(
            <div style={{width:'90%',margin:'70px auto'}}>
                <ReactTable
                data ={this.props.data}
                columns={columnProps}
                className="-striped -highlight"
                showPagination={true}
                defaultPageSize={10}
                minRows={5}
                onFetchData={this.props.onFetchData} 
                />
            </div>
        );
    }
}

Table.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withStyles(styles)(Table);
