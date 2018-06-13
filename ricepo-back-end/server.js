const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors());

const database = {
	name: "Signature Milk Tea",
	price: 325,
	options: [
		{
			name: "Add On",
			min: 0,
			max: 2,
			chosen: [ ],
			items: [
				{
					name: "bubble",
					price: 50,
					available: true,
					quantity: 0
				},
				{
					name: "pudding",
					price: 20,
					available: true,
					quantity: 0
				}
			]
		},
		{
			name: "Tea",
			min: 1,
			max: 1,
			chosen: [ ],
			items: [
				{
					name: "milk tea",
					price: 0,
					available: false,
					quantity: 0
				},
				{
					name: "green milk tea",
					price: 100,
					available: true,
					quantity: 0
				}
			]
		},
		{
			name: "Size",
			min: 1,
			max: 1,
			chosen: [ ],
			items: [
				{
					name: "Large",
					price: 150,
					available: true,
					quantity: 0
				},
				{
					name: "Medium",
					price: 0,
					available: true,
					quantity: 0
				}
			]
		}
	]
}

app.get('/', (req,res) => {
	res.json(database);
})


app.listen(3000, ()=>{
	console.log('app is running');
})