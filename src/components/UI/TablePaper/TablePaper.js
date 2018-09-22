import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'; 
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        position:'relative',
        paddingTop: theme.spacing.unit * 3,
        paddingBottom: theme.spacing.unit * 3,
        width:'90%',
        margin: '10px auto',
        'border-radius':'10px',
        background:'rgba(255,255,255)'
    },
    text :{
        fontSize:'3em',
        position :'absolute',
        top : '5px',
        left:'20px',
        float: 'left'}
});

class TablePaper extends Component {
    render(){
    const {classes} = this.props;
    return(
    <Paper className={classes.root} elevation={1}>
    <Typography className={classes.text} variant="headline" component="h1">
    {this.props.title}
    </Typography>
    {this.props.children}
    </Paper>
    );}
}

TablePaper.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TablePaper);