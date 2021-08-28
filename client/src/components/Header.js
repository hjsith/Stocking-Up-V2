import React from 'react'

 

const Header = (props) => {
    
    
    return (
        <header className='header'>
           <h1>{props.title}</h1>
           <p>{props.x}</p> 
        </header>
    )
}

Header.defaultProps = {
    title: "A2 MILK - A2M",
    sharePrice: 150,
}

export default Header