import { PipelineStage } from "mongoose";
import { getStocksFilter } from "./filters/stocks";
import { productsCriteria, sortOrder } from "./groupers"
import { getSorter } from "./sorter"

 export const getProductsPipeline = (ownerId: string, query: string, offset: number, group:string, filter: string ): any => {
    const limit = 10
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
            $project: {
                _id: 1,
                total: 1,
                count: 1,
                records: { "$slice": [ "$records", 5 ] }
            }
        },
        {
            $sort: getSorter(group)
        },
        { 
            $skip: offset
        },
        {
            $limit: limit
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
            $project: {
                _id: 1,
                total: 1,
                count: 1,
                records: { "$slice": [ "$records", 5 ] }
            }
        },
        {
            $sort: getSorter(group)
        },
        { 
            $skip: offset
        },
        {
            $limit: limit
        }
    ]
}
export const matchedProdsPipeline = (query: string, storedId: string,): any => {
    const limit = 4
    return [
        {
            $search: {
                index: 'products',
                text: {
                    query,
                    fuzzy: {
                        maxEdits: 2,
                    },
                    path: ['name', 'description']
                }
            }
        },
        {
            $match: { owner: storedId }
        },
        {
            $limit: limit
        }
    ]

}

