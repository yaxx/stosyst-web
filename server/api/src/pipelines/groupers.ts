export const sortOrder = {
    year: -1, 
    month: -1, 
    day: 1
}

export const productsCriteria = (criteria: string) => {
    let grp = {}
    console.log(criteria)
    switch (criteria) {
        case 'category':
            grp = {
                _id: '$category',
                count: {
                    $sum: 1
                },
                 total: {
                    $sum: {
                        $multiply: ['$instock','$sellingPrice' ]
                    }
                },
                records: {
                    $push: "$$ROOT" 
                }  
            }
            break;
        case 'instock':
             grp = {
                _id: '$instock',
               count: {
                    $sum: 1
                },
                 total: {
                    $sum: {
                        $multiply: ['$instock','$sellingPrice' ]
                    }
                },
                records: {
                    $push: "$$ROOT" 
                }
            }
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
                        $multiply: ['$instock','$sellingPrice' ]
                    }
                },
                records: {
                    $push: "$$ROOT" 
                }
            }
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
                        $multiply: ['$instock','$sellingPrice' ]
                    }
                },
                records: {
                    $push: "$$ROOT" 
                }
            }
            break;
    }
    return grp;
}
export const expenseCriteria = (criteria: string) => {
    let grp = {}
    switch (criteria) {
        case 'name':
            grp = {
                _id:  {$toUpper:'$name'},
                records: {
                    $push: "$$ROOT" 
                } 
            }
            break;
        case 'spender':
             grp = {
                 _id:  {$toUpper:'$spender'},
                records: {
                    $push: "$$ROOT" 
                }    
            }
            break;
        case 'amount':
             grp = {
                _id: '$amount',
                records: {
                    $push: "$$ROOT" 
                }    
            }
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
            }
            break;
    }
    return grp;
}


export const groupInvoice = (criteria: string) => ({
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
})
export const sortInvoice = (criteria: string) => !criteria ?
    {'_id.year':-1, '_id.month':-1, '_id.day':-1} 
    :
    {_id:-1}
