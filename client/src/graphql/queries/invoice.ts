
import { gql } from '@apollo/client'

export const GET_INVOICES = gql`
    query getInvoices($query: String, $filter: String, $offset: Int, $group: String) {
        invoices(query: $query, filter: $filter, offset: $offset, group: $group) {
            _id
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
                         subCategory
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
                    booked
                    quantity
                    delivered
                }
                modifier
                customer {
                    firstName
                    lastName
                    phone
                    email
                    address
                }
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
                recieved
                payable
                completed
                paymentMethod
                createdAt
                updatedAt
            }
        }
    }
`
export const SearchInvoices = gql`
    query searchInvoices($query: String) {
        searchInvoices(query: $query) {
            _id {
                day
                month
                year
            }
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
                        stockImage,
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
                    booked
                    quantity
                    delivered
                }
                recieved
                payable
                modifier
                customer {
                    firstName
                    lastName
                    phone
                    email
                    address
                }
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
    }
`
 
