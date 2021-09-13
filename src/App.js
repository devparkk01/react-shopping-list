import React, { useState, useEffect } from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faCircle, faCheckCircle, faPlus } from '@fortawesome/free-solid-svg-icons';

const App = () => {
	const [items, setItems] = useState([]);

	const [inputValue , setInputValue] = useState("") ;
	const [totalItems , setTotalItems] = useState(0) ; 

	useEffect( () => {
		const newTotal = items.reduce( (total , item) => {
			return total + item.quantity ; 
		} , 0 ) ; 
		setTotalItems(newTotal) ; 
	}, [items])

	const addNewItem = () => {
		const newItem = {id : Math.random().toString() , itemName : inputValue , quantity : 1 , isSelected : false} ; 
		setItems([ ...items , newItem]) ; 
		setInputValue("") ;

	}

	const increaseQuantity = (index) => {
		const newItems = [...items] ; 
		newItems[index].quantity++ ; 
		setItems(newItems) ; 
	}

	const decreaseQuantity = (index) => {
		const curQuantity = items[index].quantity ; 
		let newItems  ;
		if(curQuantity === 1) {
			newItems = items.filter( (item, curIndex ) =>  { return curIndex !== index } )
		}
		else {
			newItems = [...items] ;
			newItems[index].quantity-- ; 

		}
		setItems(newItems) ; 
	}

	const changeSelectionHandler = (index) => {
		const newItems = [...items] ;
		newItems[index].isSelected = !newItems[index].isSelected ; 
		setItems(newItems) ; 
	}


	return (
		<div className='app-background'>
			<div className='main-container'>
				<div className='add-item-box'>
					<input className='add-item-input' value = {inputValue} onChange = { (event)=> (setInputValue(event.target.value) )} placeholder='Add an item...' />
					<FontAwesomeIcon style = {{ cursor : "pointer"}}onClick = {addNewItem}icon={faPlus} />
				</div>
				<div className='item-list'>
					{ items.map( (item , index) => (
						
						<div key = {index} className='item-container'>
							<div className='item-name' onClick = {() => (changeSelectionHandler(index))} >
								{ item.isSelected ? (
									<>
										<FontAwesomeIcon  icon={faCheckCircle} />
										<span className='completed'>{item.itemName}</span>
									</>
								) : (
									<>
										<FontAwesomeIcon icon={faCircle} />
										<span>{item.itemName}</span>
									</>
								)}
							</div>
							<div className='quantity'>
								<button>
									<FontAwesomeIcon icon={faChevronLeft} onClick = {() => (decreaseQuantity(index) ) }/>
								</button>
								<span> {item.quantity} </span>
								<button>
									<FontAwesomeIcon icon={faChevronRight} onClick = { () => (increaseQuantity(index)) } />
								</button>
							</div>
						</div>
					))} 
				</div>
				<div className='total'>Total: {totalItems}  </div>
			</div>
		</div>
	);
};

export default App;