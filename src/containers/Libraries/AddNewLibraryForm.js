import React, { Component } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
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


class AddNewLibraryForm extends Component {
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

handleAddBookBtn =(event,state) =>{
    event.preventDefault();
    let self = this;
    let user = self.state;
    axios.post('https://p0kvnd5htd.execute-api.us-east-2.amazonaws.com/test/book/', user)
      .then(res => {
        console.log(res);
        console.log(res.data);
      }).catch(e=>{
          console.log(e);
      })
    this.props.closeBtnHandler();
}
*/
handleSubmit=(e) =>{}

closeHandler=() =>{
    this.props.closeBtnHandler();
}

  render() {
    const { classes } = this.props;
    return (      
    <div>
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
                >Add</Button>   
               {this.state.showFormValidation && <p style={{color:'red'}}>{this.state.formErrorMessage} </p>}                       
        </ValidatorForm>
        </div>                        
    </div>             
    );
  }
}

AddNewLibraryForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddNewLibraryForm);