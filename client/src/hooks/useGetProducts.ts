
import { gql, useQuery, useLazyQuery} from '@apollo/client'

 export const GetProducts = gql`
    query getProducts($orderBy: String, $offset: Int) {
        products(orderBy: $orderBy, offset: $offset) {
            _id
            name
            description
            category
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

export const GET_LOCAL_STATE = gql`
  query GetLocalState {
    localState @client 
  }
`



export const useGetLocals = () => {
  const { data, error } = useQuery(GET_LOCAL_STATE)
  return { 
      localData: data, 
      issues: error
    }
}

export const useRetryGetProducts = (orderBy: any, offset: number) => {
const [retryGetProducts, { loading, data, error }] = useLazyQuery(GetProducts, { variables: {orderBy, offset} })
  return { 
      prods: data?.products,
      retrying: loading, 
      err: error,
      retryGetProducts
    }
}

export const SAVE_PRODUCT = gql`
    query WriteProduct($id: Int!) {
      products(id: $id) {
        _id
        name
        description
        category
        costPrice
        sellingPrice
        instock
        stockImage
        owner
        createdAt
        updatedAt
      }
    }`

export const updateProductsCache = (cache: any, id: string, newProduct: any, existingProducts?: any) => {
  console.log(cache)
  return !id ?
  cache.writeQuery({
    query: GetProducts,
    variables: {
      orderBy: '',
      offset: 0,
    },
    data: {
      products: [newProduct, ...existingProducts],
    },
  })
  : 
  cache.writeQuery({
      query: SAVE_PRODUCT,
      variables: {
        id: newProduct._id,
      },
      data: {
        products: {
          ...newProduct,
          __typename: "Product"
        },
      },
  });
}