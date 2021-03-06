import React, { Component } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';

const styles = theme => ({
  root: {
    padding: '20px',
    paddingTop: '20px',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textField: {
    flexBasis: 200,
    width: 300,
  },
  button:{
    margin: theme.spacing.unit,
  }
});


class EditBookForm extends Component {

constructor(props){
    super(props);
    console.log("*********"+JSON.stringify(this.props.rowId));
      this.state={
                data: this.props.rowId,
            }
      this.state.showFormValidation=false;
      this.state.formErrorMessage='';
      this.state.open=false;
      this.state.updatedObj = {
         title:this.props.rowId['Title'],
         firstName: this.props.rowId['FirstName'],
         middleName: this.props.rowId['MiddleName'],
         lastName: this.props.rowId['LastName'],
         libraryName: this.props.rowId['LibraryName'],
         barCode:this.props.rowId['BookBarcode']
      }
}

handleChange = prop => event => {
    console.log("updating")
    this.state.updatedObj[prop] = event.target.value;
    //this.setState({ [prop]: event.target.value });
}

handleMouseDownPassword = event => {
    event.preventDefault();
};

handleEditBookBtn =(event,state) =>{
    event.preventDefault();
    let self = this;
    let user = self.state.updatedObj;
    axios.put('https://p0kvnd5htd.execute-api.us-east-2.amazonaws.com/test/book/', user)
      .then(res => {
        console.log(res);
        console.log(res.data);
      }).catch(e=>{
          console.log(e);
      })
    this.props.closeBtnHandler();
}

closeHandler=() =>{
    this.props.closeBtnHandler();
}

render() {
    const {classes} = this.props;
    return (      
    <div>
        <div >
            <AppBar position="static" color="default" >
                <Toolbar variant="dense">
                <Typography variant="title" color="inherit">
                   Edit Book
                </Typography>
                <div className="add_admin_close">
                <a className="close" onClick={this.closeHandler}>
                        &times;
                    </a>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
        <div className={classes.root}>
        <ValidatorForm
                ref="form"
                onSubmit={this.handleEditBookBtn}>
            <TextValidator
                className={classNames(classes.margin, classes.textField)}
                label="Book Title"
                id="margin-normal"
                placeholder="title" type="text" name="title" defaultValue={this.state.updatedObj.title}
                onChange={this.handleChange('title')}
                 />
            <TextValidator                  
                className={classNames(classes.margin, classes.textField)}
                label="First Name"
                id="margin-normal"                
                placeholder="First Name" type="text" name="firstName" defaultValue={this.state.updatedObj.firstName}
                onChange={this.handleChange('firstName')} 

                />
            <TextValidator
                className={classNames(classes.margin, classes.textField)}
                label="Middle Name"
                id="margin-normal"
                placeholder="Middle Name" type="text" name="middleName" defaultValue={this.state.updatedObj.middleName}
                onChange={this.handleChange('middleName')} />
            <TextValidator
                className={classNames(classes.margin, classes.textField)}
                label="Last Name"
                id="margin-normal"
                placeholder="Last Name" type="text" name="lastName" defaultValue={this.state.updatedObj.lastName}
                onChange={this.handleChange('lastName')}
                 />
                <TextValidator
                className={classNames(classes.margin, classes.textField)}
                label="Library"
                id="margin-normal"
                placeholder="Choose from Library" type="text" name="libraryName" defaultValue={this.state.updatedObj.libraryName}
                onChange={this.handleChange('libraryName')}
                />

                <Button className={classes.button}
                size="small"
                variant="contained"                                
                color="secondary"
                type="submit">            
                Save
                </Button>   
                {this.state.showFormValidation && <p style={{color:'red'}}>{this.state.formErrorMessage} </p>}
            </ValidatorForm>
        </div>                        
    </div>             
    );
  }
}

EditBookForm.propTypes = {

};

export default withStyles(styles)(EditBookForm);
