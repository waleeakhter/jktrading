
import { Badge } from 'primereact/badge';
const columns = [
    { field: 'shop_id.shop_name', header: 'Shop Name' },
    { field: 'product_id.product_name', header: 'Product Name' },
    { field: 'sell_quantity', header: 'Quantity' },
    { body: (rowData: { discount: number }) => rowData.discount + "€", header: 'Discount' },
    { body: (rowData: { total_discount: number }) => rowData.total_discount + "€", header: 'Total Discount' },
    { body: (rowData: { sub_total: number }) => rowData.sub_total + "€", header: 'Sub Total' },
    { body: (rowData: { total_amount: number }) => rowData.total_amount + "€", header: 'Total Amount' },
    { body: (rowData: { status: string }) => <Badge value={rowData.status} severity={rowData.status === "paid" ? "success" : "danger"} />, header: 'Status' },

]

export default columns