import { PipelineStage } from "mongoose";
import { getStocksFilter } from "./filters/stocks";
import { productsCriteria, sortOrder } from "./groupers"
import { getSorter } from "./sorter"

 export const getProductsPipeline = (ownerId: string, query: string, offset: number, group:string, filter: string ): any => {

    return query.trim().length > 0 ? 
    [
        {      
            $search: {
                index: 'products',
                text: {
                    query,
                    fuzzy: {
                        maxEdits: 2,
                    },
                    path: ['name', 'category', 'description']
                }
            }
        },
        {
            $match: { owner: ownerId }
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
            $limit:10
        }
    ]
    :
    filter ? getStocksFilter(ownerId, filter, group, offset )
    :
    [
        {
            $match: { owner: ownerId }
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
            $limit: 10
        }
    ]
}

// export const getProductFilter = (ownerId: string, filter: String, group:string, orderBy?:string)=> {

//     return [
//         {
//             $match: filter === 'out_of_stock' ? 
//             {
//                 owner: ownerId, 
//                 instock: {$lte: 0}
//             }
//             :  filter === 'low_stocks' ?
//             {
//                 owner: ownerId, 
//                 $expr:{$lte:["$instock", "$warningCount"]}
//             }
//             : filter === 'expired' ?
//             {
//                 owner: ownerId,
//                 expiry: {$lte : new Date()}
//             }
//             :
//             {}
//         },
//         {
//             $group: productsCriteria(group)
//         },
//         {
//             $sort: { _id: 1 }
//         },
//     ]
// }

