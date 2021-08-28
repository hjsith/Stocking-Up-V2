//import logo from './logo.svg';
// react logo
//import './App.css';
// basic styling 

// below is gonna be functions 
import  { useState } from 'react';
import Header from '../components/Header';
import Tasks from '../components/Tasks';
import Funds from '../components/Funds';
import NavBar from '../components/NavBar';


const Quotemgmt = () => {
  
  var sharePrice = 150;


    const [counter, setCounter] = useState(0)

    const Button = (props) => {
      return <button onClick ={props.handleClick}>{props.text}</button>
    }

    const Display = (props) =>
    {
      return (<h1>{props.number}</h1>)
    }

    const increase =() => setCounter(counter + 1);
    const decrease =() => 
          {
            if (counter >= 1)
             {setCounter(counter - 1)}
          };


  
    const [funds, setFunds] = useState(5000)
    

    const buyButton = () => {
      
        if (funds < (counter * sharePrice))
         {setMessage("You do not have enough funds!")}
       else
      {setFunds(funds - (counter * sharePrice));
        setCounter(0);
        setMessage("")
      }
    }


    const sellButton = () => {
      setFunds(funds + (counter * sharePrice));
      setCounter(0);
      setMessage("")
  }

  const [message, setMessage] = useState(" ")




  return (
    <div>
        <NavBar />
        <Header x={sharePrice} title={"A2 MILK"}/>
        <Tasks />
        <Button className="quantity-input__modifier quantity-input__modifier--left" handleClick={decrease} text="-"/>
        <Display number = {counter}/>
        <Button handleClick={increase} text="+"/>
        <Button handleClick={buyButton} text="Buy" />
        <Button text="Add to Watchlist"/>
        <Button handleClick={sellButton} text="Sell"/>

        <p>{message}</p>

    </div>
  );
}

export default Quotemgmt ;


// this is the root component, called in index.js from index.html
