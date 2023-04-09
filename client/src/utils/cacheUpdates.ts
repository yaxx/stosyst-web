import {format_date} from '.';
import {GET_EXPENSES} from '../graphql/queries';
import { Expense, Product } from '../types/model';

export const updateProdCache = (prevStocks: any[], newStock: Product, group: string) => {
   let i: number = -1
  switch (group) {
    case 'name':
      i = prevStocks.findIndex(
        (prod: any) =>  prod._id === newStock?.name.toUpperCase().charAt(0),
      );
      break;
    case 'category':
      i = prevStocks.findIndex(
        (prod: any) =>  prod._id === newStock?.category,
      );
      break;
    case 'instock':
      i = prevStocks.findIndex(
        (prod: any) =>  +prod._id === newStock?.instock,
      );
      break;
    case 'date':
      i = prevStocks.findIndex(
        (prod: any) =>  prod._id === format_date(newStock?.createdAt?.toString()),
      );
      break;
  
    default:
      break;
  }
 
  if (i !== -1) {
    const j = prevStocks[i].records.findIndex(
      (p: any) => p._id === newStock._id,
    );
    if (j !== -1) {
      prevStocks = prevStocks.map((prodObject: any, k: number) => {
        return i === k
          ? {
              ...prodObject,
              records: prodObject.records.map((s: Product, n: number) =>
                n === j ? newStock : s,
              ),
            }
          : prodObject;
      });
    } else {
      prevStocks = prevStocks.map((prodObject: any, k: number) => {
        return i === k
          ? {
              ...prodObject,
              count: prodObject.count + 1,
              records: prodObject.records.unshift(newStock),
              total: prodObject.total + newStock.instock||0 * newStock.sellingPrice
            }
          : prodObject;
      });
    }
  } else {
    if(prevStocks[0]._id) {
        prevStocks = [
          {
            __typename: 'StocksGroup',
            records: [newStock],
          },
          ...prevStocks,
        ];
    }
    prevStocks[0].records = prevStocks[0].records.unshift(newStock)
  }
  return prevStocks;
};

export const updateExpenseCache = (cache: any, group:string, query:string, expense: any) => {
  const existing: any = cache.readQuery({
    query: GET_EXPENSES,
    variables: {
      query,
      group,
      offset: 0,
    },
  });

  let {expenses} = existing;

  const i: number = expenses.findIndex(
    (exps: any) =>
      format_date(exps.records[0].createdAt) ===
      format_date(expense?.createdAt.toString()),
  );

  if (i !== -1) {
    const j = expenses[i].records.findIndex(
      (exp: any) => exp._id === expense._id,
    );
    if (j !== -1) {
      expenses = expenses.map((expObj: any, k: number) => {
        return i === k
          ? {
              ...expObj,
              records: expObj.records.map((e: Expense, n: number) =>
                n === j ? expense : e,
              ),
            }
          : expObj;
      });
    } else {
      expenses = expenses.map((expObj: any, k: number) => {
        return i === k
          ? {...expObj, records: [expense, ...expObj.records]}
          : expObj;
      });
    }
  } else {
    expenses = [
      {
        __typename: 'ExpenseGroup',
        records: [expense],
      },
      ...expenses,
    ];
  }

  cache.writeQuery({
    query: GET_EXPENSES,
    variables: {
      query,
      group,
      offset: 0
    },
    data: {
      expenses,
    },
  });
};
