import { getSession, GetSessionParams } from 'next-auth/react'
import React from 'react'
import Datatable from '../../components/Datatable/Datatable'
import Layout from '../../components/Layout'
import { getShops } from '../../helper/dataFetch'
type Props = { request: Array<Object> }


const AllShops = (props: Props) => {


    const columns = [
        { field: 'name', header: 'Shop Name' },
        { field: 'items.quantity', header: 'Total Items' },
        { field: 'credit', header: 'Credit Balance' },
        { field: 'debit', header: 'Debit Balance' },
    ]
    return (
        <Layout>
            <Datatable hideActionCol={true} data={props.request} columns={columns} targetRoute={'shops'} search={'name'} tableName={"Clients"} />
        </Layout>
    )
}
export default AllShops

export async function getServerSideProps(context: GetSessionParams | undefined) {

    const session = await getSession(context)
    if (session) {
        // Fetch data from external API
        const request = await getShops()
        // Pass data to the page via props
        return { props: { request } }
    } else {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
}