import React, { Component }  from 'react';
import Item from './Item.js';
import star from './star.jpg';
import './Options.css';
import {Grid, Row, Col, Button} from 'react-bootstrap';

export default class Options extends Component{
	constructor(props) {
    super(props);
    this.state = {
    	min: props.option.min,
    	max: props.option.max,
    	items: props.option.items,
    	priceArray: [],
    	chooseArray: []
      }
  	}

	handleAddItem = (itemId) => {
		var newChooseArray = [...this.state.chooseArray];
		var deleteId = -1;
		var newItem = this.state.items;
		if (newChooseArray.length < this.state.max) {
			newChooseArray.push(itemId);
			newItem[itemId].quantity++;
		} else {
			deleteId = newChooseArray.pop();
			newItem[deleteId].quantity--;
			newChooseArray.push(itemId);
			newItem[itemId].quantity++;
		}
		this.setState({ 
			chooseArray: newChooseArray,
			items: newItem});

		console.log('handleAdd choose', this.state.chooseArray);
		this.handleUpdatePrice(deleteId, itemId);
	}

	handleDeleteItem = (itemId) => {
		var newChooseArray = [...this.state.chooseArray];
		var deleteId = itemId;
		var newItem = this.state.items;

		newItem[deleteId].quantity--;
		
		this.setState({ 
			chooseArray: newChooseArray,
			items: newItem});

		console.log('handleDel choose', this.state.chooseArray);
		this.handleUpdatePrice(deleteId, -1);
	}

	handleUpdatePrice = (deleteId, itemId) => {
		console.log('de', deleteId, 'ad', itemId);
		console.log('+', this.state.priceArray[itemId]);
		console.log('Update choose', this.state.chooseArray);
		if (deleteId === -1) {
			this.props.OnSelectItem(this.state.priceArray[itemId]);
		} else if (itemId === -1) {
			this.props.OnSelectItem( - this.state.priceArray[deleteId]);
		} else {
			this.props.OnSelectItem(this.state.priceArray[itemId] - this.state.priceArray[deleteId]);
			console.log('-', this.state.priceArray[deleteId]);
		}
	}

	componentWillMount() {
		var newArray = [];
		var i = 0;
		while (i < this.state.items.length) {
			newArray.push(this.state.items[i].price);
			i++;
		}
		console.log('new', newArray);
		this.setState({ priceArray: newArray });
  	}
	
  	render() {
	  	return (
	      <div>
	        <h5 className="underline">{this.props.option.name}</h5>
	        {
	        	this.state.items.map((item, i) => {
	        		if (item.available) {
						return (
							<div style={{cursor: 'pointer'}} key={i} onClick={() => this.handleAddItem(i)}>
								<Grid>
								  <Row className="show-grid">
								  	<Col className="col-2">
								    </Col>
								    <Col className="col-1">
								    {i < this.state.max
								    ?   <img alt={"star"} src={star} width={20} height={20}/>
								    :   null}
								    </Col>
								    <Col className="col-6">
								        <Item 
			        					  itemName={item.name} 
			        					  itemPrice={item.price} 
			        				    />
								    </Col>
								    {item.quantity !== 0 
								    ?   <Col className="col-1">
									      <Button className="itemNum" 
									      		  bsSize="small" 
									      		  style={{borderRadius:100}}
									      		  onClick={() => this.handleDeleteItem(i)}>{item.quantity}</Button>
									    </Col> 
								    :   null}
								    <Col className="col-2">
								    </Col>
								  </Row>
							    </Grid>
	        				</div>)
	        		} else {
	        			return (
							<div style={{color: 'gray'}} key={i}>
							<Grid>
							  <Row className="show-grid">
								<Col className="col-2">
							    </Col>
							    <Col className="col-1">
							    {i < this.state.max
							    ?   <img alt={"star"} src={star} width={20} height={20}/>
							    :   null}
							    </Col>
							    <Col className="col-6">
	        			        <Item 
	        					  itemName={item.name+` (sold out)`}
	        					  itemPrice={item.price} 
	        				    />
	        				    </Col>
	        				    <Col className="col-2">
								</Col>
							  </Row>
							</Grid>
	        				</div>)
	        		}
	        	})
	        }
	      </div>
	    );
  	}
    
}

