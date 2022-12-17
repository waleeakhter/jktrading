import { getSession, GetSessionParams } from 'next-auth/react'
import React from 'react'
import Payments from '../../components/Client/Payments'
import Layout from '../../components/Layout'
import API from '../../utils/axios'

type Props = { payment: Object[] }

const index = ({ payment }: Props) => {
    return (
        <Layout>
            <Payments tableName={'Payments'} data={payment ?? []} search={'shop.name'} showShop={true} />
        </Layout>
    )
}
export async function getServerSideProps(context: GetSessionParams | undefined) {
    // Fetching data from external API
    const session = await getSession(context)
    if (session) {

        return API.get('/payments').then(req => {
            return { props: { payment: req.data } }

        }).catch(err => { return { props: { errorCode: err.data } } })
    } else {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
}
export default index