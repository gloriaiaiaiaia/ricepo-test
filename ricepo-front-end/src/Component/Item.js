import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

const Item = ({itemName, itemPrice}) => {

    return (
      <div>
	      <Grid>
			  <Row className="show-grid">
			    <Col className="col-6">
			      <h5>{itemName}</h5> 
			    </Col>
			    <Col className="col-6">
			      <h5>{`+`+itemPrice/100}</h5>
			    </Col>
			  </Row>
		  </Grid>
      </div>
    );
  }

export default Item;
