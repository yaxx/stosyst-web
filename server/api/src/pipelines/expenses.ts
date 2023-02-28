import { expenseCriteria } from "./groupers"
import { getSorter } from "./sorter"

export const getExpensePipeline = (clientId: string, query: string, group:string, offset: number)=> {

    return query.trim().length > 0 ? 
    [
        {      
            $search: {
                index: 'expenses',
                text: {
                    query,
                    fuzzy: {
                        maxEdits: 2,
                    },
                    path: ['name', 'desc', 'spender']
                }
            }
        },
        {
            $match: { modifier: clientId }
        },
        {
            $group: expenseCriteria(group)
        },
        {
            $sort: getSorter(group)
        },
        { 
            $skip: offset
        },
        {
            $limit: 20 
        }
    ]
    :
    [
        {
            $match: { modifier: clientId}
        },
        {
            $group: expenseCriteria(group)
        },
        {
            $sort: getSorter(group)
        },
        { 
            $skip: offset
        },
        {
            $limit: 20 
        }
    ]
    
}