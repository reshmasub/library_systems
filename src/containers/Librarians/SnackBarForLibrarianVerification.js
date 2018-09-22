import React,{Component} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

class SnackBarForLibrarianVerification extends Component{
    render(){
        const {handleClose, open, email} = this.props;
        return(
            <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{`Verification link has been sent to ${email}`} </span>}
            action={[            
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"                
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          /> 
        )
    }
}
export default SnackBarForLibrarianVerification;