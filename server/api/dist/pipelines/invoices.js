"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInvoicePipeline = void 0;
const invoice_1 = require("./filters/invoice");
const groupers_1 = require("./groupers");
const sorter_1 = require("./sorter");
const getInvoicePipeline = (modifier, query, filter, group, offset) => {
    return query.trim().length > 0 ?
        [
            {
                $search: {
                    text: {
                        query,
                        fuzzy: {
                            maxEdits: 2,
                        },
                        path: [
                            'customer.phone',
                            'customer.firstName',
                            'stocks.item.name',
                            'stocks.item.category',
                            'stocks.item.description'
                        ]
                    }
                }
            },
            {
                $match: { modifier }
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
                $limit: 10
            }
        ]
        :
            filter ? (0, invoice_1.getInvoiceFilter)(modifier, filter, group, offset)
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
exports.getInvoicePipeline = getInvoicePipeline;
//# sourceMappingURL=invoices.js.map