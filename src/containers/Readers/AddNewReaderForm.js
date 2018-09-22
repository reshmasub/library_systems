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


class AddNewReaderForm extends Component {
state = {
    firstName: '',
    middleName: '',
    lastName: '',
    libraryName: '',
    barCode:'',
    showFormValidation:false,
    formErrorMessage:'',
    open: false,
}

handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
}

handleMouseDownPassword = event => {
    event.preventDefault();
};

handleAddReaderBtn =(event,state) =>{
    event.preventDefault();
    let self = this;
    let user = self.state;
    axios.post('https://p0kvnd5htd.execute-api.us-east-2.amazonaws.com/test/reader/', user)
      .then(res => {
        console.log(res);
        console.log(res.data);
      }).catch(e=>{
          console.log(e);
      })
    this.props.closeBtnHandler();
}

handleSubmit=(e) =>{}

closeHandler=() =>{
    this.props.closeBtnHandler();
}

render() {
    const { classes } = this.props;
    return (      
    <div>
        <div>
            <AppBar position="static" color="default" >
                <Toolbar variant="dense">
                <Typography variant="title" color="inherit">
                   Add Book
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
                onSubmit={this.handleAddReaderBtn}>
                
            <TextValidator                  
                className={classNames(classes.margin, classes.textField)}
                label="First Name"
                id="margin-normal"                
                placeholder="First Name" type="text" name="firstName" value={this.state.firstName}
                onChange={this.handleChange('firstName')} 
                validators={['required']}
                errorMessages={['this field is required']}
                />
            <TextValidator
                className={classNames(classes.margin, classes.textField)}
                label="Middle Name"
                id="margin-normal"
                placeholder="Middle Name" type="text" name="middleName" value={this.state.middleName}                
                onChange={this.handleChange('middleName')} />
            <TextValidator
                className={classNames(classes.margin, classes.textField)}
                label="Last Name"
                id="margin-normal"
                placeholder="Last Name" type="text" name="lastName" value={this.state.lastName}
                onChange={this.handleChange('lastName')}
                validators={['required']}
                errorMessages={['this field is required']} />
                <TextValidator
                className={classNames(classes.margin, classes.textField)}
                label="Library"
                id="margin-normal"
                placeholder="Choose from Library" type="text" name="libraryName" value={this.state.libraryName}
                onChange={this.handleChange('libraryName')}
                validators={['required']}
                errorMessages={['this field is required']} />
                <TextValidator
                className={classNames(classes.margin, classes.textField)}
                label="Barcode"
                id="margin-normal"
                placeholder="Barcode" type="text" name="barCode" value={this.state.barCode}
                onChange={this.handleChange('barCode')}
                validators={['required']}
                errorMessages={['this field is required']} />
                <Button
                className={classes.button}
                size="small"
                variant="contained"                                
                color="secondary"
                type="submit"
                > Save </Button>   
            {this.state.showFormValidation && <p style={{color:'red'}}>{this.state.formErrorMessage} </p>}                       
          </ValidatorForm>
        </div>                        
     </div>             
    );
  }
}

AddNewReaderForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddNewReaderForm);