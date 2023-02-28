import { groupInvoice } from "../groupers"
import { getSorter } from "../sorter"

export const getInvoiceFilter = ( modifier: string, filter: string, group: string, offset: number) => {

    return filter === 'pendings' ? 
    [
        {
            $match: { modifier, completed: false }
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
            $limit: 10
        }
    ]
    :
    [
        {
            $match: { modifier}
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
            $limit: 10
        }
    ]
}