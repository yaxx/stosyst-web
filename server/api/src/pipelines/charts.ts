
 export const getchartHeader = (clientId: string)=> {
    return [
        {
            $match: { owner: clientId }
        },
        {
            $group: {
                _id: null,
                stocksCount: {$sum: "$instock"},
                uniqueStocks: { $sum: 1 },
                totalAmount: {$sum:{$multiply:["$sellingPrice", "$instock"]}}
            }
        }
    ]
}
 export const getHeaderCategories = (clientId: string)=> {
    return [
        {
            $match: { owner: clientId }
        },
        {
            $group: {
                _id: "$category",
                categories: { $sum: 1 },
            }
        },
        {
            $group: {
                _id: null,
                count: {$count: {}}
            }
        }
    ]
}
 export const getLowStocksPipeline = (clientId: string)=> {
    return [
        {
           $match: {
            $and: [
                {owner: clientId},
                { instock: {$gt: 0}},
                {$expr:{$lte:["$instock", "$warningCount"]}}
            ]
           } 
        }
    ]
}
 export const getOutOfStocksPipeline = (clientId: string)=> {
    return [
        {
           $match: {
                owner: clientId, 
                instock: {$lte: 0}
           } 
        }
    ]
}
 export const getExpiringPipeline = (clientId: string)=> {
    return [
         {
            $match: {
                $and: [
                    {owner: clientId},
                    {expiry: {$ne: null}},
                    {expiryWarning: {$gt: 0}}
                ]
            },
        },
         {
            $addFields: {
               yrDiff:{
                    $dateDiff:{
                        startDate: new Date(),
                        endDate: "$expiry",
                        unit: "year"
                    }
                },
                mnDiff:{
                    $dateDiff:{
                        startDate: new Date(),
                        endDate: "$expiry",
                        unit: "month"
                    }
                }
            }
        },
        {
            $match: {
                $and: [
                    {yrDiff: 0},
                    { mnDiff:{ $gt: 0}},
                    { $expr:{ $lte:["$mnDiff","$expiryWarning"]}},
                ]
            }
        },
    ]
}
 export const getExpiredPipeline = (clientId: string)=> {
    return [
         {
            $match: {
               $and:[
                {
                    owner: clientId,
                    expiry: {$lte : new Date()}
                }
                ] 
            }
        },
    ]
}
 export const getTotalSalesPipeline = (clientId: string, duration: string)=> {
    return [
        {
            $match: {modifier: clientId}
        }, 
        {
            $set: {
                diff: {
                    $dateDiff: {
                        startDate: '$createdAt',
                        endDate: new Date(),
                        unit: duration === 'Weekly' ? 'day' : duration === 'Monthly' ?  'month' : 'year'
                    }
                },
                steps: duration === 'Weekly' ? 
                {
                    $dayOfWeek: '$createdAt'
                }
                : duration === 'Monthly' ? 
                {
                    $month: '$createdAt'
                }
                :
                {
                    $year: '$createdAt'
                }
            }
        }, 
        {
            $match: {diff: duration === 'Weekly' ? {$lt: 7} : duration === 'Monthly' ? {$lt: 12} : {$lte: 10}} 
        }, 
        {
            $unwind: { path: '$stocks'}
        },          
        {
            $group: {
                _id: "$diff",
                totalSales: {
                    $sum: {
                        $multiply: [
                            '$stocks.quantity',
                            '$stocks.item.sellingPrice'
                        ]
                    }
                }
            }
        }, 
        {
            $sort: {_id: 1}
        }
    ]
}
 export const getTotalExpPipeline = (clientId: string, duration: string)=> {
    return [
        {
            $match: {modifier: clientId}
        }, 
        {
            $set: {
                diff: {
                    $dateDiff: {
                        startDate: '$createdAt',
                        endDate: new Date(),
                        unit: duration === 'Weekly' ? 'day' : duration === 'Monthly' ?  'month' : 'year'
                    }
                },
                steps: duration === 'Weekly' ? 
                {
                    $dayOfWeek: '$createdAt'
                }
                    : duration === 'Monthly' ? 
                {
                    $month: '$createdAt'
                }
                    :
                {
                    $year: '$createdAt'
                }
            }
        }, 
        {
            $match: {diff: duration === 'Weekly' ? {$lt: 7} : duration === 'Monthly' ? {$lt: 12} : {$lte: 10}} 
        },          
        {
            $group: {
                _id: "$diff",
                totalExpenses: {
                    $sum: '$amount'
                }
            }
        }, 
        {
            $sort: {_id: 1}
        }
    ]
}
 export const getTrendsPipeline = (clientId: string,  duration: string , item?: string)=> {
    console.log(item)
    return [
        {
            $match: {modifier: clientId}
        }, 
        {
            $set: {
                daysDiff: {
                    $dateDiff: {
                        startDate: '$createdAt',
                        endDate: new Date(),
                        unit: 'day'
                    }
                },
                dayOfWeek: duration === 'week' ? 
                {
                    $dayOfWeek: '$createdAt'
                } 
                : 
                {
                    $dayOfMonth: '$createdAt'
                }
            }
        }, 
        {
            $match: duration === 'week' ? {daysDiff: {$lt: 7}} : duration === 'month' ? {daysDiff: {$lt: 31}} : {daysDiff: {$lt: 365}}
        },
        {
            $unwind: {
                path: "$stocks"
            }
        },        
        {
            $group: {
                _id: item === 'stocks' ? "$stocks.item.name" : item === 'categories' ? "$stocks.item.category" : "$added.firstName",
                items: {
                    $push: "$$ROOT"
                },
                totalSalesCount: item ? 
                {$sum: 1} 
                :   
                {
                    $sum: {
                        $multiply: [
                            '$stocks.quantity',
                            '$stocks.item.sellingPrice'
                        ]
                    }
            
                }
            }
        },
        {
            $sort: {totalSalesCount: -1}
        },
        {
            $limit: 10
        }
    ]
}