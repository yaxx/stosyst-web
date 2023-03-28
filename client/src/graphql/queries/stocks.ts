
import { gql, useLazyQuery } from '@apollo/client'

 export const GET_STOCKS = gql`
    query getProducts($query: String, $filter: String, $group: String, $offset: Int) {
        products(query: $query, filter: $filter, group: $group, offset: $offset) {
            _id
            records {
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
            count
            total
        }
}`
 export const GET_STOCK_SET = gql`
    query getStockSet($query: String, $filter: String, $offset: Int, $group: String, $groupLabel: String) {
        stockSet(query: $query, filter: $filter, offset: $offset, group: $group, groupLabel: $groupLabel) {
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
}`


export const FILTER_STOCKS = gql`
    query filterStocks($filter: String, $orderBy: String, $group: String) {
        filterStocks(filter: $filter, orderBy: $orderBy, group: $group) {
            _id
            records {
                _id
                name
                description
                category
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
    }
`
export const SEARCH_STOCKS = gql`
    query searchProducts($query: String, $orderBy: String, $group: String) {
        searchProducts(query: $query, orderBy: $orderBy, group: $group,) {
            _id
            records {
                _id
                name
                description
                category
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
            count
            total
        }
    }
`
 export const GET_PRODS = gql`
    query getProducts {
        products {
            _id
            records {
                _id
                name
                description
                category
                costPrice
                sellingPrice
                instock
                stockImage
                owner
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
 export const WriteProduct = gql`
    query writeProduct($id: String) {
           product(id: $id) {
             _id
            name
            description
            category
            costPrice
            sellingPrice
            instock
            stockImage
            owner
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



export const useRetryGetProducts = (orderBy: any, offset: number) => {
    const [retryGetProducts, { loading, data, error }] = useLazyQuery(GET_STOCKS, { variables: { orderBy, offset } })
    return {
        prods: data?.products,
        retrying: loading,
        err: error,
        retryGetProducts
    }
}

export const STOCK_QUERY = gql`
    query WriteProduct($id: Int!) {
      product(id: $id) {
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
    }`


