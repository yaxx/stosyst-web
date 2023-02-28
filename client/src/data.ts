import pepsi from './pepsi.jpg'
import cornflex from './cornflex.jpg'
import cannedcock from './cannedcock.png'
import water from './water.jpg'
import maggi from './maggi.jpg'
import milk from './milk.jpg'

 const genId = () => Math.floor(Math.random() * (1000000000000 - 100000000000 + 1) + 100000000000).toString();
export  const stocks = [
    [{
        id: '',
        name: 'Canned Pepsi',
        description: '5cl canned',
        category: '',
        sPrice: 500,
        cPrice: 650,
        instock: 19,
        imgUri: '',
        meta: {
            createdAt: '',
            modified: '',
            modifiedBy: ''
        }
        
    },
    {
        id: '',
        name: 'Coca Cola',
        description: '',
        category: '',
        sPrice: 500,
        cPrice: 650,
        instock: 19,
        imgUri: '',
        meta: {
            createdAt: '',
            modified: '',
            modifiedBy: ''
        }
    },
    {
        id: '',
        name: 'Maggi Powder',
        description: '',
        category: '',
        sPrice: 500,
        cPrice: 650,
        instock: 19,
        imgUri: '',
        meta: {
            createdAt: '',
            modified: '',
            modifiedBy: ''
        }
    }]
]
export  const invoices = [
        [
            [
                {
                    id: genId(),
                    stock: {
                        id: '',
                        name: 'Pepsi',
                        description: '25cl Canned Energy',
                        category: '',
                        sPrice: 500,
                        cPrice: 650,
                        instock: 19,
                        imgUri: pepsi,
                        meta: {
                            createdAt: '',
                            modified: '',
                            modifiedBy: ''
                        }
                    },
                    quantity: 6,
                    customer: {
                        firstName:'',
                        lastName:'Mohammed',
                        phone:'09072237619',
                        email: '',
                        address: ''
                    },
                    meta: {
                        createdAt: '',
                        modified: '',
                        modifiedBy: ''
                    }
                },
                {
                    id: genId(),
                    stock: {
                        id: '',
                        name: 'Coka Cola',
                        description: 'Dangote powdered',
                        category: '',
                        sPrice: 200,
                        cPrice: 150,
                        instock: 19,
                        imgUri: cannedcock,
                        customer: {
                            firstName:'Solomon',
                            lastName:'Johnson',
                            phone:'09077837662',
                            email: '',
                            address: ''
                        },
                        meta: {
                            createdAt: '',
                            modified: '',
                            modifiedBy: ''
                        }
                    },
                    quantity: 5,
                    customer: {
                        firstName:'Hadiza',
                        lastName:'Usman Zakari',
                        phone:'08072237198',
                        email: '',
                        address: ''
                    },
                    meta: {
                        createdAt: '',
                        modified: '',
                        modifiedBy: ''
                    }
                }
            ],
            [
                {
                    id: genId(),
                    stock: {
                        id: '',
                        name: 'Indomie Noodles',
                        description: 'Hungry Man Chicken Flavor',
                        category: '',
                        sPrice: 500,
                        cPrice: 450,
                        instock: 700,
                        imgUri: maggi, 
                        meta: {
                            createdAt: '',
                            modified: '',
                            modifiedBy: ''
                        }
                    },
                    quantity: 1,
                    customer: {
                        firstName:'Farida',
                        lastName:'Ibrahim',
                        phone:'',
                        email: '',
                        address: ''
                    },
                    meta: {
                        createdAt: '',
                        modified: '',
                        modifiedBy: ''
                    }
                }
            ]
        ],
        [
            [
                {
                    id: genId(),
                    stock: {
                        id: '',
                        name: 'Brown Sugar',
                        description: 'Assorted Sugar Cube',
                        category: '',
                        sPrice: 700,
                        cPrice: 650,
                        instock: 47,
                        imgUri: pepsi, 
                        meta: {
                            createdAt: '',
                            modified: '',
                            modifiedBy: ''
                        }
                    },
                    quantity: 4,
                    customer: {
                        firstName:'Mark',
                        lastName:'',
                        phone:'080456898702',
                        email: '',
                        address: ''
                    },
                    meta: {
                        createdAt: '',
                        modified: '',
                        modifiedBy: ''
                    }
                }
            ],
            [
                {
                    id: genId(),
                    stock: {
                        id: '',
                        name: 'Power Oil',
                        description: 'Medium Size Cooking Oil',
                        category: '',
                        sPrice: 1800,
                        cPrice: 950,
                        instock: 47,
                        imgUri: water, 
                        meta: {
                            createdAt: '',
                            modified: '',
                            modifiedBy: ''
                        }
                    },
                    quantity: 2,
                    customer: {
                        firstName:'Naomi',
                        lastName:'Jonathan',
                        phone:'',
                        email: '',
                        address: ''
                    },
                    meta: {
                        createdAt: '',
                        modified: '',
                        modifiedBy: ''
                    }
                },
                {
                    id: genId(),
                    stock: {
                        id: '',
                        name: 'Evapourated Milk',
                        description: 'Assorted Sugar Cube',
                        category: '',
                        sPrice: 700,
                        cPrice: 950,
                        instock: 47,
                        imgUri: milk, 
                        meta: {
                            createdAt: '',
                            modified: '',
                            modifiedBy: ''
                        }
                    },
                    quantity: 1,
                    customer: {
                        firstName:'Bello',
                        lastName:'Mohammed',
                        phone:'080456898702',
                        email: '',
                        address: ''
                    },
                    meta: {
                        createdAt: '',
                        modified: '',
                        modifiedBy: ''
                    }
                },
                {
                    id: genId(),
                    stock: {
                        id: '',
                        name: 'Sachet Maggi',
                        description: 'Assorted Sugar Cube',
                        category: '',
                        sPrice: 250,
                        cPrice: 150,
                        instock: 47,
                        imgUri: maggi,
                        meta: {
                            createdAt: '',
                            modified: '',
                            modifiedBy: ''
                        }
                    },
                    quantity: 2,
                    customer: {
                        firstName:'Salma',
                        lastName:'Abdullahi',
                        phone:'080456898702',
                        email: '',
                        address: ''
                    },
                    meta: {
                        createdAt: '',
                        modified: '',
                        modifiedBy: ''
                    }
                }
            ],
            [
                {
                    id: genId(),
                    stock: {
                        id: '',
                        name: 'Coke',
                        description: '25cl Canned Coca Cola',
                        category: '',
                        sPrice: 250,
                        cPrice: 200,
                        instock: 47,
                        imgUri: cannedcock, 
                        meta: {
                            createdAt: '',
                            modified: '',
                            modifiedBy: ''
                        }
                    },
                    quantity: 7,
                    customer: {
                        firstName:'Salma',
                        lastName:'Abdullahi',
                        phone:'080456898702',
                        email: '',
                        address: ''
                    },
                    meta: {
                        createdAt: '',
                        modified: '',
                        modifiedBy: ''
                    }
                }
            ],
            [
                {
                    id: genId(),
                    stock: {
                        id: '',
                        name: 'Corn Flakes',
                        description: 'Small Size Gold Flavoured',
                        category: '',
                        sPrice: 1100,
                        cPrice: 950,
                        instock: 47,
                        imgUri: cornflex, 
                        meta: {
                            createdAt: '',
                            modified: '',
                            modifiedBy: ''
                        }
                    },
                    quantity: 1,
                    customer: {
                        firstName:'Salma',
                        lastName:'Abdullahi',
                        phone:'080456898702',
                        email: '',
                        address: ''
                    },
                    meta: {
                        createdAt: '',
                        modified: '',
                        modifiedBy: ''
                    }
                }
            ]
        ],
        [
            [
                {
                    id: genId(),
                    stock: {
                        id: '',
                        name: 'Brown Sugar',
                        description: 'Assorted Sugar Cube',
                        category: '',
                        sPrice: 700,
                        cPrice: 950,
                        instock: 47,
                        imgUri: pepsi, 
                        meta: {
                            createdAt: '',
                            modified: '',
                            modifiedBy: ''
                        }
                    },
                    quantity: 4,
                    customer: {
                        firstName:'Mark',
                        lastName:'',
                        phone:'080456898702',
                        email: '',
                        address: ''
                    },
                    meta: {
                        createdAt: '',
                        modified: '',
                        modifiedBy: ''
                    }
                }
            ],
            [
                {
                    id: genId(),
                    stock: {
                        id: '',
                        name: 'Power Oil',
                        description: 'Medium Size Cooking Oil',
                        category: '',
                        sPrice: 1800,
                        cPrice: 950,
                        instock: 47,
                        imgUri: water, 
                        meta: {
                            createdAt: '',
                            modified: '',
                            modifiedBy: ''
                        }
                    },
                    quantity: 2,
                    customer: {
                        firstName:'Naomi',
                        lastName:'Jonathan',
                        phone:'',
                        email: '',
                        address: ''
                    },
                    meta: {
                        createdAt: '',
                        modified: '',
                        modifiedBy: ''
                    }
                },
                {
                    id: genId(),
                    stock: {
                        id: '',
                        name: 'Brown Sugar',
                        description: 'Assorted Sugar Cube',
                        category: '',
                        sPrice: 700,
                        cPrice: 950,
                        instock: 47,
                        imgUri: '', 
                        meta: {
                            createdAt: '',
                            modified: '',
                            modifiedBy: ''
                        }
                    },
                    quantity: 1,
                    customer: {
                        firstName:'Bello',
                        lastName:'Mohammed',
                        phone:'080456898702',
                        email: '',
                        address: ''
                    },
                    meta: {
                        createdAt: '',
                        modified: '',
                        modifiedBy: ''
                    }
                },
                {
                    id: genId(),
                    stock: {
                        id: '',
                        name: 'Brown Sugar',
                        description: 'Assorted Sugar Cube',
                        category: '',
                        sPrice: 700,
                        cPrice: 950,
                        instock: 47,
                        imgUri: '', 
                        meta: {
                            createdAt: '',
                            modified: '',
                            modifiedBy: ''
                        }
                    },
                    quantity: 1,
                    customer: {
                        firstName:'Salma',
                        lastName:'Abdullahi',
                        phone:'080456898702',
                        email: '',
                        address: ''
                    },
                    meta: {
                        createdAt: '',
                        modified: '',
                        modifiedBy: ''
                    }
                }
            ],
            [
                {
                    id: genId(),
                    stock: {
                        id: '',
                        name: 'Peak Milk',
                        description: 'Canned Milk',
                        category: '',
                        sPrice: 250,
                        cPrice: 200,
                        instock: 47,
                        imgUri: cannedcock, 
                        meta: {
                            createdAt: '',
                            modified: '',
                            modifiedBy: ''
                        }
                    },
                    quantity: 7,
                    customer: {
                        firstName:'Salma',
                        lastName:'Abdullahi',
                        phone:'080456898702',
                        email: '',
                        address: ''
                    },
                    meta: {
                        createdAt: '',
                        modified: '',
                        modifiedBy: ''
                    }
                }
            ],
            [
                {
                    id: genId(),
                    stock: {
                        id: '',
                        name: 'Corn Flakes',
                        description: 'Small Size Gold Flavoured',
                        category: '',
                        sPrice: 1100,
                        cPrice: 950,
                        instock: 47,
                        imgUri: cornflex, 
                        meta: {
                            createdAt: '',
                            modified: '',
                            modifiedBy: ''
                        }
                    },
                    quantity: 1,
                    customer: {
                        firstName:'Salma',
                        lastName:'Abdullahi',
                        phone:'080456898702',
                        email: '',
                        address: ''
                    },
                    meta: {
                        createdAt: '',
                        modified: '',
                        modifiedBy: ''
                    }
                }
            ],
            [
                {
                    id: genId(),
                    stock: {
                        id: '',
                        name: 'Corn Flakes',
                        description: 'Small Size Gold Flavoured',
                        category: '',
                        sPrice: 1100,
                        cPrice: 950,
                        instock: 47,
                        imgUri: cornflex, 
                        meta: {
                            createdAt: '',
                            modified: '',
                            modifiedBy: ''
                        }
                    },
                    quantity: 1,
                    customer: {
                        firstName:'Salma',
                        lastName:'Abdullahi',
                        phone:'080456898702',
                        email: '',
                        address: ''
                    },
                    meta: {
                        createdAt: '',
                        modified: '',
                        modifiedBy: ''
                    }
                }
            ]
        ]
]

export  const expenses = [
    [{
        desc: 'Transport fair to market',
        spender: 'Amina Haruna',
        amount: 15200.00,
        modified: '10/07/2020'
    },
    {
        desc: 'Food',
        spender: 'Johnson Maxwell',
        amount: 21650.00,
        modified: '10/07/2020'
    },
    {
        desc: 'Food',
        spender: 'Johnson Maxwell',
        amount: 21650.00,
        modified: '10/07/2020'
    },
    {
        desc: 'Food',
        spender: 'Johnson Maxwell',
        amount: 21650.00,
        modified: '10/07/2020'
    },
    {
        desc: 'Food',
        spender: 'Johnson Maxwell',
        amount: 21650.00,
        modified: '10/07/2020'
    },
    {
        desc: 'Company documentation renewals',
        spender: 'Mercy Okene',
        amount: 10000.00,
        modified: '10/07/2020'
    }]
  
]