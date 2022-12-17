import Link from 'next/link'
import { Button } from 'primereact/button'
import React from 'react'
import { updateOrder, cancelOrder } from './functions';
import { AppContext } from '../Layout';
import { actionButtons } from './Datatable';

type Props = {
    rowData: { quantity: number, _id: string, status: "" },
    prevProps: actionButtons,
    modal: Function
}

const position = { position: 'bottom' }
const ActionButtons = ({ rowData, prevProps, modal }: Props) => {
    const { toastMessage } = React.useContext(AppContext);
    return (

        <>
            <div className='flex'>
                <span className="p-buttonset">
                    {(prevProps.buyBtn && rowData.quantity > 0) && <Button icon="pi pi-cart-plus" tooltip='Buy Product'
                        onClick={() => modal(rowData)} tooltipOptions={{ position: 'bottom' }} />}
                    {!prevProps.hideEditBtn && <Link href={`/${prevProps.targetRoute}/${rowData._id}/edit`}  >
                        < Button icon="pi pi-file-edit" tooltip='Edit Product' tooltipOptions={{ position: 'bottom' }} />
                    </Link>}
                    {!prevProps.hideDeleteBtn && <Button icon="pi pi-trash" tooltip='Delete Product' className='btn-delete' tooltipOptions={{ position: 'bottom' }} />}
                    {/* {prevProps.paidBtn && <Button label='Paid' icon="pi pi-check" className="p-button-sm" iconPos='right' onClick={(e) => updateOrder(e, rowData, toastMessage)} />} */}
                    {prevProps.returnBtn && <Button tooltip='Return Item' icon="pi pi-times" iconPos='right' className="p-button" onClick={(e) => cancelOrder(e, rowData, toastMessage)} tooltipOptions={{ position: 'bottom' }} />}
                </span>
            </div>
        </>
    )
}

export default ActionButtons