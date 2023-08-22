import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
        <div class="grid text-center">
            <div class="btn-group-vertical" role="group" aria-label="Vertical button group">
                <a class="btn btn-primary" role="button" aria-disabled="true">Grocerics</a>
                <a class="btn btn-primary" role="button" aria-disabled="true">Eletronics</a>
                <a class="btn btn-primary" role="button" aria-disabled="true">Home Appliance</a>
            </div>
            <div class="btn-group-vertical" role="group" aria-label="Vertical button group">
                <a class="btn btn-primary" role="button" aria-disabled="true">Clothes</a>
                <a class="btn btn-primary" role="button" aria-disabled="true">Jewlery</a>
                <a class="btn btn-primary" role="button" aria-disabled="true">Instrument</a>
            </div>
      </div>
    );
  }
}
