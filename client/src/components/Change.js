import React from 'react'
import "../assets/css/QuoteMan.scss";

const Change = (props) => {
return (
    <div class= "secondpanel">
       <h4>Today's change</h4>
       <p>{props.change}</p> 
   </div>
)
}

Change.defaultProps = {
change: "2.75%",
}
export default Change
