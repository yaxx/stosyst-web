import { Fragment, ReactElement } from "react";
import styled from "styled-components";
import { Item, ListItems, SummaryItems } from ".";
import { DateSeparator, TotalSeparator } from "../seperators";
import { DownArror } from "../icons";
import { ItemWraper } from "../../pages/expenses";
import { formatMoney, format_date } from "../../utils";
import { useGetLocals } from "../../hooks/useGetProducts";
import { Delta, Sum, TAGGLINE, Total } from "../typography";
import { ExpenseList as SummaryList } from "./styles";
import { Divider } from "../headers/styles";
import { ListLabel, MultiLabel, DiffMaker } from "./styles";



const Arrow = () => (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" >
        <path d="M5 6L9.33013 0.75H0.669873L5 6Z"/>
    </svg>

)

export function SummaryListGroup(props: any): ReactElement {

    const months = ['JR','FB','MA','AP','MY','JN','JL','AG','SP','OC','NV','DC'];

    const { localData: { localState }, issues } = useGetLocals();
    const getDiff = (cur: number, next: number) => {
        // console.log(cur)
        
       const percentage = (Math.round(cur-next)*100)/Math.round(next)

       return Math.round(percentage);
    }
    return (
        <section className="stocksContainer">
            <DateSeparator>
                {` ${props.records[0]._id.x}`}
                <Divider />
            </DateSeparator>
            {
                <ul className='stockList'> {
                        <ItemWraper >{
                            props.records.map((record: any, i: number)=>
                                <SummaryList>
                                    <SummaryItems>
                                        <Item width={47}>
                                            <ListLabel fd={props.groupBy === 'D' ?  true : false}> {
                                                props.groupBy === 'D' ?
                                                    <MultiLabel>
                                                        <p>{ record._id.z }</p>
                                                        <p style={{fontSize:'10px'}}>{ months[+record._id.y - 1]}</p>
                                                    </MultiLabel>
                                                    :
                                                    <p style={{ color: 'lightgrey', fontSize: props.groupBy === 'W' ?  '12px':'11px', marginBottom: '0px', }}>{props.groupBy === 'W' ? record._id.z : months[+record._id.z - 1]}</p>
                                                }
                                            </ListLabel>
                                            <Sum>{formatMoney(Math.round(record.sales))}</Sum>
                                        </Item>
                                        <Item width={38}>
                                            <Sum>{formatMoney(Math.round(record.expenses))}</Sum>
                                        </Item>
                                        <Item style={{justifyContent: 'flex-end'}} width={15} ai='flex-end'>
                                            <Sum>{(formatMoney(Math.round(record.profit-record.expenses)))}</Sum>
                                            <DiffMaker diff={props.records.length === i + 1 ? true : (record.profit - record.expenses) > (props.records[i + 1].profit - props.records[i + 1].expenses) ? true : false}>
                                                <Arrow/>
                                                <p id= 'pcent'> {
                                                    props.records.length === i + 1 ? "100%" : `${Math.abs(getDiff((record.profit - record.expenses), (props.records[i + 1].profit) - props.records[i + 1].expenses))}%`
                                                }
                                                </p>
                                            </DiffMaker>
                                        </Item>
                                        <Divider />
                                    </SummaryItems>
                                </SummaryList>
                            )
                        }
                    
                    </ItemWraper>
                }
                </ul>
            }
            <TotalSeparator style={{ marginBottom: '22px' }}/>
        </section>
    )
}
