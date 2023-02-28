import { gql } from "@apollo/client";

export const EXPENSE_SUBS = gql`
  subscription expense($org: String, $usr: String) {
    expense(org: $org, usr: $usr) {
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
`;


