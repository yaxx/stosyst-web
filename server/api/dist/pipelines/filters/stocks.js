"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStocksFilter = void 0;
const groupers_1 = require("../groupers");
const sorter_1 = require("../sorter");
const getStocksFilter = (id, filter, group, offset) => {
    return filter === 'expiring' ?
        [
            {
                $match: {
                    $and: [
                        { owner: id },
                        { expiry: { $ne: null } },
                        { expiryWarning: { $gt: 0 } }
                    ]
                },
            },
            {
                $addFields: {
                    yrDiff: {
                        $dateDiff: {
                            startDate: new Date(),
                            endDate: "$expiry",
                            unit: "year"
                        }
                    },
                    mnDiff: {
                        $dateDiff: {
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
                        { yrDiff: 0 },
                        { mnDiff: { $gt: 0 } },
                        { $expr: { $lte: ["$mnDiff", "$expiryWarning"] } },
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
                $group: (0, groupers_1.productsCriteria)(group)
            },
            {
                $sort: (0, sorter_1.getSorter)(group)
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
                    $match: filter === 'out_of_stock' ?
                        {
                            owner: id, instock: { $lte: 0 }
                        }
                        : filter === 'low_stocks' ?
                            {
                                $and: [
                                    { owner: id },
                                    { instock: { $gt: 0 } },
                                    { $expr: { $lte: ["$instock", "$warningCount"] } }
                                ]
                            }
                            : filter === 'expired' ?
                                {
                                    $and: [{ owner: id, expiry: { $lte: new Date() } }]
                                }
                                :
                                    {}
                },
                {
                    $group: (0, groupers_1.productsCriteria)(group)
                },
                {
                    $sort: (0, sorter_1.getSorter)(group)
                },
                {
                    $skip: offset
                },
                {
                    $limit: 20
                }
            ];
};
exports.getStocksFilter = getStocksFilter;
//# sourceMappingURL=stocks.js.map