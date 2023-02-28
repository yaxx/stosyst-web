// import { groupByDate, sortOrder } from "./groupers";

// export const getSearchQuery = (query: string, ownerId: string, orderBy: string, groupBy: string) => 
// [
//     {      
//         $search: {
//             index: 'products',
//             text: {
//                 query,
//                 fuzzy: {
//                     maxEdits: 2,
//                 },
//                 path: ['name', 'category', 'description']
//             }
//         }
//     },
//     {
//         $match: { owner: ownerId }
//     },
//     {
//         $group: getGroupOrder(groupBy)
//     },
//     {
//         $sort: { _id: 1 }
//     },
// ]

// export const expenseSearch = (query: string, ownerId: string)=>[
//         {   
//           $search: {
//             text: {
//               query,
//               fuzzy: {
//                 maxEdits: 2,
//                 prefixLength: 3
//               },
//               path: ['name', 'desc', 'spender']
//             }, 
            
//           }
//         },
//         {
//           $match: { modifier: ownerId }
//         },
//         {
//           $group: groupByDate
//         },
//         {
//           $sort: sortOrder
//         }
//       ]