import React from 'react'

const Image = ({imgsrc,className,alt}) => {
  return (
    <>
      
      <img src={imgsrc} className={className} alt={alt} />
    
    </>
  )
}

export default Image