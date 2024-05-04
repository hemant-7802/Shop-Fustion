import React from 'react'

const Button = ({
    type = 'button',
    className = 'w-full',
    btnName = '',
    disabled = '',
}) => {
    return <button type={type} className={`${className} border-none`} disabled={disabled} >{btnName}</button>
}

export default Button