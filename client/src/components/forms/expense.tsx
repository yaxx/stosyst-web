import { useMutation, useReactiveVar } from "@apollo/client";
import React, { ReactElement, useState } from "react";
import { SAVE_EXPENSE } from "../../graphql/mutations";
import { Loader } from "../loaders";
import { FormGroupCont, NameInput, StockInput } from "../inputs";
import { Expense } from "../../types/model";
import { stripTypename, updateExpenseCache } from "../../utils";
import SubmitButton from "../buttons/circularBtn";
import { ClearCont, LoadingCont, RequireMark, TableForm } from "./styles";
import { expenseCriteria } from "../../store/data";
import { InfoContainer, InfoItems, InputItem } from "../listItems/styles";
import { ClearInputIcon, SuccessMarkIcon } from "../icons";
import { Btn } from "../buttons";
import stock from "../listItems/stock";

export function ExpenseForm(props: any): ReactElement {
     let initExpense: Expense = {
        name: '',
        desc: '',
        spender: '',
        amount: 0,
        modifier: ''
    }
    const [inFocus, setInFocus] = useState('name')
    let [expense, setExpense] = useState(props.expense || initExpense);
    const { group, query } = useReactiveVar(expenseCriteria)

    const [mark, setMark] = useState(false)
    const [defaultImage, setImage] = useState('avatar.png');

    const showFeedBack = () => {
        setMark(true)
        setTimeout(() => {
            setMark(false)
        }, 2000);
    }

    const [saveExpense, { error, loading, data }] = useMutation(SAVE_EXPENSE, {
        update: (cache, { data:result }) => {
            updateExpenseCache(cache, group, query, result.saveExpense)
            showFeedBack()
        }
    });

    const handClick = (e: React.SyntheticEvent) => {
        e.stopPropagation();
    }

    const handleClear = (name: string) => {
        setExpense({
            ...expense,
            [name]: ''
        })
    }

    const handleChange = (e: any) => {
        e.persist();
        const { target: { name, value } } = e
        const isAnumber = /^[0-9\b]+$/;

        if (((name === 'amount') && isAnumber.test(value)) || value === "") {
            setExpense({
                ...expense,
                [name]: value
            })
        } else if (name === 'name' || name === 'desc' || name === 'spender') {
            setExpense({
                ...expense,
                [name]:  value
            })
        }
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if(expense._id) {
            const { added, modified, ...exp } = stripTypename(expense)
            const {name, desc, spender, amount} = exp;
            expense = {
                ...exp,
                name: name.trim(),
                desc: desc.trim(),
                spender: spender.trim(),
                amount: +amount,
                added: stripTypename(added),
                modified: stripTypename(modified)
            }
        } else {
            const { name, desc, spender, amount } = expense;
            expense = {
                ...expense,
                name: name.trim(),
                desc: desc.trim(),
                amount: +amount,
                spender: spender.trim(),
            }
        }
        saveExpense({
            variables: {
                expense
            }
        });
    }

    return (
        <TableForm 
            id = { expense._id || null }
            onClick = {
                (e: React.SyntheticEvent) => handClick(e)
            } 
            onSubmit = {
                (e: React.SyntheticEvent) => handleSubmit(e)
            } 
            noValidate={ true }>
                <>
                    <InfoContainer>
                        <InfoItems w={30} >
                            </InfoItems>
                                <InfoItems style={{left: 35}} isInput w={40}>
                                    <FormGroupCont w={98}>
                                        <NameInput                          
                                            required
                                            name='name'
                                            label='Expense title'
                                            value={expense.name}
                                            clearCallback={handleClear}
                                            changeCallback={
                                                (e: any) => handleChange(e)
                                            }
                                        />
                                    </FormGroupCont>
                                    <FormGroupCont w={98}>
                                        <NameInput
                                            top
                                            name='desc'
                                            label='Description'
                                            value={expense.desc}
                                            clearCallback={handleClear}
                                            changeCallback={
                                                (e: any) => handleChange(e)
                                            }
                                        />
                                        <NameInput
                                            name='spender'
                                            label='Spender'
                                            value={expense.spender}
                                            clearCallback={handleClear}
                                            changeCallback={
                                                (e: any) => handleChange(e)
                                            }
                                        />
                                </FormGroupCont>
                                <FormGroupCont w={98}>
                                    <NameInput
                                        required
                                        name='amount'
                                        label='Expense amount'
                                        value={expense.amount}
                                        clearCallback={handleClear}
                                        changeCallback={
                                            (e: any) => handleChange(e)
                                        }
                                    />
                                </FormGroupCont>
                            </InfoItems>
                        <InfoItems w={30}>
                </InfoItems>
            </InfoContainer>
            {
                error ?
                    console.log({ error }) :
                    loading || mark ?
                        <LoadingCont> {
                            mark ?
                                <SuccessMarkIcon />
                                :
                                <Loader size={'27px'} />
                        }
                        </LoadingCont>
                        :
                        !mark && !loading ?
                        <Btn disabled={!expense.name || !expense.amount}>
                            <p>GO</p>
                        </Btn>
                        :
                        <></>
            } 
            </>
                
            
        </TableForm>
    )
}