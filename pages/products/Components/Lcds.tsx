import React from 'react'
import Datatable from '../../../components/Datatable/Datatable'
import { getProducts } from '../../../helper/dataFetch'
type Props = { request: Array<Object> }


const Lcds = (props: Props) => {

    const columns = [
        { field: 'product_name', header: 'Product Name' },
        // { field: 'category_id.category_name', header: 'Category' },
        // { field: 'purchased_price', header: 'Purchased Price' },
        { field: 'sell_price', header: 'Selling Price' },
        // { field: 'condition', header: 'Condition' },
        { field: 'quantity', header: 'Quantity' }
    ]
    return (
        <Datatable data={props.request} columns={columns} targetRoute={'products'} />
    )
}
export default Lcds