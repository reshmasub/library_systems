import React, { Component } from 'react';
//import './Home.css';
import Aux from '../../hoc/Auxi';
import HomeCardWrapped from './HomeCard';

class Home extends Component {
  state ={
    libraries: ['library 1', 'library 2', 'library 3', 'library 4', 'library 5', 'library 6'],
    pageCount: 4,
    offset: 0,

  }

  render() {
    return (
      <Aux>
      <div className='home-container'>
      <ol className='home-grid'style={{
      'list-style-type': 'none',
      padding: '0',
      margin: '0',
      'align-content': 'center',
      'display': 'flex',
      'justify-content': 'center',
      'flex-wrap': 'wrap',
      }}>
          {this.state.libraries.map((library) => (
            <li style={{padding: '20px 20px'}}key={library}>            
              <HomeCardWrapped library={library}/>
              {console.log("session token=========="+JSON.stringify(sessionStorage.getItem("cognitoUser")))}
            </li>
          ))}
        </ol>      
      </div>    
      </Aux>  
    )
  }
}

export default Home;
