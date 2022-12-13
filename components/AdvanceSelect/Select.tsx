import React from 'react'
import Select from 'react-select'

const Select = ({ target }) => {
    const options: reac = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]
    return (
        <div>
            <Select options={options} />
        </div>
    )
}

export default Select