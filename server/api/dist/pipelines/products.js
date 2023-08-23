"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchedProdsPipeline = exports.getProductsPipeline = void 0;
const stocks_1 = require("./filters/stocks");
const groupers_1 = require("./groupers");
const sorter_1 = require("./sorter");
const getProductsPipeline = (ownerId, query, offset, group, filter) => {
    const limit = 10;
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
                $group: (0, groupers_1.productsCriteria)(group)
            },
            {
                $project: {
                    _id: 1,
                    total: 1,
                    count: 1,
                    records: { "$slice": ["$records", 5] }
                }
            },
            {
                $sort: (0, sorter_1.getSorter)(group)
            },
            {
                $skip: offset
            },
            {
                $limit: limit
            }
        ]
        :
            filter ? (0, stocks_1.getStocksFilter)(ownerId, filter, group, offset)
                :
                    [
                        {
                            $match: { owner: ownerId }
                        },
                        {
                            $group: (0, groupers_1.productsCriteria)(group)
                        },
                        {
                            $project: {
                                _id: 1,
                                total: 1,
                                count: 1,
                                records: { "$slice": ["$records", 5] }
                            }
                        },
                        {
                            $sort: (0, sorter_1.getSorter)(group)
                        },
                        {
                            $skip: offset
                        },
                        {
                            $limit: limit
                        }
                    ];
};
exports.getProductsPipeline = getProductsPipeline;
const matchedProdsPipeline = (query, storedId) => {
    const limit = 4;
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
    ];
};
exports.matchedProdsPipeline = matchedProdsPipeline;
//# sourceMappingURL=products.js.map