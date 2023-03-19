import { defState, initFeedback, initStaff, locals } from "../store/data";
import { CartItem, Invoice, print } from "../types/model";
export * from './cacheUpdates';

export { addPermision, removePermision, isAdmin, isMe } from "./permisions";

export const genId = () => Math.floor(Math.random() * (1000000000000 - 100000000000 + 1) + 100000000000).toString();
export const genPassword = () => Math.floor(Math.random() * (1000000 - 100000 + 1) + 100000).toString();

export const inDevelopment = process.env.NODE_ENV === 'development'

export const genTransId = () => {
    let m = new Date().toLocaleDateString().split('/')

    m[0] = m[0].length === 1 ? "0" + m[0] : m[0]
    m[1] = m[1].length === 1 ? "0" + m[1] : m[1]

    const d = m[1] + m[0] + m[2]
    const t = new Date().toLocaleTimeString().split(' ')[0].replaceAll(':', '')
    return d + t;
}
export const sortByPaid = (list: any[]) => {
    let n: any = []
    let m: any = []
    list.forEach((q: any) => {
        q.amountPaid < q.item.sellingPrice * q.quantity ? m.push(q) : n.push(q)
    })

    return [...n, ...m];
}

export const format_date = (date: any) => new Date(+date)
    .toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

export const formatTime = (date: any) => {
    const d = new Date(+date)
    const time = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).format(d)
    return time.toString().toLowerCase()
}
export const getCartTotal = (items: CartItem[]) => {
    return items.reduce((total: number, i: CartItem) =>
        total + i.item.sellingPrice * i.quantity
        , 0)
}
export const getNetInvoiceToatal = (invoiceGroup: any[]) => {
    return invoiceGroup.reduce((total: number, invoice: Invoice) => total + invoice.recieved, 0)
}

export const formatMoney = (money: any) => new Intl.NumberFormat('en-US').format(+money)

export const getSalesDiff = (prevInvoicesList: any, nextInvoiceList: any) => {
    return  (getNetInvoiceToatal(prevInvoicesList) > getNetInvoiceToatal(nextInvoiceList))
}

export const getNetExpenseToatal = (expenseGroup: any[]) => {
    let sum = 0;
    expenseGroup.forEach((expense: any) => {
        sum = sum + expense.amount
    })
    return sum.toFixed(2);
}

export const toggleModalCallback = () => {
    locals({
        ...locals(),
        page: ''
    })
}

export const closeModal = () => {
    if (locals().invoice.stocks.length) {
        locals({
            ...locals(),
            page: '',
            cartOpened: false
        })
    } else {
        locals(defState)
        // locals({
        //     ...locals(),
        //     isEditing: false,
        //     selectedId : '',
        //      page: '',
        // })

    }
}

export const openCart = () => {
    locals({
        ...locals(),
        page: 'stocks',
        cartOpened: true
    })
}
export const clearSelections = () => {
    locals(defState)
}

export const editCallback = (e: any, page: string, scope: string, item: any, action: any, isEditing: boolean = true) => {
    e.stopPropagation()
    locals({
        ...locals(),
        page,
        scope,
        isEditing,
        staff: item || initStaff,
        selectedId: (action) ? item?._id : ''
    })
}

export const showFeedback = (success: boolean, msg: string) => {
    locals({
        ...locals(),
        feedback: {
            ...locals().feedback,
            msg,
            success
        }
    })
    setTimeout(() => {
        locals({
            ...locals(),
            feedback: initFeedback
        })
        if (success) print(true)
    }, 2000);
}

const updateCache = (newInvoice: any) => {

    // console.log(newInvoice)

    // const cachedInvoices: any = client.readQuery({
    //     query: GetInvoices,
    //     variables: {
    //         orderBy:'',
    //         offset: 0
    //     }
    // })
    // console.log(cachedInvoices)

    // const newInvoices: any = cachedInvoices.invoices.map((i: any) => {
    //     return (i.records[0]._id === data.checkOut._id) ? data.checkOut : i
    // })
    // cache.writeQuery({
    //     query: GetInvoices,
    //     variables: {
    //         offset: 0
    //     },
    //     data: {
    //         invoices: newInvoices
    //     }
    // });

    // let invoices =  prevInvoices

    // console.log(prevInvoices);
    // console.log(newInvoice);



    // if(invoices.length) {
    //     if ((invoices[0].records[0]?._id === newInvoice._id)) {
    //         invoices = invoices.map((e: any, i: number) => {
    //             if (i === 0) {
    //                 return {
    //                     ...e,
    //                     records: [
    //                         {
    //                             ...newInvoice
    //                         },
    //                         ...e.records
    //                     ]
    //                 }
    //             }
    //             return e
    //         })
    //     } else {
    //         invoices = [
    //             {
    //                 records: [{
    //                     ...newInvoice,
    //                 }]
    //             },
    //             ...invoices
    //         ]
    //     }
    // } else {
    //     invoices = [
    //         {
    //             __typename: 'InvoiceGroup',
    //             records: [{
    //                 ...newInvoice
    //             }]
    //         },
    //         ...invoices
    //     ]
    // }
    // return invoices
}

export const updateExpenses = (prevExpenses: any[], newExpense: any) => {

    let expenses = prevExpenses;

    const isSameDay = () => format_date(expenses[0].records[0].createdAt) === format_date(newExpense.createdAt)

    if (expenses.length) {
        if (isSameDay()) {
            expenses = expenses.map((e: any, i: number) => {
                if (i === 0) {
                    return {
                        ...e,
                        records: [
                            {
                                ...newExpense
                            },
                            ...e.records
                        ]
                    }
                } else {
                    return e
                }
            })
        } else {
            expenses = [
                {
                    __typename: 'ExpenseGroup',
                    records: [{
                        ...newExpense,
                    }]
                },
                ...expenses
            ]
        }
    } else {
        expenses = [
            {
                __typename: 'ExpenseGroup',
                records: [{
                    ...newExpense,
                }]
            },
            ...expenses
        ]
    }
    return expenses
}

export const stripTypename = (object: any) => {
    const { __typename, ...sanitizedObject } = object
    return sanitizedObject
}
export const simplifyExpDate = (expiry: string) => {
    const yr = new Date(+expiry).getFullYear().toString().slice(-2)
    const mn = new Date(+expiry).getMonth() + 1

    const simpleDate = `${mn < 10 ? '0':''}${mn}/${yr}`

    return simpleDate
}
export const getExpStatus = ({ expiry, expiryWarning }: any) => {
    let status = null;

    if (expiry && expiryWarning) {
        const m1 = new Date().getMonth() + 1
        const m0 = new Date(+expiry).getMonth() + 1
        const y1 = +new Date().getFullYear().toString().slice(-2)
        const y0 = +new Date(+expiry).getFullYear().toString().slice(-2)

        if (y0 - y1 > 0) {
            status = 'active'
        } else if (y0 - y1 < 0) {
            status = 'expired'
        } else if (y0 - y1 === 0) {
            if (m0 - m1 <= 0) {
                status = 'expired'
            } else if (m0 - m1 > 0) {
                if (m0 - m1 <= +expiryWarning) {
                    status = 'weak'
                } else {
                    status = 'active'
                }
            }
        }
    } else if (expiry) {
        const m1 = new Date().getMonth() + 1
        const m0 = new Date(+expiry).getMonth() + 1
        const y1 = +new Date().getFullYear().toString().slice(-2)
        const y0 = +new Date(+expiry).getFullYear().toString().slice(-2)

        if (y0 - y1 > 0) {
            status = 'active'
        } else if (y0 - y1 < 0) {
            status = 'expired'
        } else if (y0 - y1 === 0) {
            if (m0 - m1 <= 0) {
                status = 'expired'
            } else {
                status = 'active'
            }
        }
    }
    return status
}