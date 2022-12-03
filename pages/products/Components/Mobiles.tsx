import React from 'react'
import Datatable from '../../../components/Datatable/Datatable'
type Props = { request: Array<Object> }


const Mobiles = ({ request }: Props) => {


    const columns = [
        { field: 'product_name', header: 'Product Name' },
        // { field: 'purchased_price', header: 'Purchased Price' },
        { field: 'sell_price', header: 'Selling Price' },
        { field: 'condition', header: 'Condition' },
        { field: 'quantity', header: 'Quantity' }
    ]
    return (
        <Datatable data={request} columns={columns} buyBtn={true} targetRoute={'products'} />
    )
}

export default Mobiles