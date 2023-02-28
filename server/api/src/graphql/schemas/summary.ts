import { gql } from 'apollo-server-express';

export default gql`
    type DateRange {
        x: Int
        y: Int
        z: Int
    }
    type Summary {
        _id: DateRange
        sales: Float
        profit: Float
        expenses: Float
    }
    extend type Query {
        summary(groupBy: String): [Summary]!
    }

`