import { productsCriteria } from "../groupers"
import { getSorter } from "../sorter"

export const getStocksFilter = ( id: string, filter: string, group: string, offset: number) => {
    console.log(filter);
    return filter === 'expiring' ? 
    [
        {
            $match: {
                $and: [
                    {owner: id},
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
        {
            $project: {
               yrDiff: 0,
               mnDiff: 0,
            }
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
            $limit: 3
        }
    ]
    :
    [
        {
            $match: filter === 'out_of_stock' ? 
            {
                owner: id, instock: {$lte: 0}
            }
            :  filter === 'low_stocks' ?
            {
                $and: [
                    {owner: id},
                    { instock: {$gt: 0}},
                    {$expr:{$lte:["$instock", "$warningCount"]}}
                ]
            }
            : filter === 'expired' ?
            {
               $and:[{owner: id, expiry: {$lte : new Date()}}]    
            }
            :
            {
            
            }
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
            $limit: 3
        }
    ]
}