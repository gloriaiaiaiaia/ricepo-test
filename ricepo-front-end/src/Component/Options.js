import React, { Component }  from 'react';
import Item from './Item.js';
import star from './star.jpg';
import './Options.css';
import {Grid, Row, Col, Button} from 'react-bootstrap';

export default class Options extends Component{
	constructor(props) {
    super(props);
    this.state = {
    	optionId: props.optionId, // current option id
    	min: props.option.min,  // current option 'min'
    	max: props.option.max,  // current option 'max'
    	items: props.option.items,  // current option items
    	chooseArray: []  // 'chooseArray' to store items(index) user chosen
      }
  	}

  	// if 'max' === 0 => no high limit for chosen items, we can set max to very large number
  	componentWillMount() {
  		if (this.state.max === 0) {
  			this.setState({max: 99999},
              () => {
                console.log('max', this.state.max);
              });
  		}
  	}

  	// adding item to 'chooseArray'
	handleAddItem = (itemId) => {
		var newChooseArray = [...this.state.chooseArray];
		var newItem = this.state.items;

		// add ele
		newChooseArray.push(itemId);
		newItem[itemId].quantity++;

		// if chosen items more than 'max' => delete the earliest ele
		if (newChooseArray.length > this.state.max) {
			var deleteId = newChooseArray.shift();
			newItem[deleteId].quantity--;
		}
		this.setState({ 
			chooseArray: newChooseArray,
			items: newItem}, 
			()=>{
				console.log('handleAdd--chooseArray',this.state.chooseArray);
				console.log('handleAdd--newchooseArray', newChooseArray);
				this.props.OnSelectItem(this.state.optionId,this.state.chooseArray,this.state.items);
			});
	}

	// deleting item from 'chooseArray'
	handleDeleteItem = (itemId) => {
		var newChooseArray = [...this.state.chooseArray];
		var deleteId = itemId;
		var newItem = this.state.items;

		//delete ele's quantity
		newItem[deleteId].quantity--;
		var deleted = 0;

		//update 'chooseArray' {delete the first ele = 'deleteId'}
		var deletedNewChooseArray = new Array(0);
		while (newChooseArray.length > 0) {
			var itemIdShift = newChooseArray.shift();
			console.log('toSeeIfDelete', itemIdShift);
			console.log('toDelete', deleteId);
			if (itemIdShift !== deleteId || deleted !== 0) {
				deletedNewChooseArray.push(itemIdShift);
			} else {
				deleted++;
				continue;
			}
		}
		
		this.setState({ 
			chooseArray: deletedNewChooseArray,
			items: newItem},
			()=>{
				console.log('handleDel--chooseArray',this.state.chooseArray);
				console.log('handleDel--deletedChooseArray', deletedNewChooseArray);
				this.props.OnSelectItem(this.state.optionId,this.state.chooseArray,this.state.items);
			});
	}


  	render() {
	  	return (
	      <div>
	        <h5 className="underline">{this.props.option.name}</h5>
	        {
	        	// loop over items to construct menu
	        	this.state.items.map((item, i) => {
	        		if (item.available) {
						return (
							<div key={i}>
								<Grid>
								  <Row className="show-grid">
								  	<Col className="col-2">
								    </Col>
								    <Col className="col-1">
								    {/* show stars */}
								    {i < this.state.max
								    ?   <img alt={"star"} src={star} width={20} height={20}/>
								    :   null}
								    </Col>
									{/* show item details (name & price) on the menu */}
								    <Col className="col-6" style={{cursor: 'pointer'}} onClick={() => this.handleAddItem(i)}>
								        <Item 
			        					  itemName={item.name} 
			        					  itemPrice={item.price} 
			        				    />
								    </Col>
									{/* show chosen quantity with buttons */}
								    {item.quantity !== 0 
								    ?   <Col className="col-1">
									      <Button className="itemNum" 
									      		  bsSize="small" 
									      		  style={{borderRadius:100}}
									      		  // when clicked, the first of chosen items should be removed from 'chooseArray'
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
	        				// when item is not available, will show in gray, and unclickable 
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

