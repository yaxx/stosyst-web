import { gql } from '@apollo/client'

export const CLEAR_NOTIFICATIONS = gql`
    mutation clearNotifications( $page: String!) {
        clearNotifications(page: $page) {
            cleared
        }
    }
`