import { getInvoiceFilter } from "./filters/invoice";
import { getStocksFilter } from "./filters/stocks";
import { groupInvoice, productsCriteria, sortOrder } from "./groupers"
import { getSorter } from "./sorter"

 export const getInvoicePipeline = (modifier: string, query: string, filter: string,  group:string, offset: number): any => {

    return query.trim().length > 0 ? 
    [
        {
          $search: {
            text: {
              query,
              fuzzy: {
                maxEdits: 2,
              },
              path: [
                'customer.phone',
                'customer.firstName',
                'stocks.item.name',
                'stocks.item.category',
                'stocks.item.description'
              ]
            }
          }
        },
        {
            $match: { modifier }
        },
        {
            $group: productsCriteria(group)
        },
        {
            $sort: getSorter(group)
        },
        { 
            $skip: offset
        },
        {
            $limit:3
        }
    ]
    :
    filter ? getInvoiceFilter(modifier, filter, group, offset )
    :
    [
        {
            $match: { modifier }
        },
        
        {
            $group: groupInvoice(group)
        },
        {
            $sort: getSorter(group)
        },
        { 
            $skip: offset
        },
        {
            $limit: 3
        }
    ]
}