# ricepo-test

Webpage Structure:
App.js  => Header (with product’s name and total price)
	=> Options.js (one component for one option) => option’s name
						     => ‘star’ mark
						     => Items.js (one component for one item)
					             => chosen item number button


Test Cases:
About JSON data:
1. item.available could be ‘false’;
2. option.max could be ‘0’, indicates no high limitation;
3. no ‘option’ at all; 

About User behavior:
1. user didn’t choose enough options;
2. user click one item many times;
