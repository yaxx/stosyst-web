
import { gql } from '@apollo/client'

export const GET_ACCOUNT = gql`
    query account {
        account {
            _id
            name
            email
            phone
            address
            category
            dp
            banner
            username
            createdAt
        }
    }
`
export const SWITCH_ACCOUNT = gql`
    query switchAccount($id: String) {
        switchAccount(id: $id) {
            token
            client {
                _id
                dp
                name
                username
                category
                linkedTo {
                    _id
                    dp
                    name
                    username 
                    address
                }
            }
        }
    }
`
export const GET_ACC_DETAILS = gql`
    query accDetails {
        accDetails {
            timeLine {
                renewed
                due
                status
            }
            paymentMethods {
                cardNumber
                expiry
                cvvCode
            }
           linkedTo {
                _id
                dp
                name
                username
                address
                phone
           }
           createdAt
        }
    }
`
export const GET_STAFF = gql`
    query staff($id: String) {
        staff(id: $id) {
            _id
            dp
            banner
            phone
            email
            address
            password
            position
            firstName
            createdAt
            department
        }
    }
`
export const GET_ALL_STAFFS = gql`
    query staffs {
        staffs {
            _id
            dp
            banner
            phone
            email
            address
            password
            position
            firstName
            createdAt
            department
            permisions {
                creates
                edits 
                deletes
            }
        }
    }
`





