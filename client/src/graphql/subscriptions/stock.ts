import {gql} from '@apollo/client';

export const STOCKS_SUBS = gql`
  subscription stock {
    stock {
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
`;
