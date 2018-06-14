import React, { Component } from 'react';
import './App.css';
import Options from './Component/Options.js';
import {Grid, Row, Col} from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

var _ = require('lodash');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      basicName: '', // product's name
      basicPrice: 0, // product's basic price
      shownPrice: 0, // product's shown price
      options: [],  // all options
      optionPrice: [], // total price among all options (ele = price from one option)
      optionItemLeft: [], // check if items' quantity meet 'min'
      optionMin: [], // 'min' for options
      reachOptionMin: false, // record if all 'min's are reached
      popUpDialog: false, // open 'check out' pop-up window
      chosenItem: [] // record all chosen items
  }
}

  componentWillMount() {
    fetch('http://localhost:3000/') // Fetch menu data 
        .then(response => response.json())
        .then(data => {
            this.setState({
              basicName: data.name,
              options: data.options,
              optionPrice: new Array(data.options.length).fill(0),
              basicPrice: data.price/100,
              shownPrice: data.price/100},
              () => {
                console.log('opP', this.state.optionPrice);
              });

            // if no option at all
            if (this.state.options.length === 0) {
              this.setState({
                reachOptionMin: true
              })
            }

            // store 'min' of each options
            var newOptionMin = new Array(data.options.length).fill(0);
            var i = 0;
            while (i < newOptionMin.length) {
              newOptionMin[i] = data.options[i].min;
              i++;
            }

            this.setState({
              optionItemLeft: newOptionMin,
              optionMin: newOptionMin
            },
              () => {
                console.log('optionItemLeft', this.state.optionItemLeft);
              });

            // will store all chosen items
            var updateChosenItem = new Array(data.options.length);
            var a = 0;
            while (a < data.options.length) {
              updateChosenItem[a] = new Array(data.options[a].items.length).fill(0);
              a++;
            }

            this.setState({
              chosenItem: updateChosenItem,
            },
              () => {
                console.log('chosenItem', this.state.chosenItem);
              });
          }
        )
  }

  // handle and update changes from options
  changePrice = (optionId, chooseArray, items) => {
    var index = 0;
    var newOptionPrice = [...this.state.optionPrice];
    var newOptionItemLeft = [...this.state.optionItemLeft];
    var newChosenItem = [...this.state.chosenItem];
    var price = 0;
    
    // calculate price for current option
    while (index < chooseArray.length) {
      var itemId = chooseArray[index];
      price += items[itemId].price;
      index++;
    }

    // update chosen items' quantity
    var itemNum = 0;
    while (itemNum < items.length) {
      newChosenItem[optionId][itemNum] = items[itemNum].quantity;
      itemNum++;
    }

    // update price to 'optionPrice'
    newOptionPrice[optionId] = price;

    // update how many items need to be chosen to meet 'min'
    newOptionItemLeft[optionId] = this.state.optionMin[optionId] - chooseArray.length;

    //check if reached option's 'min'
    var opId = 0;
    var notEnough = 0;
    while (opId < this.state.options.length) {
      if (newOptionItemLeft[opId] > 0) {
        notEnough++;
        this.setState({ reachOptionMin: false });
        break;
      }
      opId++;
    }
    if (notEnough === 0) {
      this.setState({ reachOptionMin: true });
    }

    // update price to total price
    const newPrice = this.state.basicPrice + _.sum(newOptionPrice)/100;

    this.setState({
      shownPrice: newPrice.toFixed(2)*1, // *1 to turn String to num
      optionPrice: newOptionPrice,
      chosenItem: newChosenItem,
      optionItemLeft: newOptionItemLeft
      }, 
      () => {
        console.log('newPrice', this.state.shownPrice);
        console.log('UPDATEchosenItem', this.state.chosenItem);
      }); 
  }

  // open final check window
  handleFinalCheck = () => {
    this.setState({popUpDialog: true});
  }

  // close final check window
  handleWindowClose = () => {
    this.setState({ popUpDialog: false });
  }

  render() {
    return (
      <div className="App">
      {/* header with "product's name" & "price" */}
        <header className="App-header black"> 
          <Grid>
            <Row className="show-grid">
              <Col xs={6} md={4}>
              </Col>
              <Col xs={6} md={4}>
                <h3>{this.state.basicName}</h3>
              </Col>
              <Col className="right" xs={6} md={2}>
                <h4 style={{cursor: 'pointer'}} onClick={() => this.handleFinalCheck()}>${this.state.shownPrice}</h4>
              </Col>
            </Row>
          </Grid>
        </header>
      <div>

      {/* loop over options to construct the menu */}
        {
          this.state.options.map((option,i) => {
              return (<Options key={i} 
                               optionId={i}
                               option={option} 
                               OnSelectItem={this.changePrice}/>)  // updated price returned from <Options/>
            }
          )
        }

      {/* pop up window */}
      {
        this.state.popUpDialog 
        ? 
        <div>
          <Dialog
            open={this.state.popUpDialog}
            onClose={this.handleWindowClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
          {
            this.state.reachOptionMin
            ? <DialogTitle id="alert-dialog-title">{"Confirm your order: "}</DialogTitle>
            : <DialogTitle id="alert-dialog-title">{"Chose everything?"}</DialogTitle>
          }
            
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
              {/* If order not completed yet */}
              {
                this.state.optionItemLeft.map((num,i) => {
                  if (this.state.optionItemLeft[i] > 0) {
                    return (`You have to choose at least `+ num +` item(s) from `+ this.state.options[i].name +` option.`);
                  } 
                  return "";
                })
              }
              {/* If order can be completed */}
              {
                this.state.reachOptionMin
                ? this.state.chosenItem.map((opId, i) => {
                    var itId = 0;
                    var string = "";
                    while (itId < opId.length) {
                      console.log ('id:', itId, 'name ',this.state.options[i].items[itId].name, 'num: ', this.state.options[i].items[itId].quantity);
                      if (this.state.options[i].items[itId].quantity > 0) {
                        string += this.state.options[i].items[itId].quantity + " " + this.state.options[i].items[itId].name + "; "
                      }
                      itId++;
                    }
                    return string;
                })
                : null
              }
              </DialogContentText>
            </DialogContent>
            {
              this.state.reachOptionMin
              ? <DialogActions>
                  <Button onClick={this.handleClose} color="primary" autoFocus>
                    Check Out
                  </Button>
                </DialogActions>
              : null
            }
          </Dialog>
        </div>
        :
        null
      }
        </div>
      </div>
    );
  }
}

export default App;
