import React from 'react'
import Datatable from '../../../components/Datatable/Datatable'
import { columns } from './Mobiles'
type Props = { request: Array<Object> }


const Lcds = (props: Props) => {


    return (
        <Datatable data={props.request ?? []} columns={columns} targetRoute={'products'} search={'name'} tableName={"Lcd's"} />
    )
}
export default Lcds