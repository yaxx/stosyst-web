import { makeVar } from '@apollo/client'
import { PRODUCTS } from '../constants'
import { Expense, Product, LocalState, FeedbackMsg, Invoice, Client, Person, Staff } from '../types/model'

export let initProduct: Product = {
    _id: '',
    name: '',
    description: '',
    category: '',
    sellingPrice: 0,
    costPrice: 0,
    instock: 0,
    warningCount: 0,
    expiry: '',
    expiryWarning: 0,
    stockImage: 'd063578d-733d-4aca-8809-e18368d55184',
}
let defCustomer: Person = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phone: ''
}
export let initExpense: Expense = {
    _id: '',
    name: '',
    desc: '',
    spender: '',
    amount: 1,
    modifier: '',
    seenBy: []
}
export let initStaff: Staff = {
    firstName: '',
    lastName: '',
    department: '',
    position: '',
    phone: '',
    email: '',
    address: '',
    permisions: {
        creates: ['stocks', 'invoices', 'expenses'],
        edits: ['stocks', 'invoices', 'expenses'],
        deletes: ['stocks', 'invoices', 'expenses']
    },
    dp: 'a35f9e5f-771c-4afd-b4b7-0869842c8dc9',
    banner: 'd063578d-733d-4aca-8809-e18368d55184',
}
export let initAccount: Client = {
    name: '',
    category: '',
    password: '',
    phone: '',
    dp: 'a35f9e5f-771c-4afd-b4b7-0869842c8dc9',
    banner: 'd063578d-733d-4aca-8809-e18368d55184',
}
export let initInvoice: Invoice = {
    stocks: [],
    seenBy: [],
    recieved: 0,
    payable: 0,
    completed: true,
    modifier: '',
    customer: defCustomer,
}
export const initFeedback: FeedbackMsg = {
    success: true,
    msg: '',
    done: false
}
export let defState: LocalState = {
    page: '',
    scope: '',
    selectedId: '',
    app_menu: false,
    cartOpened: false,
    staff: initStaff,
    invoice: initInvoice,
    invoiceId: '',
    notification: {
        opened: false,
        visible: false,
        type: '',
    },
    isEditing: false,
    account: initAccount,
    selectedType: PRODUCTS,
    msgToken: '',
    feedback: initFeedback,
}

export const locals = makeVar(defState);
export const headerMenu = makeVar('');
export const invMenu = makeVar('');
export const groupingCriteria = makeVar({
    query: '',
    order: '',
    filter: '',
    group: 'name',
});
export const expenseCriteria = makeVar({
    query: '',
    group: 'date',
});
export const invCriteria = makeVar({
    query: '',
    filter: '',
    group: 'date',
});
