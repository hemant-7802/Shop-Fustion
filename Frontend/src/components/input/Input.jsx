import React from 'react'

const Input = ({
    label = '',
    name = '',
    type = '',
    placeholder = '',
    classname = 'rounded-md w-full focus:ring-1 focus:ring-sky-200',
    labelClassname = ``,
    labelValue = 'true',
    divClassname = 'flex-col',
    value = '',
    checked = '',
    autoFocus = '',
    onChange = () => { }

}) => {
    return (
        <div className={`flex gap-2 w-full p-1 ${divClassname}`}>
            <label className={labelValue === 'true' ? `label font-medium text-base ${labelClassname}` : "hidden"}><span className='label-text'>{label}</span></label>
            <input type={type} name={name} placeholder={placeholder} className={`input input-bordered transition-all duration-500 focus:outline-none shadow-sm shadow-gray-600 text-gray-400 ${classname}`} value={value} onChange={onChange} checked={checked} autoFocus={autoFocus} />
        </div>
    )
}

export default Input