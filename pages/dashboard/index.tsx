import { getSession, GetSessionParams } from 'next-auth/react'
import { Card } from 'primereact/card'
import React from 'react'
import Layout from '../../components/Layout'
import { getBalance, getProducts, getShops } from '../../helper/dataFetch'
type Props = {
    request: Array<{
        condition: string
        category: any, purchased_price: number, quantity: number
    }>,
    shops: Object[],
    balance: { balance: number, expense: number }
}

const index = ({ request, shops, balance }: Props) => {
    const sumTotal = (arr: Props['request']) => {
        return arr.reduce((sum, { purchased_price, quantity }) => sum + purchased_price * quantity, 0)
    }
    const filter = (val: string) => {
        return request.filter(req => req.category.name === val && req.quantity > 0)
    }
    return (
        <Layout>

            <div className="grid xl:grid-cols-4 sm:grid-cols-2 gap-4 dashboard-card ">
                <Card className="surface-0 shadow-2 p-[0_!important] border-1 border-50 border-round  ">
                    <div className=" justify-between">
                        <div>
                            <h1 className="block  text-xl mb-3 text-white">Current Balance</h1>
                            <div className="text-900 font-medium text-xl text-white">{balance?.balance ?? 0}<i className='pi pi-euro'></i></div>
                        </div>
                    </div>
                </Card>
                <Card className="surface-0 shadow-2 p-[0_!important] border-1 border-50 border-round  ">
                    <div className=" justify-between">
                        <div>
                            <h1 className="block  text-xl mb-3 text-white">Total Expenses</h1>
                            <div className="text-900 font-medium text-xl text-white">{balance?.expense ?? 0}<i className='pi pi-euro'></i></div>
                        </div>
                    </div>
                </Card>
                <Card className="surface-0 shadow-2 p-[0_10px_!important] border-1 border-50 border-round ">
                    <div className="flex justify-between">
                        <div>
                            <h1 className="block  text-xl mb-3 text-white">Mobile Inventery</h1>
                            <div className="text-900 font-medium text-xl text-white">£{sumTotal(filter("Mobile"))}</div>
                        </div>
                    </div>
                </Card>
                <Card className="surface-0 shadow-2 p-[0_10px_!important] border-1 border-50 border-round">
                    <div className="flex justify-between">
                        <div>
                            <h1 className="block  text-xl mb-3 text-white">Lcd&apos;s Inventery</h1>
                            <div className="text-900 font-medium text-xl text-white">£{sumTotal(filter("Lcd"))}</div>
                        </div>
                    </div>
                </Card>
                <Card className="surface-0 shadow-2 p-[0_10px_!important] border-1 border-50 border-round">
                    <div className="flex justify-between">
                        <div className='text-white'>
                            <h1 className="block  text-xl mb-3">Total LCD&apos;s</h1>
                            <div className="text-900 font-medium text-xl">{filter("Lcd").length}</div>
                        </div>
                    </div>
                </Card>
                <Card className="surface-0 shadow-2 p-[0_10px_!important] border-1 border-50 border-round">
                    <div className="flex justify-between">
                        <div className='text-white'>
                            <h1 className="block  text-xl mb-3">Total Mobile</h1>
                            <div className="text-900 font-medium text-xl">{filter("Mobile").length}</div>
                        </div>
                    </div>
                </Card>

                <Card className="surface-0 shadow-2 p-[0_10px_!important] border-1 border-50 border-round">
                    <div className="flex justify-between">
                        <div className='text-white'>
                            <h1 className="block  text-xl mb-3">A Grade Mobile</h1>
                            <div className="text-900 font-medium text-xl">{request.filter(req => req.condition === "A").length}</div>
                        </div>
                    </div>
                </Card>
                <Card className="surface-0 shadow-2 p-[0_10px_!important] border-1 border-50 border-round">
                    <div className="flex justify-between">
                        <div>
                            <h1 className="block  text-xl mb-3 text-white">Total Shops</h1>
                            <div className="text-900 font-medium text-xl text-white">{shops.length}</div>
                        </div>

                    </div>
                </Card>
                {/* <Card className="surface-0 shadow-2 p-[0_10px_!important]  border-1 border-50 border-round">
                    <div className="flex justify-between">
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
                    <div className="flex justify-between">
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
        const balance = await getBalance();
        await Promise.all([request, shops, balance]);
        // Pass data to the page via props
        return { props: { request, shops, balance } }
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