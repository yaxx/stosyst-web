import { gql } from '@apollo/client'

export const SignUp = gql`
    mutation signUp($info: ClientInfo!) {
        signUp(info: $info) { 
            token
            dp
            org
            usr
            name
            username
            category
        }
    }
`

export const ADD_ACCOUNT = gql`
    mutation addAccount($input: AddAccInput!) {
        addAccount(input: $input) {
            _id
            dp
            name
            username
            address
        }
    }
`
export const UPDATE_ACCOUNT = gql`
    mutation updateAccount($input: AccInput!) {
        updateAccount(input: $input) {
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
export const SignIn = gql`
    mutation signIn($creds: Creds!) {
        signIn(creds: $creds) {
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
export const DeleteProduct = gql`
    mutation deleteProduct( $id: String!) {
        deleteProduct(id: $id) {
            _id
        }
    }
`
export const SaveInfo = gql`
    mutation saveInfo($staff: PersonInput!) {
        saveInfo(staff: $staff) { 
            _id
            firstName
            lastName
            position
            department
            phone
            email
            address
            dp
            banner
            password
            permisions {
                creates
                edits 
                deletes 
            }
            createdAt
            updatedAt
        }
    }
`
export const DELETE_STAFF = gql`
    mutation deleteStaff($id: String!) {
        deleteStaff(id: $id) {
            id
        }
    }
`
