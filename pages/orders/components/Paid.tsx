import React from 'react'
import Datatable from '../../../components/Datatable/Datatable'
import columns from '../../../components/pages/product/columns';
type Props = { request: Array<Object> }


const Paid = ({ request }: Props) => {

    return (
        <Datatable data={request ?? []} columns={columns} hideActionCol={true} targetRoute={'orders'} search={'shop.name'} tableName={"Paid Orders"} />
    )
}

export default Paid