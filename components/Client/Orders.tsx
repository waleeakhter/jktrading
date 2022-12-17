import React from 'react'
import Datatable from '../Datatable/Datatable'

type Props = { tableName: string, data: Object[], search: string }


const columns = [
    { field: 'product.name', header: 'Product Name' },
    { field: 'sell_quantity', header: 'Quantity' },
    { field: 'sell_price', header: 'Sold Price' },
    { field: 'total_amount', header: 'Total Amount' },
    { body: (rowData: { createdAt: string }) => new Date(rowData.createdAt).toDateString(), header: 'Date' },

]
const Orders = ({ tableName, data, search }: Props) => {
    return (
        <Datatable hideAddBtn={true} data={data} columns={columns} search={search}
            tableName={tableName} targetRoute={'orders'} hideActionCol={true}
            rows={5} />
    )
}

export default Orders