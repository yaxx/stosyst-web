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
    : filter === 'cash' ?
    [
        {
            $match: { modifier, paymentMethod: 'Cash' }
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
    : filter === 'pos' ?
    [
        {
            $match: { modifier, paymentMethod: 'POS' }
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
    : filter === 'transfer' ?
    [
        {
            $match: { modifier, paymentMethod: 'Transfer' }
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