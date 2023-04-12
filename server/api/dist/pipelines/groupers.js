"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortInvoice = exports.groupInvoice = exports.expenseCriteria = exports.productsCriteria = exports.sortOrder = void 0;
exports.sortOrder = {
    year: -1,
    month: -1,
    day: 1
};
const productsCriteria = (criteria) => {
    let grp = {};
    switch (criteria) {
        case 'category':
            grp = {
                _id: '$category',
                count: {
                    $sum: 1
                },
                total: {
                    $sum: {
                        $multiply: ['$instock', '$sellingPrice']
                    }
                },
                records: {
                    $push: "$$ROOT"
                }
            };
            break;
        case 'instock':
            grp = {
                _id: '$instock',
                count: {
                    $sum: 1
                },
                total: {
                    $sum: {
                        $multiply: ['$instock', '$sellingPrice']
                    }
                },
                records: {
                    $push: "$$ROOT"
                }
            };
            break;
        case 'date':
            grp = {
                _id: {
                    day: { $dayOfMonth: "$createdAt" },
                    month: { $month: "$createdAt" },
                    year: { $year: "$createdAt" }
                },
                count: {
                    $sum: 1
                },
                total: {
                    $sum: {
                        $multiply: ['$instock', '$sellingPrice']
                    }
                },
                records: {
                    $push: "$$ROOT"
                }
            };
            break;
        default:
            grp = {
                _id: {
                    $substr: ['$name', 0, 1]
                },
                count: {
                    $sum: 1
                },
                total: {
                    $sum: {
                        $multiply: ['$instock', '$sellingPrice']
                    }
                },
                records: {
                    $push: "$$ROOT"
                }
            };
            break;
    }
    return grp;
};
exports.productsCriteria = productsCriteria;
const expenseCriteria = (criteria) => {
    let grp = {};
    switch (criteria) {
        case 'name':
            grp = {
                _id: { $toUpper: '$name' },
                records: {
                    $push: "$$ROOT"
                }
            };
            break;
        case 'spender':
            grp = {
                _id: { $toUpper: '$spender' },
                records: {
                    $push: "$$ROOT"
                }
            };
            break;
        case 'amount':
            grp = {
                _id: '$amount',
                records: {
                    $push: "$$ROOT"
                }
            };
            break;
        default:
            grp = grp = {
                _id: {
                    day: { $dayOfMonth: "$createdAt" },
                    month: { $month: "$createdAt" },
                    year: { $year: "$createdAt" }
                },
                records: {
                    $push: "$$ROOT"
                }
            };
            break;
    }
    return grp;
};
exports.expenseCriteria = expenseCriteria;
const groupInvoice = (criteria) => ({
    _id: criteria === 'date' ?
        {
            year: {
                $year: "$createdAt"
            },
            month: {
                $month: "$createdAt"
            },
            day: {
                $dayOfMonth: "$createdAt"
            }
        }
        :
            criteria === 'paymentmethod' ?
                "$paymentMethod"
                :
                    "$customer.firstName",
    records: {
        $push: "$$ROOT"
    }
});
exports.groupInvoice = groupInvoice;
const sortInvoice = (criteria) => !criteria ?
    { '_id.year': -1, '_id.month': -1, '_id.day': -1 }
    :
        { _id: -1 };
exports.sortInvoice = sortInvoice;
//# sourceMappingURL=groupers.js.map