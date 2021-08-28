import React from 'react'

const Funds = (props) => {
    
    
    return (
        <div>
           <h1> Funds Available: {props.funds}</h1>
        </div>
    )
}

Funds.defaultProps = {
    funds: 5000,
}

export default Funds
