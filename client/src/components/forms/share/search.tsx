import React, { useState } from 'react'
import { Divider } from '../../headers/styles'
import { ImageItem } from '../../images'
import { SearchInput } from '../../inputs/search'
import { FormGroupCont } from '../../inputs/search/styles'
import Skeleton from '../../loaders/skeletons'
import {ItemInfo, OptItemInfo, SearchListItemCont, SearchOptCont } from './styles'

const Search = (props: any) => {
    const [focus, setFocus] = useState('')
    const [searchTerm, setSearchTerm] = useState<any>('')
    const selectOpt = (opt: any, input: string) => {
        setFocus('')
    } 
  return (
      <SearchOptCont {...props}>
          <FormGroupCont r={6}>
              <SearchInput
                  h={30}
                  name="search"
                  value={searchTerm}
                  focused={focus === 'slot'}
                  placeholder="Search products"
                  focusCallback={setFocus}
                  changeCallback={(e: any)=>setSearchTerm(e.target.value)}
              />
          </ FormGroupCont>
          <SearchListItemCont>
              <ImageItem
                  h={'35px'} w={'35px'} r={'4px'} b={'inherit'}
                  source={'89d12b66-1e6f-4116-bb17-989357f4583d'}
              />
              <ItemInfo>
                  <p> Augmentine Syrup</p>
                  <p>20.77mg</p>
              </ItemInfo>
              <OptItemInfo>
                  <p>10 </p>
                  <p>17,400</p>
              </OptItemInfo>
              <Divider />
          </SearchListItemCont>
          <Skeleton />
      </SearchOptCont>
  )
}

export default Search