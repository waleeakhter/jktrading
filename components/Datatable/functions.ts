import router from "next/router";
import API from "../../utils/axios";

// disable btn function
export const disabledBtns = (_btn: HTMLButtonElement, check: boolean) => {
    _btn.disabled = check;
    let nextSibling = _btn.nextElementSibling;
    let prevSibling = _btn.previousElementSibling;
    while (nextSibling) {
        (nextSibling as HTMLButtonElement).disabled = check;
        nextSibling = nextSibling.nextElementSibling;
    }
    while (prevSibling) {
        (prevSibling as HTMLButtonElement).disabled = check;
        prevSibling = prevSibling.previousElementSibling;
    }
}


//  update order status 
export const updateOrder = (e: React.SyntheticEvent, data: { _id: String }, toast: Function) => {
    const btn = (e.target as HTMLButtonElement)
    disabledBtns(btn, true);
    API.patch('orders/update', { _id: data._id, status: 'paid' }).then(res => {
        router.replace(router.asPath);
        res.data.successMessage && toast("success", "Paid", res.data.successMessage)
        console.log(res)
    }).catch(err => {
        disabledBtns(btn, false);
        err.data.errorMessage && toast("success", "Error", err.data.errorMessage)
        console.log(err)
    })
}


// cancel order 

export const cancelOrder = (e: React.SyntheticEvent, data: { status?: string }, toast: Function) => {
    const btn = (e.target as HTMLButtonElement)
    disabledBtns(btn, true);
    Object.assign(data, { delete: true })
    delete data['status'];
    API.post('orders/update', data).then(res => {
        res.data.successMessage && toast("success", "Removed", res.data.successMessage)
        router.replace(router.asPath);

    }).catch(err => {
        disabledBtns(btn, false);
        err.data.errorMessage && toast("success", "Error", err.data.errorMessage)
        console.log(err)
    })
}