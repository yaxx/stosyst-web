import { Fragment, ReactElement, useState } from "react";
import styled from "styled-components";
import { ExpandableList, Item, ListItems, MoreActions } from ".";
import { DateSeparator, TotalSeparator } from "../seperators";
import { Counter } from "../../pages/invoices-page";
import { Expense as ExpensModel } from "../../types/model";
import { ExpenseForm } from "../forms/expense";
import { ArrowDown, MoreIcon } from "../icons";
import { ItemWraper } from "../../pages/expenses";
import { editCallback, formatMoney, format_date, getNetExpenseToatal, isAdmin } from "../../utils";
import { GET_EXPENSES } from "../../graphql/queries";
import { useMutation, useReactiveVar } from "@apollo/client";
import { useGetLocals } from "../../hooks/useGetProducts";
import { P1, P2 } from "../typography";
import { expenseCriteria, locals } from "../../store/data";
import { ExpenseDetails } from "./stockDetails";
import { can } from "../../utils/permisions";
import { DELETE_EXPENSE } from "../../graphql/mutations";
import { Divider } from "../headers/styles";
import { ExpenseList } from "./styles";
import { roundAmount } from "../charts/header";
// import { DELETE_EXPENSE } from "../../graphql/mutations";


export const ExpenseListItems = ({ togleMenu, expense }: any) => {

    return (
        <ListItems>
            <Item width={47}>
                <P1>{expense.name}</P1>
                <P2>{expense.desc}</P2>
            </Item>
            <Item width={38}><P1>{expense.spender}</P1></Item>
            <Item width={15} ai='flex-end' className='options'>
                <p><MoreIcon openMenuCallback={ togleMenu } /></p>
                <P1>{formatMoney(expense.amount)}</P1>
            </Item>
            <Divider />
        </ListItems>
    )
}

export  function Expense(props: any): ReactElement {

    const [menuOpened, reSetMenu] = useState(false);

    const { group, query } = useReactiveVar(expenseCriteria)
    const togleMenu = () => {
        reSetMenu(!menuOpened)
    }
    const closeMenu = () => {
        reSetMenu(false)
    }

    let [deleteExpenses, {error, loading }] = useMutation(DELETE_EXPENSE,{
        update: (cache, {data}) => {
           const existingExpenses:any = cache.readQuery({
               query: GET_EXPENSES,
                variables: {
                    query,
                    groupBy: group,
                    offset: 0, 
                }
            })
            let newExpenses = existingExpenses.expenses.map((expenseGroup: any) => {
                return (expenseGroup.records.some((expenseItem:any) => expenseItem._id === data.deleteExpense._id)) ?
                    ({
                        ...expenseGroup,
                        records: expenseGroup.records.filter((expense:any) => expense._id !== data.deleteExpense._id)
                    })
                    :
                    expenseGroup 
            })
            cache.writeQuery({
                query: GET_EXPENSES,
                variables: {
                    query,
                    groupBy: group,
                    offset: 0
                },
                data: {
                    expenses: newExpenses.filter((expense: any) => expense.records.length)
                }
            });
        }
    })

    if(error)
    console.log({error});
    
    const deleteItem = (id: string, e: any) => {
        e.stopPropagation();
        closeMenu()
        deleteExpenses({
            variables: {
                id
            },
        })
    }
    const editItem = (e: Event, stock: any) => {
        closeMenu();
        editCallback(e, 'stocks', 'products', stock, 'edit')
    }
    const displayDetails = (e: Event, stock: any) => {
        closeMenu();
        editCallback(e, 'stocks', 'products', stock, 'edit', false)
    }
    return (
        <ExpenseList>
            <ExpenseListItems togleMenu = { togleMenu } {...props}/>
            {
                menuOpened && 
                <MoreActions 
                    closeMenuCallback = { closeMenu }
                    actions = {
                        [
                            {
                                label: 'Edit',
                                permitted: isAdmin() || can('edit', 'expenses'),
                                callback: (e: any) => editItem(e,  props.expense)
                            },
                            {
                                label: 'Expense Info',
                                permitted: true,
                                callback: (e: any) => displayDetails(e, props.expense)
                            },
                            {
                                label: 'Delete Expense',
                                permitted: isAdmin() || can('delete', 'invoices'),
                                callback: (e: any) => deleteItem(props.expense._id, e)
                            }
                        ]
                    }
                />  
            }
        </ExpenseList>
    )
}

export  function ExpenseListGroup(props: any): ReactElement {
    const { groupId, list } =  props;
    const { group } = useReactiveVar(expenseCriteria)
    const { localData:{ localState }, issues } = useGetLocals();

    return (
        <section className="stocksContainer">
            <DateSeparator style={{width: '100%'}}>
                {group === 'date' ? format_date(groupId) : groupId}
                <Divider />
            </DateSeparator>
             {
                <ul style={{paddingLeft: 0}} className='stockList'> {
                    list.map((expense: ExpensModel) =>
                        <ItemWraper key={expense._id}> {
                            (locals().selectedId === expense._id) &&
                            <Fragment> {
                                locals().isEditing ?
                                <ExpenseForm expense={ expense }  {...props} />
                                :
                                <ExpenseDetails expense={expense} />
                            }
                            </Fragment>
                        }
                            <Expense expense={expense}  {...props} key={expense._id} />
                        </ItemWraper>
                    )
                }
                </ul>
            }
            <TotalSeparator style={{paddingLeft:0}}>
                <div className="seperatorMakers">
                    <p>+0</p>

                    <p>{roundAmount(+getNetExpenseToatal(props.list))}</p>
                </div>
                {/* <Divider ps='relative' bottom={2}/> */}
            </TotalSeparator>
            {/* <TotalSeparator leftPad = { 13 } >
                <Counter>

                </Counter>
                { (props.list.length - 5) > 0 && <ArrowDown/> }
                <P1>{ formatMoney( getNetExpenseToatal(props.list) ) }</P1>
            </TotalSeparator> */}
        </section>
    )
}
