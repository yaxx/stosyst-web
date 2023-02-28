import { gql } from "@apollo/client";
export const INVOICE_SUBS= gql`
  subscription onCheckOut($org: String, $usr: String) {
    invoice(org: $org, usr: $usr)  {
        _id
        tid
        stocks {
            _id
            item {
                _id
                name
                description
                category
                costPrice
                sellingPrice
                stockImage
            }
            quantity
            paid
        }
        modifier
        customer {
            firstName
            lastName
            phone
            email
            address
        }
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
`;