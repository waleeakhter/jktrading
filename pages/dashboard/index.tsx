import { getSession, GetSessionParams } from 'next-auth/react'
import { Card } from 'primereact/card'
import React from 'react'
import Layout from '../../components/Layout'
import { getProducts } from '../../helper/dataFetch'
type Props = { request: Array<{ purchased_price: number, quantity: number }> }

const index = ({ request }: Props) => {
    const sumTotal = (arr: Props['request']) => {

        return arr.reduce((sum, { purchased_price, quantity }) => sum + purchased_price * quantity, 0)
    }
    return (
        <Layout>

            <div className="grid xl:grid-cols-4 sm:grid-cols-2 gap-4 dashboard-card ">
                <Card className="surface-0 shadow-2 p-[0_10px_!important] border-1 border-50 border-round">
                    <div className="flex justify-between mb-3">
                        <div className='text-white'>
                            <h1 className="block  text-xl mb-3">Total Products</h1>
                            <div className="text-900 font-medium text-xl">{request.length}</div>
                        </div>
                        <div className="flex items-center justify-center shadow-inner rounded-full " style={{ width: '3rem', height: '3rem' }}>
                            <i className="pi pi-box text-[#28F8C8] text-xl"></i>
                        </div>
                    </div>
                </Card>
                <Card className="surface-0 shadow-2 p-[0_10px_!important] border-1 border-50 border-round">
                    <div className="flex justify-between mb-3">
                        <div>
                            <h1 className="block  text-xl mb-3 text-white">Inventery</h1>
                            <div className="text-900 font-medium text-xl text-white">£{sumTotal(request)}</div>
                        </div>
                        <div className="flex items-center justify-center bg-orange-100 border-round shadow-inner rounded-full" style={{ width: '3rem', height: '3rem' }}>
                            <i className="pi pi-money-bill text-[#28F8C8]  text-xl"></i>
                        </div>
                    </div>
                </Card>
                {/* <Card className="surface-0 shadow-2 p-[0_10px_!important]  border-1 border-50 border-round">
                    <div className="flex justify-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Customers</span>
                            <div className="text-900 font-medium text-xl">28441</div>
                        </div>
                        <div className="flex items-center justify-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-inbox text-cyan-500 text-xl"></i>
                        </div>
                    </div>
                </Card>
                <Card className="surface-0 shadow-2 p-[0_10px_!important] border-1 border-50 border-round">
                    <div className="flex justify-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Comments</span>
                            <div className="text-900 font-medium text-xl">152 Unread</div>
                        </div>
                        <div className="flex items-center justify-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-comment text-purple-500 text-xl"></i>
                        </div>
                    </div>
                </Card> */}
            </div>

        </Layout>
    )
}

export async function getServerSideProps(context: GetSessionParams | undefined) {
    // Fetch data from external API
    const session = await getSession(context)
    if (session) {
        const request = await getProducts("")
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
export default index