import React, { Component } from 'react';
import UserIcon from '../../UserIcon/UserIcon';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import {OptionList} from './OptionList';
import Aux from '../../../hoc/Auxi';
import Media from "react-media";

const drawerWidth = 230;

const styles = theme => ({
    list :{
        width :250,
    },
    menuButton: {
        marginLeft: -18,
        marginRight: 10,
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
        height : '100vh',
    },
    appBar:{
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: 'black',
        height: '60px'
    },
    toolbar: theme.mixins.toolbar,
  });
  
class Navbar extends Component {
    state ={
        left :false
    }

    toggleDrawer = (side, open) => () => {
        this.setState({
          [side]: open,
        });
    };

    render(){
    const { classes } = this.props;
    const sideList = (
        <div className={classes.list}>
          {OptionList}
        </div>
      );

    if(this.props.isLoggedIn){
        return(
            <Aux>
            <AppBar position="absolute" className={classes.appBar}>
            <Toolbar>
            <Media query = "(max-width : 699px)">
            <IconButton onClick={this.toggleDrawer('left', true)} className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
            </IconButton>
            </Media>
            <Typography variant="title" color="inherit" noWrap>
            FAVL SCAN
            </Typography>
            <UserIcon/>
            </Toolbar>
            </AppBar>
            <Media query = "(max-width : 699px)">
            <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
            <div tabIndex={0} role="button" onClick={this.toggleDrawer('left', false)} onKeyDown={this.toggleDrawer('left', false)}>
            {sideList}
            </div>
            </Drawer>
            </Media>
            </Aux>  
            );
        }
    else return (<div></div>);
    }
}
   
Navbar.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Navbar);

