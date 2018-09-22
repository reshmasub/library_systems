import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import classes from './Modal.css';
import Aux from '../../../hoc/Auxi';
import Backdrop from '../Backdrop/Backdrop';
import Button from '@material-ui/core/Button';

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

class Modal extends Component {
    state = {
        open:false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    } 

    render () {
            return (
            <Aux>
                 <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div> 
             {/*    <Dialog disableBackdropClick disableEscapeKeyDown open={this.state.open} 
                onClose={this.handleClose}>
                <DialogTitle>Fill the form</DialogTitle>
                <DialogContent>
                {this.props.children}
                </DialogContent>
                <DialogActions>
                <Button onClick={this.handleClose} color="primary">Cancel</Button>
                <Button onClick={this.handleClose} color="primary">Save</Button>
                </DialogActions>
                </Dialog> */}
            </Aux>
        )
    }
}

Modal.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default Modal;

