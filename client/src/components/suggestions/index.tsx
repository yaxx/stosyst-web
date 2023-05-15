import React, { useEffect, useState } from 'react'
import { format_date } from '../../utils'
import { Divider } from '../headers/stylesx'
import { ClearIcon, CloseIcon2 } from '../icons'
import { SearchSuggestions, SearchOption, IconBox } from '../inputs/styles'

const  Suggestions = (props: any) => {
    const { searchList, removeSuggestion, page, selectSearchTerm } = props

    const simplifyDate = (d: string)=>{
        const splited = format_date(new Date(d).getTime()).split(' ')
        return `${splited[0]} ${splited[1]}`
    }


  return (
      <SearchSuggestions>{
          searchList.map((s: any) => (
                <SearchOption
                    key={s.searchTerm}
                    onClick={() => selectSearchTerm(s.searchTerm)}
                >
                  <p>{s.searchTerm}</p>
                  <IconBox 
                    onClick={(e)=>removeSuggestion(e, s.searchTerm)} 
                    className="close"
                    >
                      <CloseIcon2 />
                  </IconBox >
                  <p className="date">{simplifyDate(s.dateAdded)}</p>
                </SearchOption>
          ))
        }
      </SearchSuggestions>
  )
}

export default Suggestions