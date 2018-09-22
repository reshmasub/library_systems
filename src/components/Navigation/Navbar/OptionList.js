import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import BookIcon from '@material-ui/icons/Book';
import LibraryIcon from '@material-ui/icons/AccountBalance';
import ReaderIcon from '@material-ui/icons/Face';
import LibrarianIcon from '@material-ui/icons/People';
import AdminIcon from '@material-ui/icons/AccountBox';
import GraphIcon from '@material-ui/icons/Assessment';
import NavigationItem from '../NavigationItem/NavigationItem'
import Divider from '@material-ui/core/Divider';

export const OptionList = (
      <div style ={{listStyle :'none'}}>

          <NavigationItem link='/' /* active */ exact>
          <ListItem button>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText> Home</ListItemText>
          </ListItem>
          </NavigationItem>

          <NavigationItem link='/books' /* active */ exact>
          <ListItem button>
            <ListItemIcon><BookIcon /></ListItemIcon>
            <ListItemText>Books</ListItemText> 
          </ListItem>
          </NavigationItem>

          <NavigationItem link='/libraries' >
          <ListItem button>
            <ListItemIcon><LibraryIcon /></ListItemIcon>
            <ListItemText>Libraries</ListItemText>
          </ListItem>
          </NavigationItem>
          
          <NavigationItem link='/readers' >
          <ListItem button>
            <ListItemIcon><ReaderIcon /></ListItemIcon>
            <ListItemText> Readers</ListItemText>
          </ListItem>
          </NavigationItem>

          <NavigationItem link='/librarians' >
          <ListItem button>
            <ListItemIcon><LibrarianIcon /></ListItemIcon>
            <ListItemText> Librarians</ListItemText>
          </ListItem>
          </NavigationItem>

          <NavigationItem link='/statistics' >
          <ListItem button>
            <ListItemIcon><GraphIcon /></ListItemIcon>
            <ListItemText> Statistics</ListItemText>
          </ListItem>
          </NavigationItem>
          
          <Divider/>

          <NavigationItem link='/admin' >
          <ListItem button>
            <ListItemIcon><AdminIcon/></ListItemIcon>
            <ListItemText>Administrators</ListItemText>
          </ListItem>
          </NavigationItem>

      </div>
    );

