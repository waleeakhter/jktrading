import React from 'react'
import Datatable from '../../../components/Datatable/Datatable'
type Props = { request: Array<Object> }


const Lcds = (props: Props) => {

    const columns = [
        { field: 'name', header: 'Product Name' },
        // { field: 'category.name', header: 'Category' },
        // { field: 'purchased_price', header: 'Purchased Price' },
        { field: 'sell_price', header: 'Selling Price' },
        // { field: 'condition', header: 'Condition' },
        { field: 'quantity', header: 'Quantity' }
    ]
    return (
        <Datatable data={props.request ?? []} columns={columns} targetRoute={'products'} search={'name'} tableName={"Lcd's"} />
    )
}
export default Lcds