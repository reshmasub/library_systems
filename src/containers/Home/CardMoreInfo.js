import React, { Component } from 'react';
import classes from './Home.css';
class CardMoreInfo extends Component {
   
    render() {
        const {library} = this.props;
        return (
        
           <div className={classes.moreinfocontainer}>
               <div className="header"> {library } </div>
                <div className="content">
                Books: books
                <br/>
                Readers:Readers
                <br/>
                CheckOuts: CheckOuts
                <br/>
                OverDue: over due
                <br/>
                Librarians: abc, xyz 
                </div>
           </div>
        );
    }
}

export default CardMoreInfo;