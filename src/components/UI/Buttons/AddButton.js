import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'; 
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        position :'absolute',
        /* display: 'inline-block', */
        top : '5px',
        right:'10px',
        float: 'right',
        'border-radius':'10px'
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
});


class AddButton extends Component{
    render(){
        const {classes} = this.props
        return(
            <Button variant="extendedFab" className={classes.button} onClick={this.props.onClick}>
            <AddIcon className={classes.extendedIcon}/>{this.props.buttonName}</Button>
        );
    }
}

AddButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddButton);