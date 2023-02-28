
import { gql, useQuery, useLazyQuery } from '@apollo/client'
import client from '../../apollo-client'
import { format_date } from '../../utils'

export const GET_EXPENSES = gql`
    query getExpenses($query: String, $group: String, $offset: Int) {
        expenses(query: $query group: $group, offset: $offset) {
            _id 
            records {
                _id
                desc
                name
                amount
                spender
                modifier
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
export const WriteExpense = gql`
    query writeExpense {
          _id {
                day
                month
                year
            }
            records {
                _id
                desc
                name
                amount
                spender
                modifier
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

export const SearchExpenses = gql`
    query searchExpenses($query: String) {
        searchExpenses(query: $query) {
            _id {
                day
                month
                year
            }
            records {
                _id
                desc
                name
                amount
                spender
                modifier
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


export const useRetryGetExpenses = (query: string, groupBy:string, offset: number) => {
    const [retryGetExpenses, { loading, data, error }] = useLazyQuery(GET_EXPENSES, { 
        variables: {
            query, 
            groupBy,
            offset
        } 
    })
    return { 
        retriedExpenses: data?.expenses,
        retrying: loading, 
        err: error,
        retryGetExpenses
    }
}

