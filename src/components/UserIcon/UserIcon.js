import React, {Component} from 'react';
import NavigationItem from '../Navigation/NavigationItem/NavigationItem';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

class UserIcon extends Component {
    state = {
        auth: true,
        anchorEl: null,
      };

    handleChange = event => {
        this.setState({ auth: event.target.checked });
      };
    
    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
    handleClose = () => {
        this.setState({ anchorEl: null });
      };
    
    render(){
        const { classes } = this.props;
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return(
               <div style ={{position:'absolute',float :'right',right :'5px'}}>
                <IconButton aria-owns={open ? 'menu-appbar' : null} aria-haspopup="true" onClick={this.handleMenu}
                           color="inherit">
                <AccountCircle />
                </IconButton>
                <Menu id="menu-appbar" anchorEl={anchorEl}
                     anchorOrigin={{vertical: 'top',horizontal: 'right'}}
                     transformOrigin={{vertical: 'top',horizontal: 'right'}}
                     open={open}
                     onClose={this.handleClose}>
                        <MenuItem onClick={this.handleClose}><NavigationItem style = {{color :'black'}}link='/profile' >Profile</NavigationItem></MenuItem>
                        <MenuItem  onClick={this.handleClose}><NavigationItem link='/login' >Signout</NavigationItem></MenuItem>
                </Menu>
                </div>
        );
    }
    
}


export default UserIcon; 

