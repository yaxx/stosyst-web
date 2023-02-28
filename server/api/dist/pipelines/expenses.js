"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpensePipeline = void 0;
const groupers_1 = require("./groupers");
const sorter_1 = require("./sorter");
const getExpensePipeline = (clientId, query, group, offset) => {
    return query.trim().length > 0 ?
        [
            {
                $search: {
                    index: 'expenses',
                    text: {
                        query,
                        fuzzy: {
                            maxEdits: 2,
                        },
                        path: ['name', 'desc', 'spender']
                    }
                }
            },
            {
                $match: { modifier: clientId }
            },
            {
                $group: (0, groupers_1.expenseCriteria)(group)
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
                    $match: { modifier: clientId }
                },
                {
                    $group: (0, groupers_1.expenseCriteria)(group)
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
exports.getExpensePipeline = getExpensePipeline;
//# sourceMappingURL=expenses.js.map