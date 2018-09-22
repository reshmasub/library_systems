import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import classes from './Graph.css'
export default class Checkouts extends Component {
  render() {
    return (
      <div className="Graph">
      <Plot
        data={[
          {
            type: 'bar', 
            x: ['08-08-2018', '08-09-2018', '08-10-2018','08-11-2018','08-12-2018','08-13-2018','08-14-2018'], 
            y: [20, 15, 23,24,25,26,33]},
        ]}
        layout={{
          width: 550, 
          height: 550, 
          xaxis: {
            title: 'DATE',
            titlefont: {
                family: 'Open Sans',
                size: 17,
                color: 'black'
            }
         },
         yaxis: {
             title: 'NUMBER OF BOOKS CHECKED OUT',
             titlefont: {
                 family: 'Open Sans',
                 size: 17,
                 color: 'black'
              }
         },
        title:  'CHECKOUTS PER DAY'
      }}
      />
      </div>
    );
  }
}