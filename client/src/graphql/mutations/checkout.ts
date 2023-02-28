import { gql } from '@apollo/client'

export const CheckOut = gql`
    mutation checkOut($invoice: InvoiceInput!) {
        checkOut(invoice: $invoice) {
            _id
            stocks {
                _id
                item {
                    _id
                    name
                    description
                    category
                    sellingPrice
                    costPrice 
                }
                booked
                delivered
                quantity
            }
            customer {
                firstName
                lastName
                phone
                email
                address
            }
            tid
            modifier
            recieved
            completed
            payable
            added {
                    firstName
                    lastName
                    phone
                    email
                }
                modified {
                    firstName
                    lastName
                    phone
                    email
                }
            createdAt
            updatedAt
        }
    }
`
export const DeleteInvoice = gql`
    mutation deleteInvoice( $refund: RefundInput!) {
        deleteInvoice(refund: $refund) {
            _id
            item {
                    _id
                    name
                    description
                    category
                    costPrice
                    sellingPrice
                    stockImage
                    added {
                        firstName
                        lastName
                        phone
                        email
                    }
                    modified {
                        firstName
                        lastName
                        phone
                        email
                        address
                    }
                }
                quantity
                delivered
        }
    }
`