
import { gql } from '@apollo/client'

export const SAVE_EXPENSE = gql`
    mutation saveExpense($expense: ExpenseInput!) {
        saveExpense(expense: $expense) { 
            _id
            name
            desc
            spender
            amount
            modifier
            createdAt
            updatedAt
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
        }
    }
`
export const DELETE_EXPENSE = gql`
    mutation deleteExpense( $id: String!) {
        deleteExpense(id: $id) {
            _id
        }
    }
`
