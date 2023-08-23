
import { gql } from '@apollo/client'

export const SAVE_STOCK = gql`
    mutation saveProduct($product: ProductInput!) {
        saveProduct(product: $product) { 
            _id
            name
            description
            category
            subCategory
            costPrice
            sellingPrice
            instock
            stockImage
            owner
            warningCount
            expiry
            expiryWarning
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
export const SHARE_PRODUCT = gql`
    mutation sharePrduct($q: Int, $addId: String, $subId: String ) {
        shareProduct(q: $q, addId: $addId, subId: $subId) {
            _id
            name
            description
            category
            subCategory
            costPrice
            sellingPrice
            instock
            stockImage
            owner
            warningCount
            expiry
            expiryWarning
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

export const DELETE_STOCK = gql`
    mutation deleteProduct( $id: String!) {
        deleteProduct(id: $id) {
            _id
            name
            description
            category
            subCategory
            costPrice
            sellingPrice
            instock
            stockImage
            owner
            createdAt
            updatedAt
        }
    }
`
