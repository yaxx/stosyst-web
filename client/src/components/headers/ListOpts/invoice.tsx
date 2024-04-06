import { useReactiveVar } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { groupingCriteria, invCriteria } from '../../../store/data'
import headerMenu from '../headerMenu'
import { ButtonDivider, ListDivider, TableActions } from '../styles'
import OptionItem from './option'

const InvoiceHeaderActions = (props: any) => {

    const { tableMenuCallback } = props

    const [filter, setFilter] = useState('')
    const [group, setGroup] = useState('')

    const criteria = useReactiveVar(invCriteria)


    const reOrderPageList = () => {
        groupingCriteria({
            ...criteria,
            order: '',
            group,
            filter,
        })
        tableMenuCallback()
    }
    const { filter: f, group: g, } = invCriteria()

    useEffect(() => {
        setGroup(g)
        setFilter(f)
    }, [g, f])

    return (
        <TableActions {...props} onMouseLeave={() => headerMenu('')}>
            <ListDivider >
                <p>GROUP BY</p>
            </ListDivider>
            <OptionItem
                label={'Date added'}
                selected={group === 'date'}
                selectCallback={() => setGroup('date')}
            />
            <OptionItem
                label={'Customer'}
                selected={group === 'customer'}
                selectCallback={() => setGroup('customer')}
            />
            <OptionItem
                label={'Payment method'}
                selected={group === 'paymentmethod'}
                selectCallback={() => setGroup('paymentmethod')}
            />
            <ListDivider>
                <p>FILTER BY</p>
            </ListDivider>
            <OptionItem
                label={'None'}
                selected={filter === ''}
                selectCallback={() => setFilter('')}
            />
            <OptionItem
                label={'Credits'}
                selected={filter === 'pendings'}
                selectCallback={() => setFilter('pendings')}
            />
            <OptionItem
                label={'Cash'}
                selected={filter === 'cash'}
                selectCallback={() => setFilter('cash')}
            />
            <OptionItem
                label={'POS'}
                selected={filter === 'pos'}
                selectCallback={() => setFilter('pos')}
            />
            <OptionItem
                label={'Transfer'}
                selected={filter === 'transfer'}
                selectCallback={() => setFilter('transfer')}
            />

            <ButtonDivider onClick={reOrderPageList}>
                <p>OK</p>
            </ButtonDivider>
        </TableActions>
    )
}

export default InvoiceHeaderActions