
import { gql } from '@apollo/client'

export const GET_SUMMARY = gql`
    query summary($groupBy: String) {
        summary(groupBy: $groupBy) {
            _id {
                x
                y
                z
            }
            sales
            expenses
            profit
        }
    }
`
