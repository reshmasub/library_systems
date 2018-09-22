import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import DateSelector from './DateSelector';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import Checkouts from './checkouts'
import LibraryList from '../../containers/Libraries/LibraryList'

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    position:'relative',
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
    width:'80%',
    height:'1000px',
    margin: '10px auto',
    'border-radius':'10px',
    background:'rgba(255,255,255,0.7)'
    },
});

class FullWidthTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div>
      <Paper className={classes.root} elevation={1}>
       <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="CHECKOUTS" />
            <Tab label="POPULAR BOOKS" />
            <Tab label="ACTIVE READERS" />
          </Tabs>
        </AppBar>
        <SwipeableViews
        style={{height:'100%',overflow:'-webkit-paged-y'}}
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
          <div>
          SELECT DATE
          <DateSelector/>
          </div>
          <br/>
          <div style ={{margin:'10px auto',paddingLeft:'250px'}}>
        <Checkouts />
        </div>
      
          </TabContainer>


          <TabContainer dir={theme.direction}><LibraryList/></TabContainer>
          <TabContainer dir={theme.direction}><LibraryList/></TabContainer>
        </SwipeableViews>
      </Paper>
      </div>
    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);

