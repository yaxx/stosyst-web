"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInvoiceFilter = void 0;
const groupers_1 = require("../groupers");
const sorter_1 = require("../sorter");
const getInvoiceFilter = (modifier, filter, group, offset) => {
    return filter === 'pendings' ?
        [
            {
                $match: { modifier, completed: false }
            },
            {
                $group: (0, groupers_1.groupInvoice)(group)
            },
            {
                $sort: (0, sorter_1.getSorter)(group)
            },
            {
                $skip: offset
            },
            {
                $limit: 10
            }
        ]
        : filter === 'cash' ?
            [
                {
                    $match: { modifier, paymentMethod: 'Cash' }
                },
                {
                    $group: (0, groupers_1.groupInvoice)(group)
                },
                {
                    $sort: (0, sorter_1.getSorter)(group)
                },
                {
                    $skip: offset
                },
                {
                    $limit: 10
                }
            ]
            : filter === 'pos' ?
                [
                    {
                        $match: { modifier, paymentMethod: 'POS' }
                    },
                    {
                        $group: (0, groupers_1.groupInvoice)(group)
                    },
                    {
                        $sort: (0, sorter_1.getSorter)(group)
                    },
                    {
                        $skip: offset
                    },
                    {
                        $limit: 10
                    }
                ]
                : filter === 'transfer' ?
                    [
                        {
                            $match: { modifier, paymentMethod: 'Transfer' }
                        },
                        {
                            $group: (0, groupers_1.groupInvoice)(group)
                        },
                        {
                            $sort: (0, sorter_1.getSorter)(group)
                        },
                        {
                            $skip: offset
                        },
                        {
                            $limit: 10
                        }
                    ]
                    :
                        [
                            {
                                $match: { modifier }
                            },
                            {
                                $group: (0, groupers_1.groupInvoice)(group)
                            },
                            {
                                $sort: (0, sorter_1.getSorter)(group)
                            },
                            {
                                $skip: offset
                            },
                            {
                                $limit: 10
                            }
                        ];
};
exports.getInvoiceFilter = getInvoiceFilter;
//# sourceMappingURL=invoice.js.map