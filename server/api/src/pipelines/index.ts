// export * from './fetches'
export * from './expenses'
export * from './products'
export * from './charts'


// export const summary_pipeline=(orgId: string, groupBy: string) => {
//     return [
//                 {
//                     $match: {
//                         modifier: orgId
//                     }
//                 }, 
//                 {
//                     $set: {
//                         stocks: {
//                             $filter: {
//                                 input: '$stocks', 
//                                 as: 'stock', 
//                                 cond: ['stock.paid', true]
//                             }
//                         }
//                     }
//                 },
//                 {
//                     $set: {
//                         stocks: {
//                             $map: {
//                                 input: '$stocks', 
//                                 as: 'stock', 
//                                 in: {
//                                     $mergeObjects: [
//                                         '$$stock', {
//                                             cost: {
//                                                 $multiply: [
//                                                     '$$stock.item.sellingPrice', '$$stock.quantity'
//                                                 ]
//                                             }, 
//                                             profit: {
//                                             $multiply: [
//                                                 {
//                                                     $subtract: [
//                                                         '$$stock.item.sellingPrice', '$$stock.item.costPrice'
//                                                     ]
//                                                 }, '$$stock.quantity'
//                                             ]}
//                                         }
//                                     ]
                                        
//                                 }
//                             }
//                         }
//                     }
//                 }, 
//                 {
//                     $unwind: {
//                         path: '$stocks'
//                     }
//                 }, 
//                 {
//                     $group: {
//                         _id: {
//                             x: {
//                                 $year: '$createdAt'
//                             }, 
//                             y: groupBy === 'Daily' ? {$month: '$createdAt'} : {$year: '$createdAt'}, 
//                             z: groupBy === 'Daily' ? {$dayOfMonth: '$createdAt'} : groupBy === 'Weekly' ? {$week: '$createdAt'} : {$month: '$createdAt'}
//                         }, 
//                         sales: {
//                             $sum: '$stocks.cost'
//                         }, 
//                         profit: {
//                             $sum: '$stocks.profit'
//                         }
//                     }
//                 }, 
//                 {
//                     $sort: {
//                         '_id.z': -1
//                     }
//                 },
//         ]
// }
// export const expense_pipeline=(orgId: string, groupBy: string) => {
//     return [
//                 {
//                     $match: {
//                         modifier: orgId
//                     }
//                 }, 
//                 {
//                     $group: {
//                         _id: {
//                             x: {
//                                 $year: '$createdAt'
//                             }, 
//                             y: groupBy === 'Daily' ? {$month: '$createdAt'} : {$year: '$createdAt'}, 
//                             z: groupBy === 'Daily' ? {$dayOfMonth: '$createdAt'} : groupBy === 'Weekly' ? {$week: '$createdAt'} : {$month: '$createdAt'}
//                         }, 
//                         expenses: {
//                             $sum: '$amount'
//                         }, 
//                     }
//                 }, 
//                 {
//                     $sort: {
//                         '_id.z': -1
//                     }
//                 },
//         ]
// }