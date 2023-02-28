import { gql } from '@apollo/client'

 export const GET_CHART_HEADER = gql`
    query ChartHeader {
        chartHeader {
            stocksCount
            uniqueStocks
            categories
            totalAmount
    }
}`
 export const GET_CHART_FOOTER = gql`
    query ChartFooter {
        chartFooter {
            expired
            expiring
            outOfStocks
            lowStocksCount
       }
    }
`
 export const GET_SALES_EXPENSES = gql`
    query SalesExpenses($duration: String) {
        salesExpenses(duration: $duration) {
            sales {
                _id
                totalSales
            }
            expenses {
                _id
                totalExpenses
            }
        }
    }
`

export const GET_TRENDS = gql`
    query getTrends($item: String, $duration: String) {
        trends(duration: $duration, item: $item) {
            _id
            items {
                stocks {
                    item {
                        name
                        description
                        category
                        sellingPrice
                        stockImage
                    }
                    quantity
                }
            }
            totalSalesCount
        }
    }
`