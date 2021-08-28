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
import Change from '../components/Change';
import "../assets/css/QuoteMan.scss";
import Graph from '../components/Graph';


const Quotemgmt = () => {
  
  var sharePrice = 1.50;


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
        <div className="side1">
        <div className="BackgroundPanel1">
        <Header x={sharePrice} title={"A2 MILK - A2M"}/>
        </div>
        <div className="Panel2">
        <Change />
        <Tasks />
        <div/>
        
        <div className="Panel3">
        <h2>Quantity:</h2>

        <div className="quantityBtn1">
        <Button style handleClick={decrease} text="-"/>
        </div>
        <div className="quantityNumber">
        <Display number = {counter}/>
        </div>
        <div className="quantityBtn1">
        <Button handleClick={increase} text="+"/>
        </div>
        </div>

        <div className="order">
        
        <Button handleClick={buyButton} text="Buy"/>
        
        
        <Button text="Add to Watchlist"/>
        
        
        <Button handleClick={sellButton} text="Sell"/>
        <p>{message}</p>
        </div>
        <div className="funds">
        <Funds funds={funds}/>
        </div>
        </div>
        </div>
        <div className="BackgroundPanel2">
          <Graph />
        </div>
    </div>
    
  );
}

export default Quotemgmt ;


// this is the root component, called in index.js from index.html
