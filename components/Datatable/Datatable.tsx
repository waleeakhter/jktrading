import React, { useState } from 'react'
import { useRouter } from 'next/router';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FilterMatchMode } from 'primereact/api';
import SellingModal from '../Modal/SellingModal';
import ActionButtons from './ActionButtons';

type Props = {
    data: Array<Object>, columns: Array<Object>, search: string, tableName: string
}

export type actionButtons = {
    hideEditBtn?: Boolean, hideDeleteBtn?: Boolean, targetRoute: string,
    buyBtn?: Boolean, hideActionCol?: Boolean, paidBtn?: Boolean, returnBtn?: Boolean,
}



const Datatable = (props: Props & actionButtons) => {

    const router = useRouter();


    // create columns for table
    const dynamicColumns = props.columns.length > 0 ? props.columns.map((col: any, i) => {
        return <Column key={col.header} {...col} sortable={i === 0 && true} style={{ flexGrow: 1, flexBasis: '100px' }} />
    }) : null

    const [filters, setFilters] = useState({
        [props.search]: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });

    const [first, setFirst] = useState(0);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [sellingModal, setSellingModal] = React.useState(false);
    const [singleProduct, setSingleProduct] = React.useState(Object);


    const onGlobalFilterChange = (e: any) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters[props.search].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    }

    const openModal = (productData: Object) => {
        setSellingModal(true);
        setSingleProduct(productData)
    }




    const refreshTable = () => {
        router.replace(router.asPath);
    }

    const renderHeader = () => {
        return (
            <div className="flex justify-between items-center">
                <h5 className="m-0 text-2xl text-white">{props.tableName}</h5>
                <div className='flex gap-2'>
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                    </span>
                    <Button label='Refresh' onClick={refreshTable} />
                </div>
            </div>
        )
    }


    return (
        <>
            <SellingModal products={props.data} modalVisible={{ sellingModal, setSellingModal }}
                singleProduct={singleProduct} />

            <DataTable className='data-table' scrollable paginator rows={10} first={first} onPage={(e) => setFirst(e.first)} rowsPerPageOptions={[10, 25, 50]}
                value={props.data} header={renderHeader} scrollDirection="vertical"
                filters={filters} >
                {dynamicColumns}
                {!props.hideActionCol && <Column body={(rowData) => <ActionButtons rowData={rowData} prevProps={props} modal={openModal} />}
                    header={'Action'} frozen={true} style={{ flexGrow: 1, flexBasis: '100px' }} />}
            </DataTable>
        </>

    )
}

export default Datatable