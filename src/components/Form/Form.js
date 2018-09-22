import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
  });
  

  class Form extends Component {
    state = {
      open: false,
      age: '',
    };
  
    handleChange = name => event => {
      this.setState({ [name]: Number(event.target.value) });
    };
  
    handleClickOpen = () => {
      this.setState({ open: true });
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };
  
    render() {
      const { classes } = this.props;
  
      return (
        <div >
          <Dialog disableBackdropClick
            disableEscapeKeyDown
            open={this.props.open}
            onClose={this.props.onClose}
            >
          <DialogTitle>{this.props.formTitle}</DialogTitle>
          <Button style={{     position :'absolute',
        /* display: 'inline-block', */
        top : '19px',
        right:'10px',
        float: 'right',
        'border-radius':'10px'}} onClick={this.props.onClose} color="primary">
            Cancel
           </Button>
          <DialogContent style ={{width:'350px'}}>
             {this.props.children} 
          </DialogContent>
          <DialogActions>
          
           </DialogActions>
          </Dialog>
        </div>
      );
    }
  }
  
  Form.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Form);
  