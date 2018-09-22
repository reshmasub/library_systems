import React from 'react';
import Aux from '../../../hoc/Auxi';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import {OptionList} from '../Navbar/OptionList';
import Media from "react-media";

const drawerWidth = 240;

const styles = theme => ({
    drawerPaper: {
      position: 'relative',
      width: drawerWidth,
      height : '100vh',
    },
    toolbar: theme.mixins.toolbar,
  });

const sideDrawer = (props)=> {
    const { classes } = props;
    if(props.isLoggedIn){
    return(
        <Aux>
        <Media query = "(min-width : 699.1px)">
        <Drawer variant="permanent" classes={{paper: classes.drawerPaper,}}>
        <div className={classes.toolbar} />
        {OptionList}
        </Drawer>
        </Media>
        </Aux>
    );}
    else return (<div></div>);
}

sideDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(sideDrawer);