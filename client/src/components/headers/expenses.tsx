import { useReactiveVar } from "@apollo/client"
import { ReactElement } from "react"
import { expenseCriteria, groupingCriteria, headerMenu, initExpense } from "../../store/data"
import { editCallback, isAdmin } from "../../utils"
import { can } from "../../utils/permisions"
import { CircularBtn } from "../buttons"
import { Marker, PlusIcon } from "../icons"
import { TAGGLINE } from "../typography"
import { Header, ExpenseListHeader, Divider, HeaderItem, TableActions, TableOption } from "./stylesx"

export const ExpenseHeader = (props: any): ReactElement => {

    const { groupCallback, filterCallback } = props
    const headMenu = useReactiveVar(headerMenu)
    const {group} = useReactiveVar(expenseCriteria)
    const crt = useReactiveVar(expenseCriteria)
   

    const groupExpenses = (group: string) => {
        expenseCriteria({ ...crt, group })
        groupCallback()
    }

    return (
        <Header>
            <ExpenseListHeader>
                <Divider top='100' />
                <HeaderItem width={47}>
                    <TAGGLINE>EPENSES</TAGGLINE>
                </HeaderItem>
                <HeaderItem width={43}>
                    <TAGGLINE>SPENDER</TAGGLINE>
                </HeaderItem>
                <HeaderItem width={5}>
                    <TAGGLINE>AMOUNT</TAGGLINE>
                </HeaderItem>
                <HeaderItem width={5} onClick={(e: Event) => editCallback(e, 'stocks', '', initExpense, 'expenses')}> {
                    (isAdmin() || can('add', 'expenses')) &&
                    <CircularBtn h='30' w='30' onClick={(e: Event) => editCallback(e, 'stocks', '', initExpense, 'expenses')}>
                        <PlusIcon />
                    </CircularBtn>
                }
                </HeaderItem>
                {
                  headMenu && <TableActions onMouseLeave={() => headerMenu('')}>
                        <TableOption selected={group === 'name'} onClick={() => groupExpenses('name')}>
                            {
                                group === 'name' && <Marker />
                            }
                            <p>A-Z</p>
                        </TableOption>
                        <TableOption selected={group === 'spender'} onClick={() => groupExpenses('spender')}>
                            {
                                group === 'spender' && <Marker />
                            }
                            <p>Spender</p>
                        </TableOption>
                        <TableOption selected={group === 'amount'} onClick={() => groupExpenses('amount')}>
                            {
                                group === 'amount' && <Marker />
                            }
                            <p>Ammount</p>
                        </TableOption>
                        <TableOption selected={group === 'date'} onClick={() => groupExpenses('date')} style={{ borderBottom: '0px' }}>
                            {
                                group === 'date' && <Marker />
                            }
                            <p>Date added</p>
                        </TableOption>
                    </TableActions>
                }
            </ExpenseListHeader>
        </Header>
    )
}