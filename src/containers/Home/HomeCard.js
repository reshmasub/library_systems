import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const styles = theme => ({
    paper: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        margin: 'auto',
        position: 'absolute',
        height: '250px',
        overflow: 'hidden',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        textAlign:'center', 
                
        
    },
    card: {
        width: '150px',      
        height: '150px',       
        background:'rgba(255,255,255)',        
      },
    button:{
        marginTop:'10px',
    }
  
});

class HomeCard extends Component {
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        const { library } = this.props


        return (
            <div>                
                <Card className={classes.card} onClick={this.handleOpen}>
                    <CardContent>
                        <Typography variant="headline" component="h2" color="inherit">
                            {library}
                        </Typography>
                        <br />
                        <Typography component="p" color="textSecondary">
                            Librarians: abc, xyz.
                        </Typography>
                    </CardContent>
                </Card>                
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}>
                
                    <div className={classes.paper}>
                    <div>
                        <Typography variant="title" id="modal-title" >
                            {library}
                        </Typography>
                        <br/>
                        <Typography variant="body1" id="simple-modal-description">
                            Books: books
                        </Typography>
                        <Typography variant="body1" id="simple-modal-description">
                            Readers:Readers
                        </Typography>
                        <Typography variant="body1" id="simple-modal-description">
                            CheckOuts: CheckOuts
                        </Typography>
                        <Typography variant="body1" id="simple-modal-description">
                            OverDue: over due
                        </Typography>
                        <Typography variant="body1" id="simple-modal-description">
                            Librarians: abc, xyz 
                        </Typography>
                    </div>
                    <div className={classes.button}>
                        <Button size="small"
                            variant="contained"
                            color="secondary"
                            onClick={this.handleClose}>
                            Close
                        </Button>
                    </div>

                    </div>
                </Modal>

            </div>
        )
    }
}
HomeCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

const HomeCardWrapped = withStyles(styles)(HomeCard);

export default HomeCardWrapped;