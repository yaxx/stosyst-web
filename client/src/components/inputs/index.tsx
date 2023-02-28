import React, { ReactElement, useState } from 'react'
import { SearchIcon, ClearIcon, NumberIcon, PeekIcon, ClearInputIcon } from '../icons';
import styled, { keyframes } from 'styled-components'
import { P2 } from '../typography';
import { expenseCriteria, groupingCriteria, invCriteria } from '../../store/data';
import { useReactiveVar } from '@apollo/client/react';
import { ClearCont, ClearInputCont } from '../forms/styles';
export interface Attr {
    label: string,
    type: string,
    placeholder: string
}

const slide = keyframes`
  from {
    transform: translateY(5px);
  }

  to {
    transform: translateY(10px);
  }
`;

const InputSeparator = styled.div`
  height:50%;
  width:.11em;
  position: absolute;
  background: ${
  props => props.theme.mode === 'dark' ? props.theme.dark.colors.separators.sec : props.theme.light.colors.separators.pri
  };
  right:0px;
  top: 9px;
`
export const FileInput = styled.input`
  height:100%;
  width: 100%;
  right:0;
  top: 0;
  position: absolute;
  font-size: 10;
  opacity: 0;
  z-index: 200;
  
`
export const QtyInput = styled.input.attrs(props => ({
  placeholder: props.placeholder,
  autocomplete: 'off',
  className: 'form-control'
  }))`
  padding:0rem .22rem ;
  padding-left: 0rem;
  min-width:10px;
  width: 17px;
  height: 20px;
  border-radius: inherit;
  border:inherit;
  background: inherit; 
  text-align: right;
  font-size: ${ props => props.theme.typography.body1 };
  &:focus {
    box-shadow: none;
    outline: none;
    background: inherit;
  }
`;

export const PriceInput = styled(QtyInput)`
  width:60px;
  border-radius: 3px;
  text-align: left;
  color: rgba(60, 60, 67, 0.6);
  &:focus {
    box-shadow: none;
    outline: none;
    background: inherit;
    /* color: rgba(60, 60, 67, 0.6); */
  }
`;
const PrimaryFormGroup = styled.div<any>`
  background-color: inherit;
  height: 32px;
  border-radius: 8px;
  border: none;
  margin-bottom: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: left;
  width: ${ props => props.width}%;
  font-size: ${ props => props.theme.typography.body2 };
   label {
    font-size: 11px
    pointer-events: none;
    transition: all 2s linear;
    bottom: ${props => props.selected || props.hasInput ? '18px' : 'auto'};
  }
  input {
    bottom: ${props => props.selected || props.hasInput ? '-5px' : 'auto'};
    background-color: transparent;
  }
    .icn {
      visibility: hidden;
   }
   :hover .icn {
     visibility: visible;
   }
`
export const FormGroupCont = styled.div<any>`
  margin: 4px 0px;
  width: ${props=> props.w || 100}%;
  border-radius: 8px;
  border: 1px solid #e6e1e1;
`
const MultiFormGroup = styled.div<any>`
  background-color: inherit;
  height: 32px;
  border-radius: 8px;
  border: none;
  margin-bottom: 0px;
  display: flex;
  align-items: center;
  position: relative;
  text-align: ${ props => props.right ? 'right' : 'left'};
  border-right: 1px solid ${ props => props.right ? 'white' : 'lightgrey'};
  border-radius:0px;
  width: ${ props => props.width||50}%;
   label {
    font-size: 11px;
    width: 100%;
    pointer-events: none;
    transition: all 2s linear;
    text-align: ${ props => props.right ? 'right' : 'left'};
    bottom: ${({selected, hasInput}: any) => selected || hasInput ? '18px' : 'auto'};
  }
  input {
    width: 100%;
    font-size: 14px;
    background-color: transparent;
    text-align: ${ props => props.right ? 'right' : 'left'};
    padding-right: ${ props => props.right ? 0 : 4}px;
    bottom: ${({selected, hasInput}: any) => selected || hasInput ? '-5px' : 'auto'};
  }
  .icn {
      visibility: hidden;
   }
   :hover .icn {
     visibility: visible;
   }
`
export const MultiFormGroupContainer = styled.div<any>`
  background-color: inherit;
  height: 45px;
  width: 100%;
  border-radius: 8px;
  border: none;
  margin-bottom: 0px;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0px 10px;
  justify-content: space-between;
  border: 1px solid #e6e1e1;
`
export const DoubleFormGroup = styled.div<any>`
  width: 100%;
  height: auto;
  display: flex;

`
export const BalanceCont = styled.div<any>`
  background-color: inherit;
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;
  justify-content: center;
  p {
    margin-bottom: 0px;
    font-size: 14px;
    bottom: 3px;
    position: relative;
  }
  label {
    font-size: 11px;
    color: grey;
    margin-bottom: 0px;
  }

`

const SecondaryFormGroup = styled(PrimaryFormGroup)<any>`
  height: 40px;
  border-radius: 16px;
  width: 100%;
  border: none;
  color: ${
    props => props.theme.mode === 'dark' ? props.theme.dark.colors.labels.pri : props.theme.light.colors.labels.pri
  };
  /* background-color: ${
    props => props.theme.mode === 'dark' ? props.theme.dark.colors.backgrounds.elavations.tar : props.theme.light.colors.labels.tar 
  }; */
  &:focus {
      border: none;
  };
`
export const TatiaryFormGroup =  styled(SecondaryFormGroup)`
  height: 34px;
  border-radius: 17px;
  background-color: #d3d3d35c;
`
const StandardFormGroup = styled(PrimaryFormGroup)<any>`
  border-radius: 0px;
  height: ${props => props.h || 45}px;
  width: ${props => props.w || 100}%;
  border: none;
  border-bottom: ${props => props.top ? '1px' : '0px'} solid;
  border-left: ${props => props.right ? '1px' : '0px'} solid #d3d3d35c;
  border-bottom-color: ${props => props.top ? "#d3d3d35c" : 'white'};
  overflow: hidden;
  label {
    left: 11px;
    font-size: ${({selected, hasInput}: any) => selected || hasInput ? 11 : 13}px;
    pointer-events: none;
     color: rgb(113, 113, 113) !important;
    transition: all 0.15s cubic-bezier(0.455, 0.03, 0.515, 0.955) !important;
    /* transition: all 2s linear; */
    bottom: ${({ selected, hasInput }: any) => selected || hasInput ? '24px' : 'auto'};
  }
  input {
    padding: 0.575rem .7rem;
    padding-right: 2rem;
    border: none;
    background-color: transparent;
    bottom: ${props => props.selected || props.hasInput ? '-6px' : 'auto'};
  }
  background: ${({ selected }: any) => selected  ? 'whitesmoke' : 'initial'};
`
const StockFormGroup = styled(PrimaryFormGroup)<any>`
  height: 20px;
  width: 100%;
  margin: 0px 0px;
  border: none;
  overflow: hidden;
  border-radius: 0px;
  background-color: transparent;
  input {
    padding: 0px;
    padding-right: 5px;
    border: none;
    bottom: auto;
    background-color: transparent;
    ::placeholder {
      color: #c2bfbf71;
    }
  }
`
// const NumberGroup = styled(PrimaryFormGroup)<any> `
//   width: ${props => props.width}%;
//   margin-right: ${props => props.mr || 0}px;
// `
// const PriceAdjustGroup = styled(PrimaryFormGroup)<any>`
//   width: 100%
//   height: 30px;
//   margin-bottom:20px;
// `;

const SecondaryInput = styled.input.attrs(props => ({
    placeholder: props.placeholder,
    className: 'form-control'
  })) `
  padding: 0.575rem 2.2rem;
  height: 65%;
  bottom: 1%;
  position: absolute;
  border-radius: 0px 0px 5px 5px;
  border:none;
  background-color: none;
  font-size: 13px;
  text-align: left;
  color: ${
    props => props.theme.mode === 'dark' ? props.theme.dark.colors.labels.pri : props.theme.light.colors.labels.pri
  };
  &:focus {
    box-shadow: none;
    outline: none;
    background-color: transparent;
    color: ${
      props => props.theme.mode === 'dark' ? props.theme.dark.colors.labels.pri : props.theme.light.colors.labels.pri
    };
  }
`;
const PrimaryInput = styled(SecondaryInput)`
  padding: 0.575rem .7rem 0.575rem 0rem;
  height: 100%;
  bottom: 'auto';
  border-radius: inherit;
`
const TatiaryInput =  styled(SecondaryInput)`
  height: 100%;
  border-radius: inherit;
  border:inherit;
  background-color:rgba(71, 75, 76, 0.055);
  position: relative;
  border-radius:inherit;
  bottom: auto;
  ::placeholder {
    color:  ${
      props => props.theme.mode === 'dark' ? props.theme.dark.colors.labels.tar : props.theme.light.colors.labels.sec
  };
  };
  &:focus {
    border: 1px solid  ${
      props => props.theme.mode === 'dark' ? props.theme.dark.colors.brand : props.theme.light.colors.brand
  };
}
`
export const Number = styled(PrimaryInput)`
    padding: 0.575rem .5rem 0.575rem 0rem;
`
const Label = styled.label`
    position: absolute;
    width: auto;
    left: 0px;
    font-size: 11px;
    color: ${
          props => props.theme.mode === 'dark' ? props.theme.dark.colors.labels.sec : props.theme.light.colors.labels.sec
    };
    margin-bottom: 0px;
    background-color: transparent;
`;

export const Label3 =  styled(Label)`
  font-size: 10px;
  top: 0px;
`
export const Tagline = styled(P2)<any>`
    position: relative;
    background-color: inherit;
    font-size: ${ props => props.theme.typography.tagline };
    color:${
        props =>  props.theme.light.colors.labels.sec
      };
    span {
      color:  ${
        props => props.theme.mode === 'dark' ? props.theme.dark.colors.brand : props.theme.light.colors.brand
      };
      cursor: pointer;
    }
    margin-top:${props => props.mt ||0}px;
`
export const Info = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
export function TextInput(props: any): ReactElement {
  const { value, label, togglePasswordCallback } = props;
  const [inputSelected, resetSelection] = useState(false)
  const selectInput = () => {
    resetSelection(true)
  }
  const deSelectInput = () => {
    resetSelection(false)
  }
    return (
      <PrimaryFormGroup hasInput={value.length} selected={inputSelected} className = 'formGroup' width = { props.width }>
        <Label>{label}</Label>
        <PrimaryInput onFocus={() => selectInput()} onBlur={() => deSelectInput()}  onChange = { props.changeCallback } {...props} />
            <ClearIcon {...props}/>
            <InputSeparator/>
        </PrimaryFormGroup>
    )
}

export function StandardInput(props: Attr): ReactElement {
  return (
      <StandardFormGroup className = 'formGroup'>
          <Label>{props.label}</Label>
          <PrimaryInput autoFocus  type = {props.type || 'text'} placeholder={props.placeholder}/>
          <ClearIcon/>
      </StandardFormGroup>
  )
}
export function NameInput(props: any): ReactElement {
  const { name, value, type, label, clearCallback,required, togglePasswordCallback } = props;
  const [ inputSelected, resetSelection] = useState(false)
  const selectInput = ()=> {
    resetSelection(true) 
  }
  const deSelectInput = ()=> {
    resetSelection(false)
  }
  return (
    <StandardFormGroup hasInput={value} selected = {inputSelected} {...props} >
          <PrimaryInput  onFocus = { () => selectInput() } onBlur = { () => deSelectInput() } onChange ={ props.changeCallback }  {...props}/> {
            (type === 'password' || name === 'password') ? 
            <PeekIcon input = { type } togglePassword = { togglePasswordCallback }/>
             : 
            <ClearIcon {...props} />
          }
      <Label>
      {label}
      {required && <span style={{color: "#ff000072"}}>*</span>}
      
      </Label>
    </StandardFormGroup>
  )
}
export function MultiInput(props: any): ReactElement {
  const { name, value, clearCallback, changeCallback, label, right } = props;
  const [ inputSelected, resetSelection] = useState(false)
  const [ mouseEnter, setMouseEnter] = useState(false)

  const selectInput = ()=> {
    resetSelection(true) 
  }
  const deSelectInput = ()=> {
    resetSelection(false)
  }
  return (
    <MultiFormGroup onMouseEnter={() => setMouseEnter(true)} onMouseLeave={() => setMouseEnter(false)} {...props} hasInput={true} >
        <Label>{label}</Label>
        <PrimaryInput onChange={changeCallback} {...props}/> {
        !right && mouseEnter ?
        <ClearInputCont onClick={clearCallback}>
          <ClearInputIcon {...props} />
        </ClearInputCont>
        :
        <></>
        }
    </MultiFormGroup>
  )
}
export function StockInput(props: any): ReactElement {
  const {focusCallback, keyDownCallback, changeCallback } = props;
  return (
    <StockFormGroup>
      <PrimaryInput 
       onKeyDown={keyDownCallback} 
       onChange ={ changeCallback }  
       {...props}
       onFocus = {(e: any)=>focusCallback(e.target.name) } 
    /> 
    </StockFormGroup>
  )
}

export default function SearchInput(props: any): ReactElement {

  const {page} = props

  const [searchTerm, setSearchTerm] = useState('')
  const criteria = useReactiveVar(groupingCriteria)
  const expCrt = useReactiveVar(expenseCriteria)
  const invCrt = useReactiveVar(invCriteria)

  const handleOnchange = (query: string) => {
    setSearchTerm(query)
    page === 'expenses' ? expenseCriteria({ ...expCrt, query }) : page==='invoice' ? invCriteria({...invCrt, filter: '', query}) : groupingCriteria({ ...criteria, query, filter: '' })
  }

  const handleClear = () => {
    setSearchTerm('')
    invCriteria({...invCrt, query: '' })
    expenseCriteria({ ...expCrt, query: '' })
    groupingCriteria({ ...criteria, query: '' })
  }

  return (
      <TatiaryFormGroup>
          <SearchIcon/>
          <TatiaryInput 
            name ='search'
            value = { searchTerm } 
            placeholder = { props.placeholder }
            onChange={(e: any) => handleOnchange(e.target.value)}  
          />
        <div style={{cursor:'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',position:'absolute', right:'2%', top: 7, height: 20, width:20}} onClick={()=>handleClear()}>
          <ClearIcon />
        </div>
         
      </TatiaryFormGroup>
  )
}
