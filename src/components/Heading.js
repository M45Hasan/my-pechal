import React from 'react'

const Heading = (props) => {
    console.log(props.as)
  return ( 
    
    
      props.as===undefined ?
      <h1 className={props.className}>{props.title }</h1>
     
    
    :<props.as className={props.className}>{props.title }</props.as>
  )
}

export default Heading