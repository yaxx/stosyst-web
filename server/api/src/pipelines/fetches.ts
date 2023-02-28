// import { groupByDate, productsCriteria, sortOrder } from "./groupers"

// export const getFetchPipeline = (ownerId: string, offset: number, groupBy:string, filterBy: string, query: string, orderBy?:string)=> {

//     return query.trim().length > 0 ? 
//     [
//         {      
//             $search: {
//                 index: 'products',
//                 text: {
//                     query,
//                     fuzzy: {
//                         maxEdits: 2,
//                     },
//                     path: ['name', 'category', 'description']
//                 }
//             }
//         },
//         {
//             $match: { owner: ownerId }
//         },
//         {
//             $group: productsCriteria(groupBy)
//         },
//         {
//             $sort: { _id: 1 }
//         },
//         { 
//             $skip: offset
//         },
//         {
//             $limit: 20 
//         }
//     ]
//     :
//     filterBy ? 
//     [
//         {
//             $match: filterBy === 'out_of_stock' ? 
//             {
//                 owner: ownerId, 
//                 instock: {$lte: 0}
//             }
//             :  filterBy === 'low_stocks' ?
//             {
//                 $and: [
//                     {owner: ownerId},
//                     { instock: {$gt: 0}},
//                     {$expr:{$lte:["$instock", "$warningCount"]}}
//                 ]
//             }
//             : filterBy === 'expired' ?
//             {
//                 owner: ownerId,
//                 expiry: {$lte : new Date()}
//             }
//             :
//             {}
//         },
//         {
//             $group: productsCriteria(groupBy)
//         },
//         {
//             $sort: { _id: 1 }
//         },
//         { 
//             $skip: offset
//         },
//         {
//             $limit: 20 
//         }
//     ]
//     :
//     [
//         {
//             $match: { owner: ownerId }
//         },
//         {
//             $group: productsCriteria(groupBy)
//         },
//         {
//             $sort: { _id: 1 }
//         },
//         { 
//             $skip: offset
//         },
//         {
//             $limit: 20 
//         }
//     ]
    
// }

// export const getFilterPipeline = (ownerId: string, filter: String, groupBy:string, orderBy?:string)=> {

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
//             $group: productsCriteria(groupBy)
//         },
//         {
//             $sort: { _id: 1 }
//         },
//     ]
// }

// export const expensePipeline = (ownerId: string, query:string, groupBy: string, offset: number)=>[
//     {
//         $match: { modifier: ownerId }
//     },
//     {
//         $group: productsCriteria
//     },
//     {
//         $sort: sortOrder
//     },
//     { 
//         $skip: offset
//     },
//     {
//         $limit: 20
//     }
// ]

    
