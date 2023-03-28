import { getStocksFilter } from "./filters/stocks"

 export const getStockSetPipeline = (ownerId: string, query: string,  group:string, groupLabel: string, filter: string, offset: number, ): any => {

    let pipe: any = []

    if(group === 'name') {
        pipe = [
            {
                $match: { owner: ownerId }
            },
            {
                $set: {
                    firstCharacter: {$toUpper:{$substr: ['$name', 0, 1]}} 
                }
            },
            {
                $match: { firstCharacter: groupLabel }
            },
            {
                $unset: 'firstCharacter'
            },
            {
                $sort: {name: 1}
            },
        ]
    } else if(group === 'category') {
        pipe = [
            {
                $match: { owner: ownerId, category: groupLabel }
            }
        ]
    } else if(group === 'instock') {
        pipe = [
            {
                $match: { owner: ownerId, instock: +groupLabel }
            }
        ]
    }

    return pipe;

    // return query.trim().length > 0 ? 
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
    // ]
    // :
    // filter ? getStocksFilter(ownerId, filter, group, offset )
    // :
    // [
    //     {
    //         $match: { owner: ownerId }
    //     },

    // ]
}