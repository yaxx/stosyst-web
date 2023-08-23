import { makeVar } from "@apollo/client";
import { EXPENSES, INVOICES, PRODUCTS } from "../constants";
import { initProduct } from "../store/data";

export interface PermittedActions {
    creates: string[],
    edits: string[],
    deletes: string[]
}
export interface Person {
    _id?: string,
    isAdmin?: boolean,
    firstName?: string,
    lastName?: string,
    dp?: string,
    banner?: string,
    email?: string,
    phone?: string,
    address?: string,
    createdAt?: Date,
    updatedAt?: Date
}
export interface Staff extends Person {
    password?: string,
    department?: string,
    position?: string,
    permisions: PermittedActions
}

type TimeLine = {
    due: String
    renewed: String
    status: String
}
type PaymentMethod = {
    cardNumber: String
    expiry: String
    cvvCode: String
}
export interface Client extends Person {
    name?: string,
    password?: string,
    username?: string,
    category?: string,
    staffs?: Staff[]
    linkedTo?: Client[]
    msgTokens?: string[]
    timeLine?: TimeLine
    paymentMethods?: [PaymentMethod]
}
export interface Item {
    name: string,
    description?: string,
    owner?: string,
    stockImage?: string,
    added?: Person,
    modified?: Person,
    createdAt?: Date,
    updatedAt?: Date,
    _id?: string
}

export interface Product extends Item {
    instock: number | null,
    costPrice: number
    sellingPrice: number,
    category?: string,
    subCategory: string
    stockImage?: string,
    warningCount: number,
    expiry: string,
    expiryWarning: number | null,
    __typename?: string
}

export interface CartItem {
    item: Product,
    quantity: number,
    booked: boolean,
    delivered: number,
    _id?: string
}
export interface Invoice {
    stocks: CartItem[],
    customer: Person,
    completed: boolean,
    recieved: number,
    paymentMethod: string,
    modifier?: string,
    added?: Person,
    payable?: number,
    modified?: Person,
    seenBy?: string[],
    _id?: string,
    tid?: string,

    createdAt?: Date,
    updatedAt?: Date
}

export interface Expense {
    name: string,
    desc: string,
    spender: string,
    amount: number,
    modifier: string,
    added?: Person,
    modified?: Person,
    seenBy?: string[],
    createdAt?: Date,
    updatedAt?: Date,
    _id?: string
}

export interface FeedbackMsg {
    success: boolean,
    done: boolean,
    msg: String
}

export type LocalState = {
    page: string,
    scope: string,
    app_menu: boolean,
    staff: Staff,
    feedback: FeedbackMsg,
    invoice: Invoice,
    cartOpened: boolean,
    isEditing: boolean,
    selectedId: string,
    invoiceId: string,
    notification: {
        opened: boolean,
        type: string,
        visible: boolean,
    },
    account: Client,
    hidenModal: boolean,
    msgToken: String,
    selectedType: PRODUCTS | INVOICES | EXPENSES
}


export const review = makeVar(false);
export const print = makeVar(false);

export const matchedProds = makeVar([]) as any;
export const selectedIndex = makeVar(0) as any;
