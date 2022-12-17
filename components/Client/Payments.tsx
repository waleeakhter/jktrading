import React from 'react'
import Datatable from '../Datatable/Datatable'

type Props = { tableName: string, data: Object[], search: string, showShop?: boolean }



const Payments = ({ tableName, data, search, showShop }: Props) => {
    const columns = [
        showShop ? { field: "shop.name", header: "Shop" } : false,
        { body: (rowData: { received: number }) => <p className='text-xl'>{rowData.received} <i className='pi pi-euro'></i></p>, header: 'Received' },
        { body: (rowData: { discount: number }) => <p className='text-xl'>{rowData.discount} <i className='pi pi-euro'></i></p>, header: 'Discount' },
        showShop ? { body: (rowData: { panding: number }) => <p className='text-xl'>{rowData.panding} <i className='pi pi-euro'></i></p>, header: 'Panding' } : false,
        { body: (rowData: { createdAt: string }) => new Date(rowData.createdAt).toDateString(), header: 'Date' },

    ]
    return (
        <Datatable hideAddBtn={true} data={data} columns={columns} search={search}
            tableName={tableName} targetRoute={'orders'} hideActionCol={true}
            rows={5} />
    )
}

export default Payments