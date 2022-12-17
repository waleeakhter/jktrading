import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog'
import { InputNumber } from 'primereact/inputnumber';
import React, { useEffect, useState, useContext, useCallback } from 'react'
import API from '../../utils/axios';
import Dropdown from '../AutoComplete/dropdown';
import { AppContext } from '../Layout';
import Orders from './Orders';
import Payments from './Payments';
type Props = { clientModal: { visible: boolean, setVisibility: Function } }

const Modal = ({ clientModal }: Props) => {
    const [selectedShop, setSelectedShop] = useState(Object)
    const [shops, setShops] = useState(Array<{ status: string }>);
    const [payments, setPayments] = useState(Array<Object>);
    const [debit, setDebit] = useState(Number)
    const { toastMessage } = useContext(AppContext)

    const getData = useCallback(
        () => {
            API.get(`/orders/list?shop=${selectedShop._id}`).then(res => {
                console.log(res.data);
                setShops(res.data)
            }).catch(err => console.log(err));

            API.get(`/payments?shop=${selectedShop._id}`).then(res => {
                console.log(res.data);
                setPayments(res.data)
            }).catch(err => console.log(err))
        }, [selectedShop._id])

    useEffect(() => {
        selectedShop._id && getData()
    }, [selectedShop._id, getData])

    const closeModal = () => {
        clientModal.setVisibility(false);
        setShops([])
        setSelectedShop((prev: {}) => prev = {})
        setDebit(0);

    }
    const payment = (e: React.SyntheticEvent) => {
        const btn = e.target;
        (btn as HTMLButtonElement).disabled = true
        if (debit <= 0 || null || undefined) {
            toastMessage("error", "Error", "Enter recevid amount")
            return
        }
        API.post("/payments", { received: debit, shop: selectedShop._id }).then(res => {
            console.log(res.data);
            setSelectedShop(res.data.shop);
            setPayments(prev => prev = [res.data.payment, ...prev])
            setDebit(0);
            setTimeout(() => (btn as HTMLButtonElement).disabled = false, 300);
            toastMessage("success", "Payment", res.data.message);

        }).catch(err => {
            console.log(err.response.data);
            toastMessage("error", "Error", err.response.data.debitError);
            (btn as HTMLButtonElement).disabled = false
        })

    }

    const tabs = [
        { name: "Orders", component: <Orders tableName={selectedShop.name} data={shops ?? []} search={'product.name'} /> },
        { name: "Payments", component: <Payments tableName={selectedShop.name} data={payments} search={'received'} /> },
    ]
    const [currentTab, setCurrentTab] = React.useState(tabs.at(0)?.name)

    const header = () => {
        return <div className='flex items-center gap-8'>
            <Dropdown target={'shops/list'} callback={setSelectedShop} />
            {selectedShop._id && <><h1>Credit : {selectedShop.credit}<i className='pi pi-euro'></i></h1>
                <h1>Received  : {selectedShop.debit}<i className='pi pi-euro'></i></h1></>}
            {selectedShop.credit > 0 ?
                <div className='flex ml-auto justify-end items-end'>
                    <div>
                        <label className='text-sm'>Received Amount </label>
                        <InputNumber min={0} max={selectedShop.credit} value={debit} onValueChange={(e) => setDebit(e.value ?? 0)} />
                    </div>
                    <Button label='Save' icon="pi pi-plus" className='h-14' onClick={payment} />
                </div> : null}
        </div>
    }
    return (
        <Dialog header={header}
            visible={clientModal.visible}
            style={{ width: '98vw', maxHeight: '97vh', height: "100vh" }}
            onHide={closeModal} draggable={false}>


            {selectedShop._id ?
                <>
                    <div className="tabs-name flex border p-button w-fit items-center p-0">
                        {tabs.map(({ name }) =>
                            <h1 key={name} className={` ${name === currentTab ? ' active-tab ' : ''}`}
                                onClick={(e => setCurrentTab(name))}>{name}</h1>
                        )}
                    </div>
                    {tabs.map(({ name, component }) =>
                        <div key={name} className={name === currentTab ? 'block' : 'hidden'}>
                            {component}
                        </div>
                    )}
                </> :
                <p className='text-center text-2xl '>Please Select a Client</p>
            }

        </Dialog>
    )
}

export default Modal