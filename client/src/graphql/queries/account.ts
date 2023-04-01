
import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { SaveInfo } from '../mutations/account';

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





