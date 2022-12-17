import React from 'react'
import Datatable from '../../../components/Datatable/Datatable'
type Props = { request: Array<Object> }

export const columns = [
    { field: 'name', header: 'Product Name' },
    // { field: 'purchased_price', header: 'Purchased Price' },
    { field: 'sell_price', header: 'Selling Price' },
    // { field: 'condition', header: 'Condition' },
    { field: 'quantity', header: 'Quantity' }
]

const Mobiles = ({ request }: Props) => {


    return (
        <Datatable data={request ?? []} columns={columns} buyBtn={true} targetRoute={'products'} search={'name'} tableName={"Mobiles"} />
    )
}

export default Mobiles