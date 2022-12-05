import React from 'react'
import Datatable from '../../../components/Datatable/Datatable'
import columns from '../../../components/pages/product/columns'
type Props = { request: Array<Object> }


const Unpaid = ({ request }: Props) => {
    return (
        <Datatable
            data={request ?? []}
            columns={columns}
            hideEditBtn={true}
            hideDeleteBtn={true}
            paidBtn={true}
            returnBtn={true}
            targetRoute={'orders'}
            search={'shop_id.shop_name'} tableName={"Unpaid Orders"}
        />
    )
}

export default Unpaid