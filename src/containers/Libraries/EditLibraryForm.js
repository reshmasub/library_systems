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


class EditLibraryForm extends Component {
state = {
    libraryname: '',
    librarycountry:'',
    libraryvillage: '',
    showFormValidation:false,
    formErrorMessage:'',
    open: false,
}

/* handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
}

handleMouseDownPassword = event => {
    event.preventDefault();
};

handleEditBookBtn =(event,state) =>{
    event.preventDefault();
    let self = this;
    let user = self.state;
    axios.put('https://p0kvnd5htd.execute-api.us-east-2.amazonaws.com/test/book/', user)
      .then(res => {
        console.log(res);
        console.log(res.data);
      }).catch(e=>{
          console.log(e);
      })
    this.props.closeBtnHandler();
}
 */
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
                onSubmit={this.handleAddBookBtn}>
                <TextValidator
                className={classNames(classes.margin, classes.textField)}
                label="Library name"
                id="margin-normal"
                placeholder="name" type="text" name="libraryname" value={this.state.libraryname}
                /* onChange={this.handleChange('title')} */
                validators={['required']}
                errorMessages={['this field is required']} />
                <TextValidator
                className={classNames(classes.margin, classes.textField)}
                label="Library village"
                id="margin-normal"
                placeholder="village" type="text" name="libraryvillage" value={this.state.libraryvillage}
                /* onChange={this.handleChange('bookId')} */
                validators={['required']}
                errorMessages={['this field is required']} />
                <TextValidator                  
                className={classNames(classes.margin, classes.textField)}
                label="Library country"
                id="margin-normal"                
                placeholder="country" type="text" name="librarycountry" value={this.state.librarycountry}
                /* onChange={this.handleChange('firstName')}  */
                validators={['required']}
                errorMessages={['this field is required']}
                />
                <Button
                className={classes.button}
                size="small"
                variant="contained"                                
                color="default"
                type="submit"
                >Save</Button>   
               {this.state.showFormValidation && <p style={{color:'red'}}>{this.state.formErrorMessage} </p>}                       
              </ValidatorForm>
        </div>                        
    </div>             
    );
  }
}
EditLibraryForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditLibraryForm);