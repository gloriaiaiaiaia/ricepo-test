import React, { Component } from 'react';
import './App.css';
import Options from './Component/Options.js';
import {Grid, Row, Col} from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      basicName: '',
      basicPrice: 0,
      options: []
  }
}

  componentWillMount() {
    fetch('http://localhost:3000/')
        .then(response => response.json())
        .then(data => {
            this.setState({basicName: data.name});
            this.setState({options: data.options});
            this.setState({basicPrice: data.price/100});
        })
  }

  changePrice = (price) => {
    const newPrice = this.state.basicPrice + price/100;
    this.setState({basicPrice: newPrice});
  }


  render() {

    return (
      <div className="App">
        <header className="App-header black">
          <Grid>
            <Row className="show-grid">
              <Col xs={6} md={4}>
              </Col>
              <Col xs={6} md={4}>
                <h3>{this.state.basicName}</h3>
              </Col>
              <Col className="right" xs={6} md={2}>
                <h4>${this.state.basicPrice}</h4>
              </Col>
            </Row>
          </Grid>
        </header>
        <div>
        {
          this.state.options.map((option,i) => {
              return (<Options key={i} 
                               option={option} 
                               OnSelectItem={this.changePrice}/>)
            }
          )
        }
        </div>
      </div>
    );
  }
}

export default App;
