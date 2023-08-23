import { useReactiveVar } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { groupingCriteria } from '../../../store/data'
import headerMenu from '../headerMenu'
import { ButtonDivider, ListDivider, TableActions } from '../styles'
import OptionItem from './option'

const PageListOpts = (props: any) => {

    const { tableMenuCallback } = props

    const [filter, setFilter] = useState('')
    const [group, setGroup] = useState('')

    const criteria = useReactiveVar(groupingCriteria)


    const reOrderPageList = () => {
        groupingCriteria({
             ...criteria, 
             filter,
             group,
        })
        tableMenuCallback()
    }
    const { filter:f, group:g, } = groupingCriteria()

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
                label={'A-Z'} 
                selected={group === 'name'} 
                selectCallback={() => setGroup('name')} 
            />
            <OptionItem
                label={'Category'}
                selected={group === 'category'}
                selectCallback={() => setGroup('category')}
            />
            <OptionItem
                label={'Quantity'}
                selected={group === 'instock'}
                selectCallback={() => setGroup('instock')}
            />
            <OptionItem
                label={'Date added'}
                selected={group === 'date'}
                selectCallback={() => setGroup('date')}
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
                label={'Expiring'}
                selected={filter === 'expiring'}
                selectCallback={() => setFilter('expiring')}
            />
            <OptionItem
                label={'Expired'}
                selected={filter === 'expired'}
                selectCallback={() => setFilter('expired')}
            />
            <OptionItem
                label={'Low stocks'}
                selected={filter === 'low_stock'}
                selectCallback={() => setFilter('low_stock')}
            />
            <OptionItem
                label={'Out of stock'}
                selected={filter === 'out_of_stock'}
                selectCallback={() => setFilter('out_of_stock')}
            />

            <ButtonDivider onClick={reOrderPageList}>
                <p>OK</p>
            </ButtonDivider>
      </TableActions>
  )
}

export default PageListOpts