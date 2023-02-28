import { gql } from '@apollo/client'

export const NOTIFICATIONS = gql`
    query getNotifications($page: String, $offset: Int) {
        notifications(page: $page, offset: $offset ) {
            invoices {
                records {
                    _id
                    tid
                    stocks {
                        _id
                        item {
                            _id
                            name
                            description
                            category
                            costPrice
                            sellingPrice
                            stockImage
                        }
                        quantity
                        amountPaid
                    }
                    modifier
                    customer {
                        firstName
                        lastName
                        phone
                        email
                        address
                    }
                    seenBy
                    createdAt
                    updatedAt
                }
            }
            expenses {
                records {
                    _id
                    desc
                    name
                    amount
                    spender
                    modifier
                    createdAt
                    updatedAt
                }
            }
            unreadInvoices
            unreadExpenses
        }
    }
`