import React from 'react'

const Card = (props) => {
    const {title, description} = props
  return (
    <div className="h-auto w-[300px] md:w-[500px] p-5 shadow-[rgba(0,0,0,0.1)_0px_4px_12px] rounded-lg">
      {
        title && <h2 className='font-bold text-lg mb-2 whitespace-pre-line'>{title}</h2>
      }
      <p className="break-words text-sm whitespace-pre-line">{description}</p>
    </div>
  )
}

export default Card
