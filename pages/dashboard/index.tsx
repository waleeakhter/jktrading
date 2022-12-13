import { getSession, GetSessionParams } from 'next-auth/react'
import { Card } from 'primereact/card'
import React from 'react'
import Layout from '../../components/Layout'
import { getProducts, getShops } from '../../helper/dataFetch'
type Props = {
    request: Array<{
        condition: string
        category: any, purchased_price: number, quantity: number
    }>,
    shops: Object[]
}

const index = ({ request, shops }: Props) => {
    const sumTotal = (arr: Props['request']) => {
        return arr.reduce((sum, { purchased_price, quantity }) => sum + purchased_price * quantity, 0)
    }
    const filter = (val: string) => {
        return request.filter(req => req.category.name === val)
    }
    return (
        <Layout>

            <div className="grid xl:grid-cols-4 sm:grid-cols-2 gap-4 dashboard-card ">
                <Card className="surface-0 shadow-2 p-[0_10px_!important] border-1 border-50 border-round">
                    <div className="flex justify-between mb-3">
                        <div>
                            <h1 className="block  text-xl mb-3 text-white">Mobile Inventery</h1>
                            <div className="text-900 font-medium text-xl text-white">£{sumTotal(filter("Mobile"))}</div>
                        </div>
                        <div className="flex items-center justify-center bg-orange-100 border-round shadow-inner rounded-full" style={{ width: '3rem', height: '3rem' }}>
                            <i className="pi pi-money-bill text-[#28F8C8]  text-xl"></i>
                        </div>
                    </div>
                </Card>
                <Card className="surface-0 shadow-2 p-[0_10px_!important] border-1 border-50 border-round">
                    <div className="flex justify-between mb-3">
                        <div>
                            <h1 className="block  text-xl mb-3 text-white">Lcd's Inventery</h1>
                            <div className="text-900 font-medium text-xl text-white">£{sumTotal(filter("Lcd's"))}</div>
                        </div>
                        <div className="flex items-center justify-center bg-orange-100 border-round shadow-inner rounded-full" style={{ width: '3rem', height: '3rem' }}>
                            <i className="pi pi-money-bill text-[#28F8C8]  text-xl"></i>
                        </div>
                    </div>
                </Card>
                <Card className="surface-0 shadow-2 p-[0_10px_!important] border-1 border-50 border-round">
                    <div className="flex justify-between mb-3">
                        <div className='text-white'>
                            <h1 className="block  text-xl mb-3">Total LCD's</h1>
                            <div className="text-900 font-medium text-xl">{filter("Lcd's").length}</div>
                        </div>
                        <div className="flex items-center justify-center shadow-inner rounded-full " style={{ width: '3rem', height: '3rem' }}>
                            <i className="pi pi-box text-[#28F8C8] text-xl"></i>
                        </div>
                    </div>
                </Card>
                <Card className="surface-0 shadow-2 p-[0_10px_!important] border-1 border-50 border-round">
                    <div className="flex justify-between mb-3">
                        <div className='text-white'>
                            <h1 className="block  text-xl mb-3">Total Mobiles</h1>
                            <div className="text-900 font-medium text-xl">{filter("Mobile").length}</div>
                        </div>
                        <div className="flex items-center justify-center shadow-inner rounded-full " style={{ width: '3rem', height: '3rem' }}>
                            <i className="pi pi-box text-[#28F8C8] text-xl"></i>
                        </div>
                    </div>
                </Card>

                <Card className="surface-0 shadow-2 p-[0_10px_!important] border-1 border-50 border-round">
                    <div className="flex justify-between mb-3">
                        <div className='text-white'>
                            <h1 className="block  text-xl mb-3">A Grade Mobiles</h1>
                            <div className="text-900 font-medium text-xl">{request.filter(req => req.condition === "A").length}</div>
                        </div>
                        <div className="flex items-center justify-center shadow-inner rounded-full " style={{ width: '3rem', height: '3rem' }}>
                            <i className="pi pi-box text-[#28F8C8] text-xl"></i>
                        </div>
                    </div>
                </Card>
                <Card className="surface-0 shadow-2 p-[0_10px_!important] border-1 border-50 border-round">
                    <div className="flex justify-between mb-3">
                        <div>
                            <h1 className="block  text-xl mb-3 text-white">Total Shops</h1>
                            <div className="text-900 font-medium text-xl text-white">{shops.length}</div>
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
        const shops = await getShops("")
        // Pass data to the page via props
        return { props: { request, shops } }
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