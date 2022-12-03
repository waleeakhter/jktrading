import { Toast } from 'primereact/toast'
const toastMessage = (type: any, heading: string, message: string, ref: any) => {
    ref.current !== null ?
        ref.current.show({ life: 5000, severity: type || "", summary: heading, detail: message })
        : null
}

export default toastMessage;