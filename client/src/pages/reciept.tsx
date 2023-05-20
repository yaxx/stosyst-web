import React from 'react'
import { Divider } from '../components/headers/styles'
import { MoreIcon } from '../components/icons'
import { IssueContainer } from '../components/issues/styles'
import { ListItems, Item } from '../components/listItems'
import { Expense } from '../components/listItems/expense'
import { ExpenseList } from '../components/listItems/styles'
import { P1, P2 } from '../components/typography'
import { dummyExpenses } from '../data'
import { formatMoney } from '../utils'
import { ItemWraper } from './expenses'



type Props = {}

const Reciept = ({}: Props) => {
    const handlePrint = ()=>{
        window.print()
    }
  return (
      <section className="stocksContainer">
          {
              <ul style={{ paddingLeft: 0 }} className='stockList'> {
                  dummyExpenses.map((expense: any) =>
                      <ItemWraper key={expense._id}> {
                      }
                          <ExpenseList>
                              <ListItems>
                                  <Item width={47}>
                                      <P1>Transport</P1>
                                      <P2>Market</P2>
                                  </Item>
                                  <Item width={38}><P1>Johsnon</P1></Item>
                                  <Item width={15} ai='flex-end' className='options'>
                                      <p><MoreIcon /></p>
                                      <P1>24,000</P1>
                                  </Item>
                                  <Divider />
                              </ListItems>
                          </ExpenseList>
                      </ItemWraper>
                  )
              }
              </ul>
          }
          <button onClick={handlePrint}>Print</button>
      </section>
  )
}

export default Reciept