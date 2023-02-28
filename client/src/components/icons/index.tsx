import React, { ReactElement } from 'react'
import styled from 'styled-components';


const Search = styled.div<any>`
  height: 100%;
  width: 32px;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 2px;
  svg path {
    stroke: ${props => props.theme.light.colors.labels.sec};
  } 
`


const More = styled.div`
  height: 25px;
  width: 25px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    position: relative;
    top: 2px;
  }
`
export const MoreOptions = styled.div<any>`
  font-size: 12px;
  position: absolute;
  padding: 5px;
  right: ${props => props.rt || '-75px'};
  z-index: 50000;
  min-width: 150px;
  top: ${props=>props.top||'20%'};
  color: ${ props => props.theme.light.colors.labels.pri};
  background-color: ${ props => props.theme.light.colors.backgrounds.base.pri};
  border: 1px solid ${ props => props.theme.light.colors.separators.pri};
  border-radius: 10px;
`
export const OptionItem = styled.div`
    width: 100%;
    position: relative;
    cursor: default;
    p {
        margin-bottom: 0px;
        padding: 1px 10px;
        text-align: left;
        :hover {
            background-color: ${ props => props.theme.dark.colors.brand};
            color: ${ props => props.theme.dark.colors.labels.pri};
            border-radius: 4px;
        }
    }
`
const IconBox = styled.div.attrs(props=>({className:'icn'}))`
        position: absolute;
        right: 7px;
    div:first-child {
        top: 3px;
        position: relative;
    }
    div:last-child {
        bottom: 3px;
        color:${
            props => props.theme.mode === 'dark' ? props.theme.dark.colors.brand : props.theme.light.colors.brand
        };
        position: relative;
    }
    svg {
        &:hover {
            fill: {
                #593ae6;
            }
        }
        fill : #dad9d9;
        /* fill:${
            props => props.theme.mode === 'dark' ? props.theme.dark.colors.labels.pri : props.theme.light.colors.fills.pri
        }; */
    }
`
const NavIcon = styled.div<any>`
    svg {
        stroke: ${props => props.pre_loc === props.cur_loc ? props.theme.dark.colors.brand : "#C4C4C4" };
        fill: #C4C4C4;
    }
    cursor: pointer;
    &:hover svg {
        stroke:${
            props => props.theme.mode === 'dark' ? props.theme.dark.colors.brand : props.theme.light.colors.brand
        };
        fill:${
            props => props.theme.mode === 'dark' ? props.theme.dark.colors.backgrounds.base.pri : props.theme.light.colors.brand 
        };
    }
    height: 15px;
    width: 15px;
`


const Close = styled.div.attrs(({title:'Close'}))<any>`
    height:${props=>props.size || 30 }px;
    width: ${props => props.size || 30 }px;
    position: absolute;
    top:${props => props.top || "30px" };
    right: ${props => props.right || "30px" };
    border-radius: 50%;
    display:flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index:10;
    font-size: 40px;
    background-color:${props => props.bg || "#0000001c" };
    &:hover {
        background-color:${props => props.bgHover || "#0000007f" } ;
    }
`;

const Gear = styled(NavIcon)<any>`
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    width:100%;
    height: 100px;
`
const CheckMark = styled.div `
    width:17px;
    height: 17px;
    svg {
        fill: ${
            props => props.theme.mode === 'dark' ? props.theme.dark.colors.brand : props.theme.light.colors.brand 
        };
    }
`
const AngleBox = styled.div<any> `
    margin-left: 10px;
    transform: rotate(${props => props.rotation}deg);
`
const PointArror = styled.svg<any>`
  transform: rotate(${props => props.rotation}deg);
  position: relative;
`
const UpDownArror = styled.span<any>`
  position: relative;
  display: inline-block;
  margin-right: 1px;
  transform: rotate(${props => props.rotation}deg);
  bottom: ${props => props.rotation > 0 ? -2 : 2}px;
  
`
const Clear = styled(Search).attrs((props: any )=> ({
    className:'icn', 
    }))`
    right: 1px;
    left: auto;
    cursor: pointer;
`;
const Peeker = styled(Clear)`

 `
const DownAngle = styled.div`
svg {
    fill: ${props=>props.theme.dark.colors.brand};
}

`
interface Props {
    
}

export function NumberIcon(props: any): ReactElement {
    return (
        <IconBox>
            <div onClick = {(e: any) => props.adjustNumbCallback(e, props.name ,'inc')}>
                <svg width="10" height="5" viewBox="0 0 11 6" fill="none" >
                    <rect width="0.834588" height="6.99402" transform="matrix(-0.731652 -0.681679 0.731652 -0.681678 0.672852 5.33643)"  fill-opacity="0.6"/>
                    <rect width="0.83871" height="6.29645" transform="matrix(-0.731652 0.681678 -0.731652 -0.681679 10.3701 4.83496)"  fill-opacity="0.6"/>
                </svg>
            </div>
            <div onClick = {(e: any) => props.adjustNumbCallback(e, props.name, 'dec')}>
                <svg width="10" height="5" viewBox="0 0 11 6" fill="none" >
                    <rect width="0.834588" height="6.99402" transform="matrix(0.731652 0.681678 -0.731652 0.681678 9.75977 0.0703125)"  fill-opacity="0.6"/>
                    <rect width="0.83871" height="6.29645" transform="matrix(0.731652 -0.681678 0.731652 0.681678 0.0625 0.571777)"  fill-opacity="0.6"/>
                </svg>
            </div>
        </IconBox>
    )
}
export const ArrowDown = (props: any): ReactElement => {
    return (
        <DownAngle>
            <svg width="8" height="5" viewBox="0 0 11 6">
                <rect  width="0.834588" height="6.99402" transform="matrix(0.731652 0.681678 -0.731652 0.681678 9.75977 0.0703125)"  />
                <rect  width="0.83871" height="6.29645" transform="matrix(0.731652 -0.681678 0.731652 0.681678 0.0625 0.571777)" />
            </svg>
        </DownAngle>
    )
}

export const MoreIcon = (props: any) => {
    const handleClick = (e: any) => {
        e.stopPropagation();
        props.openMenuCallback()
    }
    return (
        <More onClick = { (e: any) => handleClick(e) }>
            <svg width="24" height="10" viewBox="0 0 18 4" fill={props.fill||'none'} >
                <circle cx="5" cy="1" r="1"/>
                <circle cx="9" cy="1" r="1" />
                <circle cx="13" cy="1" r="1"/>
            </svg>
        </More>
    ) 
}
export const ClearIcon = (props: any) => {
    return (
        <Clear onClick={()=>props.clearCallback(props.name)}>
            <svg width="25" height="25" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="1.24541" height="11.5771" transform="matrix(0.707024 0.707189 -0.707024 0.70719 17.3232 8.82825)" fill="#9E9C9C" fill-opacity="0.85" />
                <rect width="1.41421" height="11.5567" transform="matrix(0.707058 -0.707156 0.707125 0.707089 9.13965 9.71606)" fill="#9E9C9C" fill-opacity="0.85" />
                <ellipse cx="13.374" cy="13.207" rx="8.92791" ry="8.92792" transform="rotate(45 13.374 13.207)" fill="#ADADAD" fill-opacity="0.24" />
            </svg>
        </Clear>
    )
}
export const ClearInputIcon = (props: any) => {
    return (
        <svg width="25" height="25" viewBox="0 0 26 26" fill="none" >
            <rect width="1.24541" height="11.5771" transform="matrix(0.707024 0.707189 -0.707024 0.70719 17.3232 8.82825)" fill="#3e3d3d" fill-opacity="0.85" />
            <rect width="1.41421" height="11.5567" transform="matrix(0.707058 -0.707156 0.707125 0.707089 9.13965 9.71606)" fill="#3e3d3d" fill-opacity="0.85" />
        </svg>
    )
}
export const  CancelIcon = (props:any)=> {
    return (
        <svg style={{ position: 'absolute', right: '2px', top: '0px' }} width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="3.43914" height="28.1042" transform="matrix(0.707024 0.707189 -0.707024 0.70719 20.4932 0.512329)" fill="#9E9C9C" />
            <rect width="3.43915" height="28.1042" transform="matrix(0.707058 -0.707156 0.707125 0.707089 0.619141 2.94574)" fill="#9E9C9C" />
        </svg>
    )
}
export const PlusIcon = (props: any) => {
    return (
        <svg width="11" height="11" viewBox="0 0 13 13" fill="none">
            <title>ADD</title>
            <rect y="7.64697" width="1.52941" height="13" transform="rotate(-90 0 7.64697)" fill="#00A3FE" />
            <rect x="5.35254" width="1.52941" height="13" fill="#00A3FE" />
        </svg>
    )
} 
export const BackIcon = (props: any) => {
    return (
        <svg width="8" height="13" viewBox="0 0 10 17" fill="none" >
            <rect width="1.31603" height="11.0286" transform="matrix(-0.710482 0.703715 -0.710482 -0.703715 9.14258 15.3335)" fill="#00A3FE" />
            <rect width="1.32253" height="9.92865" transform="matrix(0.710482 0.703715 -0.710482 0.703715 8.31836 0.626465)" fill="#00A3FE" />
        </svg>
    )
} 
export const FowardIcon = (props: any) => {
    return (
        <svg width="8" height="13" viewBox="0 0 8 13" fill="none" >
            <rect x="0.311523" y="0.741211" width="1.04845" height="8.78625" transform="rotate(-45 0.311523 0.741211)" fill="#00A3FE" />
            <rect x="0.96582" y="12.5146" width="1.05363" height="7.90993" transform="rotate(-135 0.96582 12.5146)" fill="#00A3FE" />
        </svg>
    )
} 
export const EllipsisIcon2 = (props: any) => {
    return (
        <svg width="4" height="9" viewBox="0 0 4 9" fill="none">
            <circle cx="1.99908" cy="7.43815" r="1" transform="rotate(-29 1.99908 7.43815)" fill="#00A3FE" />
            <circle cx="2.00201" cy="4.7194" r="1" transform="rotate(-29 2.00201 4.7194)" fill="#00A3FE" />
            <circle cx="2.00201" cy="2.00065" r="1" transform="rotate(-29 2.00201 2.00065)" fill="#00A3FE" />
        </svg>
    )
} 

export const SearchIcon = () => (
        <Search>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" >
                <path d="M11 1C9.02219 1 7.08879 1.58649 5.4443 2.6853C3.79981 3.78412 2.51809 5.3459 1.76121 7.17316C1.00433 9.00042 0.8063 11.0111 1.19215 12.9509C1.578 14.8907 2.53041 16.6725 3.92894 18.0711C5.32746 19.4696 7.10929 20.422 9.0491 20.8078C10.9889 21.1937 12.9996 20.9957 14.8268 20.2388C16.6541 19.4819 18.2159 18.2002 19.3147 16.5557C20.4135 14.9112 21 12.9778 21 11C20.9998 8.34788 19.9462 5.80444 18.0709 3.92912C16.1956 2.05379 13.6521 1.00017 11 1V1Z" stroke="#787880" stroke-width="1" stroke-miterlimit="10"></path>
                <path d="M19 19L23 23" stroke-width="1" stroke-miterlimit="10" stroke-linecap="round"></path>
            </svg>
        </Search>
    )
export const StocksIcon = (props: any) => (
        <NavIcon className ='icn' {...props}>
            <svg viewBox="0 0 16 21" fill="none" >
            <rect x="1" y="1.6543" width="6.8891" height="6.8891" rx="1" fill="none" stroke-width="1.7" />
            <rect x="10.9688" y="2.83691" width="4.531" height="1" fill="none" />
                <rect x="10.9688" y="6.81641" width="4.531" height="1"  fill="none"/>
                <rect x="1" y="13.1113" width="6.8891" height="6.8891" rx="1"  fill="none" stroke-width="1.7" />
                <rect x="10.9688" y="14.2935" width="4.531" height="1" fill="none"/>
                <rect x="10.9688" y="18.2734" width="4.531" height="1" fill="none" />
            </svg>
        </NavIcon>
    )

export const ExpenseIcon = (props: any) => (
    <NavIcon width="14" height="14" className='icn' {...props}>
        <svg viewBox="0 0 20 20" fill="none" >
            <path d="M10 1H19" stroke-width="2" />
            <path d="M19 10V-4.76837e-07" stroke-width="2" />
            <path d="M9 11L18.4751 1.99996" stroke-width="2" />
            <mask id="path-4-inside-1_5811_3766" fill="white">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M18 18L4 18L2 18L2 16L2 2L2 -7.86805e-07L0 -8.74228e-07L-8.74228e-08 2L-7.86807e-07 18C-8.35089e-07 19.1046 0.895431 20 2 20L18 20L20 20L20 18L18 18Z" />
            </mask>
            <path d="M4 18L4 20L4 18ZM18 18L18 20L18 18ZM2 18L-7.86807e-07 18L-8.74231e-07 20L2 20L2 18ZM2 16L4 16L2 16ZM2 -7.86805e-07L4 -6.99382e-07L4 -2L2 -2L2 -7.86805e-07ZM0 -8.74228e-07L8.74225e-08 -2L-2 -2L-2 -9.6165e-07L0 -8.74228e-07ZM-8.74228e-08 2L2 2L-8.74228e-08 2ZM-7.86807e-07 18L-2 18L-7.86807e-07 18ZM2 20L2 18L2 20ZM18 20L18 22L18 20ZM20 20L20 22L22 22L22 20L20 20ZM20 18L22 18L22 16L20 16L20 18ZM4 20L18 20L18 16L4 16L4 20ZM2 20L4 20L4 16L2 16L2 20ZM-6.99382e-07 16L-7.86807e-07 18L4 18L4 16L-6.99382e-07 16ZM-8.74228e-08 2L-6.99382e-07 16L4 16L4 2L-8.74228e-08 2ZM0 -8.74228e-07L-8.74228e-08 2L4 2L4 -6.99382e-07L0 -8.74228e-07ZM2 -2L8.74225e-08 -2L-8.74225e-08 2L2 2L2 -2ZM-2 -9.6165e-07L-2 2L2 2L2 -7.86805e-07L-2 -9.6165e-07ZM-2 2L-2 18L2 18L2 2L-2 2ZM-2 18C-2 20.2091 -0.209136 22 2 22L2 18L2 18L-2 18ZM2 22L18 22L18 18L2 18L2 22ZM18 22L20 22L20 18L18 18L18 22ZM22 20L22 18L18 18L18 20L22 20ZM18 20L20 20L20 16L18 16L18 20Z"  mask="url(#path-4-inside-1_5811_3766)" />
        </svg>
    </NavIcon>
)

export const InvoiceIcon = (props: any) => (
        <NavIcon className ='icn' {...props} >
        <svg width="22" height="22" viewBox="0 0 22 20" fill="none" >
            <path d="M1 15.394L2.83008 11.1427" stroke-width="2" />
            <mask id="path-2-inside-1_3745_54733" fill="white">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.73926 10.8773C3.73936 14.8016 6.93872 17.9994 10.9057 17.9994C14.8727 17.9994 18.0721 14.8016 18.0722 10.8773L20.0722 10.8773C20.0721 15.9153 15.9681 19.9994 10.9057 19.9994C5.84328 19.9994 1.73936 15.9153 1.73926 10.8773L3.73926 10.8773ZM10.8468 1.75507L10.9646 1.75507C10.945 1.75494 10.9254 1.75488 10.9057 1.75488C10.886 1.75488 10.8664 1.75494 10.8468 1.75507Z" />
            </mask>
            <path d="M3.73926 10.8773L5.73926 10.8773L5.73921 8.87732L3.73926 8.87732L3.73926 10.8773ZM18.0722 10.8773L18.0722 8.87732L16.0722 8.87732L16.0722 10.8773L18.0722 10.8773ZM20.0722 10.8773L22.0722 10.8774L22.0722 8.87732L20.0722 8.87732L20.0722 10.8773ZM1.73926 10.8773L1.73926 8.87732L-0.260782 8.87732L-0.260742 10.8774L1.73926 10.8773ZM10.8468 1.75507L10.8342 -0.244893L10.8468 3.75507L10.8468 1.75507ZM10.9646 1.75507L10.9646 3.75507L10.9772 -0.244893L10.9646 1.75507ZM1.73926 10.8774C1.73939 15.9146 5.84252 19.9994 10.9057 19.9994L10.9057 15.9994C8.03493 15.9994 5.73933 13.6887 5.73926 10.8773L1.73926 10.8774ZM10.9057 19.9994C15.9689 19.9994 20.072 15.9146 20.0722 10.8774L16.0722 10.8773C16.0721 13.6887 13.7765 15.9994 10.9057 15.9994L10.9057 19.9994ZM20.0722 8.87732L18.0722 8.87732L18.0722 12.8773L20.0722 12.8773L20.0722 8.87732ZM10.9057 21.9994C17.0636 21.9994 22.072 17.029 22.0722 10.8774L18.0722 10.8773C18.0721 14.8016 14.8727 17.9994 10.9057 17.9994L10.9057 21.9994ZM-0.260742 10.8774C-0.260619 17.029 4.74785 21.9994 10.9057 21.9994L10.9057 17.9994C6.93871 17.9994 3.73934 14.8016 3.73926 10.8773L-0.260742 10.8774ZM3.73926 8.87732L1.73926 8.87732L1.73926 12.8773L3.73926 12.8773L3.73926 8.87732ZM10.8468 3.75507L10.9646 3.75507L10.9646 -0.244933L10.8468 -0.244933L10.8468 3.75507ZM10.9772 -0.244893C10.9534 -0.245042 10.9295 -0.245117 10.9057 -0.245117L10.9057 3.75488C10.9212 3.75488 10.9367 3.75493 10.9521 3.75503L10.9772 -0.244893ZM10.9057 -0.245117C10.8819 -0.245117 10.858 -0.245042 10.8342 -0.244893L10.8593 3.75503C10.8748 3.75493 10.8902 3.75488 10.9057 3.75488L10.9057 -0.245117Z" mask="url(#path-2-inside-1_3745_54733)" />
            <path d="M19.1484 8.479L21.0006 4.39002" stroke-width="2" />
            <mask id="path-5-inside-2_3745_54733" fill="white">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M18.0742 8.78072C18.0742 5.13476 14.9251 1.99996 10.8135 1.99996C6.70193 1.99996 3.55283 5.13476 3.55282 8.78072L1.55282 8.78072C1.55283 3.93124 5.69898 -3.86101e-05 10.8135 -3.85986e-05C15.9281 -3.8587e-05 20.0742 3.93125 20.0742 8.78074C20.0742 8.78659 20.0742 8.79244 20.0742 8.79829L20.0742 8.78072L18.0742 8.78072ZM10.8331 17.5615L10.794 17.5615C10.8005 17.5615 10.807 17.5615 10.8135 17.5615C10.82 17.5615 10.8265 17.5615 10.8331 17.5615Z" />
            </mask>
            <path d="M18.0742 8.78072L16.0742 8.78073L16.0742 10.7807L18.0742 10.7807L18.0742 8.78072ZM3.55282 8.78072L3.55282 10.7807L5.55281 10.7807L5.55282 8.78073L3.55282 8.78072ZM1.55282 8.78072L-0.447184 8.78072L-0.447188 10.7807L1.55282 10.7807L1.55282 8.78072ZM20.0742 8.79829L18.0742 8.79829L22.0742 8.80241L20.0742 8.79829ZM20.0742 8.78072L22.0742 8.78072L22.0742 6.78072L20.0742 6.78072L20.0742 8.78072ZM10.8331 17.5615L10.837 19.5615L10.8331 15.5615L10.8331 17.5615ZM10.794 17.5615L10.794 15.5615L10.7901 19.5615L10.794 17.5615ZM20.0742 8.78072C20.0742 3.93963 15.9369 -3.8587e-05 10.8135 -3.85986e-05L10.8135 3.99996C13.9133 3.99996 16.0742 6.32989 16.0742 8.78073L20.0742 8.78072ZM10.8135 -3.85986e-05C5.69015 -3.86102e-05 1.55283 3.93963 1.55282 8.78072L5.55282 8.78073C5.55282 6.32989 7.71372 3.99996 10.8135 3.99996L10.8135 -3.85986e-05ZM1.55282 10.7807L3.55282 10.7807L3.55282 6.78072L1.55282 6.78072L1.55282 10.7807ZM10.8135 -2.00004C4.69603 -2.00004 -0.447169 2.72772 -0.447184 8.78072L3.55282 8.78073C3.55282 5.13476 6.70193 1.99996 10.8135 1.99996L10.8135 -2.00004ZM22.0742 8.78074C22.0742 2.72773 16.931 -2.00004 10.8135 -2.00004L10.8135 1.99996C14.9251 1.99996 18.0742 5.13477 18.0742 8.78074L22.0742 8.78074ZM22.0742 8.80241C22.0742 8.79519 22.0742 8.78797 22.0742 8.78074L18.0742 8.78074C18.0742 8.78522 18.0742 8.78969 18.0742 8.79416L22.0742 8.80241ZM18.0742 8.78072L18.0742 8.79829L22.0742 8.79829L22.0742 8.78072L18.0742 8.78072ZM18.0742 10.7807L20.0742 10.7807L20.0742 6.78072L18.0742 6.78072L18.0742 10.7807ZM10.8331 15.5615L10.794 15.5615L10.794 19.5615L10.8331 19.5615L10.8331 15.5615ZM10.7901 19.5615C10.7979 19.5615 10.8057 19.5615 10.8135 19.5615L10.8135 15.5615C10.8083 15.5615 10.8031 15.5615 10.7979 15.5615L10.7901 19.5615ZM10.8135 19.5615C10.8213 19.5615 10.8292 19.5615 10.837 19.5615L10.8291 15.5615C10.8239 15.5615 10.8187 15.5615 10.8135 15.5615L10.8135 19.5615Z"  mask="url(#path-5-inside-2_3745_54733)" />
        </svg>
        </NavIcon>
    )
export const DashboardIcon = (props: any) => (
    <NavIcon className ='icn' {...props}>
        <svg width="18" height="18" viewBox="0 0 20 18" fill="none" >
            <path d="M8 11.5V17H3V11.5C3 10.1193 4.11929 9 5.5 9C6.88071 9 8 10.1193 8 11.5Z" fill="none"  stroke-width="2" />
            <path d="M17 3.5V17H12V3.5C12 2.11929 13.1193 1 14.5 1C15.8807 1 17 2.11929 17 3.5Z" fill="none" stroke-width="2" />
            <line y1="17" x2="20" y2="17" stroke-width="2" />
        </svg>
    </NavIcon>
)
export const NotifIcon = (props: any) => (
    <NavIcon className ='icn' {...props} >
        <svg width="16" height="20" viewBox="0 0 16 20" fill="none" >
            <title>Notifications</title>
            <path stroke="grey" d="M15 8.17676V16.1179H1V8.17677C1 4.31077 4.13401 1.17676 8 1.17676C11.866 1.17676 15 4.31076 15 8.17676Z"  stroke-width="2" />
            <path stroke="grey" d="M4.70605 19.0005H11.2943"  stroke-width="2" />
        </svg>
    </NavIcon>
)
export const LogoIcon = (props: any) => (
    <svg width="40" height="40" viewBox="0 0 133 134" fill="none" >
        <mask id="path-1-inside-1_3827_2514" fill="white">
            <path d="M87.5374 22.0678C77.8081 17.5549 66.8889 16.333 56.431 18.5868C45.9732 20.8407 36.5454 26.4476 29.5735 34.5598C22.6016 42.672 18.4648 52.8482 17.7885 63.5496C17.1123 74.2509 19.9335 84.8953 25.8255 93.873C31.7174 102.851 40.3597 109.674 50.4454 113.31C60.5311 116.946 71.5116 117.198 81.7264 114.027C91.9412 110.856 100.835 104.435 107.062 95.7348C113.289 87.0348 116.512 76.5289 116.242 65.8059L104.152 66.0643C104.356 74.1561 101.924 82.084 97.225 88.6491C92.5258 95.2143 85.8146 100.06 78.1064 102.452C70.3981 104.845 62.112 104.655 54.5012 101.911C46.8904 99.1676 40.3688 94.019 35.9227 87.2442C31.4765 80.4695 29.3476 72.437 29.8579 64.3617C30.3682 56.2863 33.4899 48.6071 38.751 42.4856C44.0121 36.364 51.1264 32.1329 59.0181 30.4321C66.9098 28.7313 75.1496 29.6534 82.4914 33.0589L87.5374 22.0678Z" />
        </mask>
        <path d="M87.5374 22.0678C77.8081 17.5549 66.8889 16.333 56.431 18.5868C45.9732 20.8407 36.5454 26.4476 29.5735 34.5598C22.6016 42.672 18.4648 52.8482 17.7885 63.5496C17.1123 74.2509 19.9335 84.8953 25.8255 93.873C31.7174 102.851 40.3597 109.674 50.4454 113.31C60.5311 116.946 71.5116 117.198 81.7264 114.027C91.9412 110.856 100.835 104.435 107.062 95.7348C113.289 87.0348 116.512 76.5289 116.242 65.8059L104.152 66.0643C104.356 74.1561 101.924 82.084 97.225 88.6491C92.5258 95.2143 85.8146 100.06 78.1064 102.452C70.3981 104.845 62.112 104.655 54.5012 101.911C46.8904 99.1676 40.3688 94.019 35.9227 87.2442C31.4765 80.4695 29.3476 72.437 29.8579 64.3617C30.3682 56.2863 33.4899 48.6071 38.751 42.4856C44.0121 36.364 51.1264 32.1329 59.0181 30.4321C66.9098 28.7313 75.1496 29.6534 82.4914 33.0589L87.5374 22.0678Z" fill="white" stroke="white" stroke-width="3.67665" mask="url(#path-1-inside-1_3827_2514)" />
        <mask id="path-2-inside-2_3827_2514" fill="white">
            <path d="M91.543 24.4805C94.7816 26.4721 97.7813 28.8307 100.482 31.5095L91.6016 40.4983C89.5937 38.507 87.3639 36.7537 84.9565 35.2733L91.543 24.4805Z" />
        </mask>
        <path d="M91.543 24.4805C94.7816 26.4721 97.7813 28.8307 100.482 31.5095L91.6016 40.4983C89.5937 38.507 87.3639 36.7537 84.9565 35.2733L91.543 24.4805Z" fill="white" stroke="white" stroke-width="7.35331" mask="url(#path-2-inside-2_3827_2514)" />
        <mask id="path-3-inside-3_3827_2514" fill="white">
            <path d="M112.142 49.7812C113.404 52.896 114.347 56.1304 114.956 59.4344L102.517 61.6866C102.065 59.2306 101.364 56.8262 100.425 54.5109L112.142 49.7812Z" />
        </mask>
        <path d="M112.142 49.7812C113.404 52.896 114.347 56.1304 114.956 59.4344L102.517 61.6866C102.065 59.2306 101.364 56.8262 100.425 54.5109L112.142 49.7812Z" fill="white" stroke="white" stroke-width="7.35331" mask="url(#path-3-inside-3_3827_2514)" />
        <mask id="path-4-inside-4_3827_2514" fill="white">
            <path d="M104.228 35.6691C106.7 38.7456 108.795 42.1061 110.471 45.6788L99.0264 51.031C97.7809 48.3752 96.2231 45.8772 94.3862 43.5903L104.228 35.6691Z" />
        </mask>
        <path d="M104.228 35.6691C106.7 38.7456 108.795 42.1061 110.471 45.6788L99.0264 51.031C97.7809 48.3752 96.2231 45.8772 94.3862 43.5903L104.228 35.6691Z" fill="#f7f7f7" stroke="white" stroke-width="7.35331" mask="url(#path-4-inside-4_3827_2514)" />
        <ellipse rx="23.0002" ry="23.0404" transform="matrix(0.417227 -0.908802 0.907162 0.420781 65.8854 66.5282)" fill="white" />
    </svg>
)
export const SummaryIcon = (props: any) => (
    <NavIcon className ='icn' {...props}>
        <svg width="19" height="20" viewBox="0 0 18 20" fill="none" >
            <rect x="1" y="1" width="16" height="18" rx="2"  stroke-width="2" />
            <line x1="4" y1="7" x2="12.1" y2="7"  stroke-width="2" />
            <line x1="4" y1="12" x2="13" y2="12"  stroke-width="2" />
        </svg>
    </NavIcon>
)
export const BagIcon = (props: any) => (
    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" >
        <path d="M3.01379 3.53044H10.9633C11.7386 3.53044 12.3671 4.15893 12.3671 4.9342V12.8253C12.3671 13.6005 11.7386 14.229 10.9633 14.229H3.01379C2.23852 14.229 1.61003 13.6005 1.61003 12.8253V4.9342C1.61003 4.15893 2.23852 3.53044 3.01379 3.53044Z" stroke="white" stroke-width="1.53647" />
        <path d="M4.11986 3.15751C4.11986 2.74287 4.19935 2.33229 4.3538 1.94921C4.50825 1.56613 4.73464 1.21806 5.02003 0.924866C5.30542 0.631671 5.64422 0.399096 6.0171 0.240421C6.38998 0.0817447 6.78963 7.53221e-05 7.19323 7.53403e-05C7.59683 7.53584e-05 7.99648 0.0817448 8.36936 0.240421C8.74224 0.399097 9.08104 0.631671 9.36643 0.924866C9.65182 1.21806 9.8782 1.56613 10.0327 1.94921C10.1871 2.33229 10.2666 2.74287 10.2666 3.15751L8.87313 3.15751C8.87313 2.93087 8.82968 2.70644 8.74525 2.49706C8.66083 2.28767 8.53709 2.09741 8.3811 1.93715C8.2251 1.77689 8.03991 1.64977 7.8361 1.56303C7.63228 1.4763 7.41384 1.43166 7.19323 1.43166C6.97262 1.43166 6.75417 1.4763 6.55036 1.56303C6.34654 1.64977 6.16135 1.77689 6.00536 1.93715C5.84937 2.09741 5.72563 2.28767 5.6412 2.49706C5.55678 2.70644 5.51333 2.93087 5.51333 3.15751H4.11986Z" fill="white" />
        <ellipse cx="5.04025" cy="3.84345" rx="0.768343" ry="0.789358" transform="rotate(-180 5.04025 3.84345)" fill="white" />
        <ellipse cx="9.384" cy="3.84345" rx="0.768343" ry="0.789358" transform="rotate(-180 9.384 3.84345)" fill="white" />
    </svg>
)
export const SortAngle = (props: any) => (
    <svg width="9" height="6" viewBox="0 0 9 6" fill="none" >
        <path d="M4.5 6L8.39711 0.75H0.602886L4.5 6Z" fill="#00A3FE" />
    </svg>
)
export const GearIcon = (props: any) => (
    <Gear className='icn' {...props}>
        <svg width="20" height="20" viewBox="0 0 30 30" fill="none" >
            <path stroke-width="2.5" d="M15.3698 1.1495L16.8986 2.82987C17.321 3.29414 17.9878 3.44633 18.5698 3.21131L20.6763 2.36066C20.9496 2.25029 21.2586 2.3991 21.3427 2.6816L21.991 4.85887C22.1701 5.46044 22.7049 5.88687 23.3312 5.92764L25.5982 6.0752C25.8923 6.09435 26.1061 6.36248 26.0593 6.65351L25.6988 8.89645C25.5991 9.51616 25.8959 10.1324 26.4425 10.4409L28.4209 11.5574C28.6776 11.7023 28.754 12.0366 28.5855 12.2785L27.2875 14.1429C26.9288 14.658 26.9288 15.342 27.2875 15.8571L28.5855 17.7215C28.754 17.9634 28.6776 18.2977 28.4209 18.4426L26.4425 19.5591C25.8959 19.8676 25.5991 20.4838 25.6988 21.1035L26.0593 23.3465C26.1061 23.6375 25.8923 23.9057 25.5982 23.9248L23.3312 24.0724C22.7049 24.1131 22.1701 24.5396 21.991 25.1411L21.3427 27.3184C21.2586 27.6009 20.9496 27.7497 20.6763 27.6393L18.5698 26.7887C17.9878 26.5537 17.321 26.7059 16.8986 27.1701L15.3698 28.8505C15.1715 29.0685 14.8285 29.0685 14.6302 28.8505L13.1014 27.1701C12.679 26.7059 12.0122 26.5537 11.4302 26.7887L9.32371 27.6393C9.05039 27.7497 8.7414 27.6009 8.65728 27.3184L8.00897 25.1411C7.82985 24.5396 7.29512 24.1131 6.66878 24.0724L4.40184 23.9248C4.1077 23.9057 3.89387 23.6375 3.94065 23.3465L4.30123 21.1035C4.40086 20.4838 4.10411 19.8676 3.55748 19.5591L1.57906 18.4426C1.32236 18.2977 1.24604 17.9634 1.41446 17.7215L2.71252 15.8571C3.07116 15.342 3.07116 14.658 2.71252 14.1429L1.41446 12.2785C1.24604 12.0366 1.32236 11.7023 1.57906 11.5574L3.55748 10.4409C4.10411 10.1324 4.40086 9.51616 4.30123 8.89645L3.94065 6.65351C3.89387 6.36248 4.1077 6.09435 4.40184 6.0752L6.66878 5.92764C7.29513 5.88687 7.82985 5.46044 8.00897 4.85887L8.65728 2.6816C8.7414 2.3991 9.05039 2.25029 9.32371 2.36066L11.4302 3.21131C12.0122 3.44633 12.679 3.29414 13.1014 2.82987L14.6302 1.1495C14.8285 0.931472 15.1715 0.931472 15.3698 1.1495Z" fill="none" />
            <circle cx="15" cy="15" r="5" fill="none" stroke-width="3" />
        </svg>
    </Gear>
)

export const CheckIcon = (props: any) => (
    <svg width="14" height="12" viewBox="0 0 18 16" fill="none">
        <line x1="0.587785" y1="8.13776" x2="8.94193" y2="14.2074" stroke-width="2" />
        <path d="M8.34493 13.3218L16.8756 1.07228"  stroke-width="2" />
    </svg>
)
export const Marker = (props: any) => (
        <svg width="12" height="9" viewBox="0 0 18 15" fill="none">
            <line x1="0.587785" y1="8.06574" x2="8.94193" y2="14.1354" stroke-width="2" />
            <path d="M8.34493 13.2495L16.8756 1.00001"  stroke-width="2" />
        </svg>
)
export const SmallCheckMark = () => (
    <svg width="12" height="8" viewBox="0 0 12 12" fill="none" >
        <line x1="0.437935" y1="7.03981" x2="5.08262" y2="10.4144" stroke="#00A3FE" stroke-width="1.49012" />
        <line x1="4.39723" y1="10.0054" x2="11.2581" y2="0.562228" stroke="#00A3FE" stroke-width="1.49012" />
    </svg>
    )
export const PeekIcon = (props: any) => (
        <Peeker onClick ={() => props.togglePassword() }> {
            props.input === 'text' ? 
            <svg width="16" height="16" viewBox="0 0 22 22" fill="none" >
                <path opacity="0.8" fill-rule="evenodd" clip-rule="evenodd" d="M12.2244 5.94073C11.8019 5.83028 11.3585 5.77148 10.9014 5.77148C8.02051 5.77148 5.68511 8.10688 5.68511 10.9877C5.68511 13.8686 8.02051 16.204 10.9014 16.204C13.6522 16.204 15.9057 14.0747 16.1035 11.3744C15.745 11.4994 15.3597 11.5673 14.9585 11.5673C13.0379 11.5673 11.481 10.0104 11.481 8.08981C11.481 7.2786 11.7588 6.53227 12.2244 5.94073Z" fill="#808080" />
                <mask id="path-2-inside-1_3823_2519" fill="white">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20 11.4244C19.9999 6.69819 16.1473 2.85039 11.3745 2.85039C6.60178 2.85039 2.7492 6.69819 2.74908 11.4244L0.749081 11.4244C0.749197 5.58452 5.50633 0.850393 11.3745 0.850393C17.2427 0.850393 21.9999 5.58452 22 11.4244L20 11.4244ZM11.443 21.9986L11.3061 21.9986C11.3289 21.9988 11.3517 21.9989 11.3745 21.9989C11.3974 21.9989 11.4202 21.9988 11.443 21.9986Z" />
                </mask>
                <path d="M20 11.4246L18 11.4246L18 13.4246L20 13.4246L20 11.4246ZM2.74908 11.4246L2.74908 13.4246L4.74903 13.4246L4.74908 11.4246L2.74908 11.4246ZM0.749081 11.4246L-1.25092 11.4245L-1.25096 13.4246L0.749081 13.4246L0.749081 11.4246ZM22 11.4246L22 13.4246L24 13.4246L24 11.4245L22 11.4246ZM11.443 21.9988L11.4555 23.9988L11.443 19.9988L11.443 21.9988ZM11.3061 21.9988L11.3061 19.9988L11.2936 23.9988L11.3061 21.9988ZM22 11.4245C21.9999 5.5853 17.2434 0.850555 11.3745 0.850555L11.3745 4.85055C15.0512 4.85055 17.9999 7.81141 18 11.4246L22 11.4245ZM11.3745 0.850555C5.50571 0.850555 0.749224 5.5853 0.749081 11.4245L4.74908 11.4246C4.74917 7.81141 7.69785 4.85055 11.3745 4.85055L11.3745 0.850555ZM0.749081 13.4246L2.74908 13.4246L2.74908 9.42458L0.749081 9.42458L0.749081 13.4246ZM11.3745 -1.14945C4.4109 -1.14945 -1.25078 4.47099 -1.25092 11.4245L2.74908 11.4246C2.74917 6.69838 6.60177 2.85055 11.3745 2.85055L11.3745 -1.14945ZM24 11.4245C23.9999 4.47099 18.3382 -1.14945 11.3745 -1.14945L11.3745 2.85055C16.1473 2.85055 19.9999 6.69838 20 11.4246L24 11.4245ZM20 13.4246L22 13.4246L22 9.42457L20 9.42457L20 13.4246ZM11.443 19.9988L11.3061 19.9988L11.3061 23.9988L11.443 23.9988L11.443 19.9988ZM11.2936 23.9988C11.3206 23.9989 11.3475 23.999 11.3745 23.999L11.3745 19.999C11.3559 19.999 11.3373 19.999 11.3187 19.9988L11.2936 23.9988ZM11.3745 23.999C11.4015 23.999 11.4285 23.9989 11.4555 23.9988L11.4304 19.9988C11.4118 19.999 11.3932 19.999 11.3745 19.999L11.3745 23.999Z" fill="#808080" mask="url(#path-2-inside-1_3823_2519)" />
            </svg>
            :
            <svg width="16" height="16" viewBox="0 0 22 22" fill="none" >
                <mask id="path-1-inside-1_3823_2519" fill="white">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20 11.4246L22 11.4246C21.9999 5.58468 17.2427 0.850555 11.3745 0.850555C8.30718 0.850555 5.54339 2.14403 3.60387 4.2128L4.71205 5.48741L4.92462 5.73192C6.50313 3.96537 8.80554 2.85055 11.3745 2.85055C16.1473 2.85055 19.9999 6.69836 20 11.4246ZM11.443 21.9988L11.3061 21.9988C11.3289 21.999 11.3517 21.999 11.3745 21.999C11.3974 21.999 11.4202 21.999 11.443 21.9988ZM4.11988 6.78542C3.25217 8.12371 2.74912 9.7168 2.74908 11.4246L0.749081 11.4246C0.749126 9.10953 1.49673 6.96825 2.76477 5.22677L3.7321 6.33939L4.11988 6.78542Z" />
                </mask>
                <path d="M20 11.4246L18 11.4246L18 13.4246L20 13.4246L20 11.4246ZM22 11.4246L22 13.4246L24 13.4246L24 11.4245L22 11.4246ZM3.60387 4.2128L2.14482 2.8449L0.909749 4.16227L2.09455 5.52503L3.60387 4.2128ZM4.71205 5.48741L6.22137 4.17519L6.22137 4.17519L4.71205 5.48741ZM4.92462 5.73192L3.4153 7.04415L4.90408 8.75654L6.41598 7.06453L4.92462 5.73192ZM11.443 21.9988L11.4555 23.9988L11.443 19.9988L11.443 21.9988ZM11.3061 21.9988L11.3061 19.9988L11.2936 23.9988L11.3061 21.9988ZM2.74908 11.4246L2.74908 13.4246L4.74903 13.4246L4.74908 11.4246L2.74908 11.4246ZM4.11988 6.78542L5.79802 7.87347L6.61736 6.60977L5.6292 5.47319L4.11988 6.78542ZM0.749081 11.4246L-1.25092 11.4245L-1.25096 13.4246L0.749081 13.4246L0.749081 11.4246ZM2.76477 5.22677L4.27409 3.91454L2.62628 2.01923L1.14796 4.04951L2.76477 5.22677ZM3.7321 6.33939L5.24142 5.02717L5.24142 5.02717L3.7321 6.33939ZM20 13.4246L22 13.4246L22 9.42457L20 9.42457L20 13.4246ZM24 11.4245C23.9999 4.47099 18.3382 -1.14945 11.3745 -1.14945L11.3745 2.85055C16.1473 2.85055 19.9999 6.69838 20 11.4246L24 11.4245ZM11.3745 -1.14945C7.73326 -1.14945 4.44774 0.388503 2.14482 2.8449L5.06293 5.5807C6.63904 3.89956 8.8811 2.85055 11.3745 2.85055L11.3745 -1.14945ZM2.09455 5.52503L3.20272 6.79964L6.22137 4.17519L5.1132 2.90057L2.09455 5.52503ZM3.20272 6.79964L3.4153 7.04415L6.43395 4.41969L6.22137 4.17519L3.20272 6.79964ZM6.41598 7.06453C7.62986 5.70605 9.39684 4.85055 11.3745 4.85055L11.3745 0.850555C8.21423 0.850555 5.37641 2.22468 3.43326 4.39931L6.41598 7.06453ZM11.3745 4.85055C15.0512 4.85055 17.9999 7.81141 18 11.4246L22 11.4245C21.9999 5.5853 17.2434 0.850555 11.3745 0.850555L11.3745 4.85055ZM11.443 19.9988L11.3061 19.9988L11.3061 23.9988L11.443 23.9988L11.443 19.9988ZM11.2936 23.9988C11.3206 23.9989 11.3475 23.999 11.3745 23.999L11.3745 19.999C11.3559 19.999 11.3373 19.999 11.3187 19.9988L11.2936 23.9988ZM11.3745 23.999C11.4015 23.999 11.4285 23.9989 11.4555 23.9988L11.4304 19.9988C11.4118 19.999 11.3932 19.999 11.3745 19.999L11.3745 23.999ZM4.74908 11.4246C4.74911 10.1153 5.1336 8.89822 5.79802 7.87347L2.44174 5.69737C1.37074 7.34921 0.749132 9.31835 0.749081 11.4245L4.74908 11.4246ZM0.749081 13.4246L2.74908 13.4246L2.74908 9.42458L0.749081 9.42458L0.749081 13.4246ZM1.14796 4.04951C-0.360295 6.1209 -1.25086 8.67172 -1.25092 11.4245L2.74908 11.4246C2.74912 9.54734 3.35376 7.81559 4.38158 6.40403L1.14796 4.04951ZM5.24142 5.02717L4.27409 3.91454L1.25545 6.539L2.22278 7.65162L5.24142 5.02717ZM5.6292 5.47319L5.24142 5.02717L2.22278 7.65162L2.61056 8.09765L5.6292 5.47319Z" fill="#808080" mask="url(#path-1-inside-1_3823_2519)" />
                <rect x="2.47349" y="2.07082" width="1.10042" height="21.6591" transform="rotate(-41.0042 2.47349 2.07082)" stroke="#808080" stroke-width="1.10042" />
                <path opacity="0.8" fill-rule="evenodd" clip-rule="evenodd" d="M12.2243 5.94072C11.8018 5.83028 11.3585 5.77148 10.9014 5.77148C9.30753 5.77148 7.88065 6.48632 6.92384 7.61287L13.6902 15.3967C15.0469 14.5367 15.9795 13.0678 16.1035 11.3743C15.745 11.4993 15.3597 11.5672 14.9585 11.5672C13.0379 11.5672 11.481 10.0103 11.481 8.08971C11.481 7.27854 11.7587 6.53224 12.2243 5.94072ZM5.6851 10.9877C5.6851 10.3001 5.81815 9.64362 6.05989 9.0425L12.1538 16.0527C11.7526 16.1516 11.3331 16.204 10.9014 16.204C8.0205 16.204 5.6851 13.8686 5.6851 10.9877Z" fill="#808080" />
            </svg>
        }
        </Peeker>
    )
    
export const RightAngle = (props: any) => (
        <AngleBox {...props}>
            <svg width="8" height="13" viewBox="0 0 8 13" fill="none" >
                <rect x="0.311523" y="0.741211" width="1.04845" height="8.78625" transform="rotate(-45 0.311523 0.741211)" fill="black"/>
                <rect x="0.96582" y="12.5146" width="1.05363" height="7.90993" transform="rotate(-135 0.96582 12.5146)" fill="black"/>
            </svg>
        </AngleBox>
    )
export const CartIcon = () => (
        <NavIcon>
           <svg width="20" height="20" viewBox="0 0 22 22" fill="none" >
                <path d="M0.513184 0.962891H4.07613L6.74835 15.9341H21.0001" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6.26876 12.066H17.0684C17.1485 12.066 17.2262 12.0342 17.2882 11.976C17.3501 11.9177 17.3926 11.8366 17.4083 11.7464L18.6552 4.59033C18.6653 4.53263 18.6641 4.47308 18.6516 4.41598C18.6392 4.35889 18.6159 4.30567 18.5834 4.26017C18.5509 4.21467 18.51 4.17803 18.4636 4.15288C18.4173 4.12773 18.3666 4.11471 18.3153 4.11475H4.8833" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                <circle r="1.5" transform="matrix(1 0 0 -1 8.92487 18.9868)" stroke="white" stroke-width="1.37318"/>
                <circle r="1.5" transform="matrix(1 0 0 -1 17.6715 18.9868)" stroke="white" stroke-width="1.37318"/>
            </svg>
        </NavIcon>
    )
export const CloseIcon = (props: any) => (
        <Close onClick={()=>props.clickCallback()} {...props}>
        <svg width={props.iconWidth || "24"} height={props.iconHeight || "23"} viewBox="0 0 24 23" fill="none" >
                <rect width="1.35905" height="8.15428" transform="matrix(0.707074 -0.70714 0.707072 0.707141 8.9668 9.60986)" fill="white" />
            <rect width="1.35905" height="8.15428" transform="matrix(0.707073 0.70714 -0.707073 0.70714 14.4014 8.64844)" fill="white"/>
            </svg>
        </Close>
    )
export const InfoIcon = (props: any) => (
        <div className ='icon'>
           <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
                <path d="M10.1875 3C6.21836 3 3 6.21836 3 10.1875C3 14.1566 6.21836 17.375 10.1875 17.375C14.1566 17.375 17.375 14.1566 17.375 10.1875C17.375 6.21836 14.1566 3 10.1875 3Z" stroke="white" stroke-miterlimit="12"/>
                <path d="M10 9H10.5859V12.53" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 13H12" stroke="white" stroke-miterlimit="10" stroke-linecap="round"/>
                <path d="M10.6471 5.99707C10.5185 5.99707 10.3928 6.03519 10.2859 6.10662C10.1791 6.17804 10.0957 6.27955 10.0465 6.39833C9.99735 6.5171 9.98448 6.64779 10.0096 6.77388C10.0346 6.89997 10.0965 7.01579 10.1875 7.10669C10.2784 7.19759 10.3942 7.2595 10.5203 7.28458C10.6463 7.30966 10.777 7.29679 10.8958 7.24759C11.0146 7.19839 11.1161 7.11508 11.1875 7.00819C11.2589 6.9013 11.2971 6.77563 11.2971 6.64707C11.2971 6.47468 11.2286 6.30935 11.1067 6.18745C10.9848 6.06555 10.8195 5.99707 10.6471 5.99707V5.99707Z" fill="white"/>
           </svg>
        </div>
    )
export const AlertIcon = (props: any) => (
        <svg  className='ionicon' viewBox='0 0 512 512'>
            <title>Mark as paid</title>
            <path d='M256 80c-8.66 0-16.58 7.36-16 16l8 216a8 8 0 008 8h0a8 8 0 008-8l8-216c.58-8.64-7.34-16-16-16z' fill='none' stroke='red' stroke-linecap='round' stroke-linejoin='round' stroke-width='5'/>
        <circle cx='256' cy='416' r='12' fill='red' stroke='red' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg>
    )
export const Times = (props: any) => (
    <svg width="5" height="5" viewBox="0 0 5 5" fill="none" >
        <rect width="0.812992" height="4.87795" transform="matrix(0.707074 -0.70714 0.707072 0.707141 0.251953 0.575195)" fill="white"/>
        <rect width="0.812992" height="4.87795" transform="matrix(0.707073 0.70714 -0.707073 0.70714 3.50293 0)" fill="white"/>
    </svg>
)
export const DownArror = ({color, rotation}:any) => {
   return ( 
       <UpDownArror rotation = {rotation}>
           <svg width="8" height="9" viewBox="0 0 8 9" fill="none">
               <path d="M4.35355 0.646447C4.15829 0.451184 3.84171 0.451184 3.64645 0.646447L0.464466 3.82843C0.269204 4.02369 0.269204 4.34027 0.464466 4.53553C0.659728 4.7308 0.97631 4.7308 1.17157 4.53553L4 1.70711L6.82843 4.53553C7.02369 4.7308 7.34027 4.7308 7.53553 4.53553C7.7308 4.34027 7.7308 4.02369 7.53553 3.82843L4.35355 0.646447ZM4.5 9L4.5 1H3.5L3.5 9H4.5Z" fill={color} />
           </svg>
      </UpDownArror>
   )
}
export const NetworkIcon = (props: any) => (
    <svg width="46" height="50" viewBox="0 0 46 50" fill="none" >
        <mask id="path-1-inside-1" fill="#00A3FE">
            <path d="M4.42175 9.44093C6.59442 6.46399 9.45066 4.05276 12.7499 2.41031C16.0491 0.767855 19.6948 -0.0577128 23.3797 0.00313496C27.0647 0.0639827 30.6811 1.00946 33.9243 2.75995C37.1675 4.51043 39.9426 7.01465 42.0158 10.0617L40.6527 10.9892C38.7281 8.16054 36.1519 5.83583 33.1412 4.21083C30.1305 2.58582 26.7733 1.70812 23.3525 1.65163C19.9317 1.59515 16.5474 2.36153 13.4847 3.88625C10.4219 5.41096 7.77043 7.64935 5.7535 10.4129L4.42175 9.44093Z"/>
        </mask>
        <path d="M4.42175 9.44093C6.59442 6.46399 9.45066 4.05276 12.7499 2.41031C16.0491 0.767855 19.6948 -0.0577128 23.3797 0.00313496C27.0647 0.0639827 30.6811 1.00946 33.9243 2.75995C37.1675 4.51043 39.9426 7.01465 42.0158 10.0617L40.6527 10.9892C38.7281 8.16054 36.1519 5.83583 33.1412 4.21083C30.1305 2.58582 26.7733 1.70812 23.3525 1.65163C19.9317 1.59515 16.5474 2.36153 13.4847 3.88625C10.4219 5.41096 7.77043 7.64935 5.7535 10.4129L4.42175 9.44093Z" stroke="##b6b5b5" stroke-width="2" mask="url(#path-1-inside-1)"/>
        <mask id="path-2-inside-2" fill="white">
            <path d="M36.0949 16.6711C32.5927 13.3942 27.9893 11.5495 23.1934 11.501C18.3975 11.4525 13.7578 13.2038 10.1901 16.4092L11.4254 17.7842C14.649 14.8879 18.8414 13.3055 23.1747 13.3493C27.5081 13.3931 31.6676 15.06 34.832 18.0208L36.0949 16.6711Z"/>
        </mask>
        <path d="M36.0949 16.6711C32.5927 13.3942 27.9893 11.5495 23.1934 11.501C18.3975 11.4525 13.7578 13.2038 10.1901 16.4092L11.4254 17.7842C14.649 14.8879 18.8414 13.3055 23.1747 13.3493C27.5081 13.3931 31.6676 15.06 34.832 18.0208L36.0949 16.6711Z" stroke="#00A3FE" stroke-width="2" mask="url(#path-2-inside-2)"/>
        <circle r="5.05827" transform="matrix(0.999961 -0.00883366 -0.00883366 -0.999961 23.0587 26.8923)" stroke="#b6b5b5" stroke-width="1.4"/>
        <rect width="1.55823" height="9.34941" transform="matrix(0.707074 -0.70714 0.707072 0.707141 34.8799 4.93604)" fill="#F68C8C"/>
        <rect width="1.55823" height="9.34941" transform="matrix(0.707073 0.70714 -0.707073 0.70714 41.1104 3.8335)" fill="#F68C8C"/>
    </svg>
)

export const SortIcon = () => (
    <svg width="8" height="4" viewBox="0 0 6 3" fill="none">
        <path d="M3 3L0.401924 0H5.59808L3 3Z" fill="#00A3FE"/>
    </svg>
)
export const PointedArror = (props: any) => (
    <div onClick = {()=>props.toggleCallback()} className ='arrorBox'>
        <PointArror rotation = {props.rotation} width="13" height="12" viewBox="0 0 10 8" fill="none" >
            <path d="M0.646062 3.64606C0.450587 3.84154 0.450587 4.15846 0.646062 4.35394L3.83151 7.53938C4.02698 7.73486 4.34391 7.73486 4.53938 7.53938C4.73486 7.34391 4.73486 7.02698 4.53938 6.83151L1.70788 4L4.53938 1.16849C4.73486 0.973019 4.73486 0.656092 4.53938 0.460617C4.34391 0.265143 4.02698 0.265143 3.83151 0.460617L0.646062 3.64606ZM10 3.49946L1 3.49946V4.50054L10 4.50054V3.49946Z" fill="#00A3FE"/>
        </PointArror>
    </div>
)
export const OpenedPeeker = (props: any) => (
    <svg width="17" height="15" viewBox="0 0 17 15" fill="none">
        <mask id="path-1-inside-1" fill="white">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 7.49991C0.939873 11.2349 4.32075 14 8.34744 14C12.3741 14 15.755 11.2349 16.6949 7.49991C15.755 3.76491 12.3741 0.999821 8.34744 0.999821C4.32075 0.999821 0.939873 3.76491 0 7.49991Z"/>
        </mask>
        <path d="M0 7.49991L-0.71636 7.68017L-0.761721 7.49991L-0.71636 7.31965L0 7.49991ZM16.6949 7.49991L17.4112 7.31964L17.4566 7.49991L17.4112 7.68017L16.6949 7.49991ZM0.71636 7.31965C1.5756 10.7342 4.66732 13.2613 8.34744 13.2613V14.7387C3.97417 14.7387 0.304148 11.7356 -0.71636 7.68017L0.71636 7.31965ZM8.34744 13.2613C12.0276 13.2613 15.1193 10.7342 15.9785 7.31964L17.4112 7.68017C16.3907 11.7356 12.7207 14.7387 8.34744 14.7387V13.2613ZM15.9785 7.68017C15.1193 4.26561 12.0276 1.73851 8.34744 1.73851V0.261128C12.7207 0.261128 16.3907 3.2642 17.4112 7.31964L15.9785 7.68017ZM8.34744 1.73851C4.66732 1.73851 1.5756 4.26561 0.71636 7.68017L-0.71636 7.31965C0.304148 3.26421 3.97417 0.261128 8.34744 0.261128V1.73851Z" fill="black" mask="url(#path-1-inside-1)"/>
        <circle cx="8.12526" cy="7.35182" r="2.21608" fill="black"/>
        <line x1="3.40687" y1="0.709381" x2="13.4069" y2="14.7094" stroke="black"/>
    </svg>
)
export const Pensil = (props: any) => (
    <svg width="10" height="10" viewBox="0 0 19 18" fill="none" >
        <path d="M11.06 6L12 6.94L2.92 16H2V15.08L11.06 6ZM14.66 0C14.41 0 14.15 0.1 13.96 0.29L12.13 2.12L15.88 5.87L17.71 4.04C18.1 3.65 18.1 3 17.71 2.63L15.37 0.29C15.17 0.09 14.92 0 14.66 0ZM11.06 3.19L0 14.25V18H3.75L14.81 6.94L11.06 3.19Z" fill="white"/>
    </svg>
)
export const FilterIcon = () => (
    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="5" y1="8.5" x2="14" y2="8.5" stroke="#C4C4C4" />
        <line x1="1" y1="13.5" x2="8" y2="13.5" stroke="#C4C4C4" />
        <line x1="12" y1="3.5" x2="14" y2="3.5" stroke="#C4C4C4" />
        <line x1="12" y1="13.5" x2="14.1667" y2="13.5" stroke="#C4C4C4" />
        <line x1="1" y1="3.5" x2="8" y2="3.5" stroke="#C4C4C4" />
        <circle cx="10" cy="3" r="2.5" stroke="#C4C4C4" />
        <circle cx="10" cy="13" r="2.5" stroke="#C4C4C4" />
        <circle cx="3" cy="8" r="2.5" stroke="#C4C4C4" />
    </svg>

)
export const GroupIcon = () => (
    <svg width="16" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="0.5" y="2.58337" width="3" height="3.33333" rx="0.5" stroke="#C4C4C4" />
        <rect x="0.5" y="10.1666" width="3" height="3.33333" rx="0.5" stroke="#C4C4C4" />
        <rect x="5.5" y="2.58337" width="3" height="3.33333" rx="0.5" stroke="#C4C4C4" />
        <rect x="5.5" y="10.1666" width="3" height="3.33333" rx="0.5" stroke="#C4C4C4" />
        <rect x="10.5" y="2.58337" width="3" height="3.33333" rx="0.5" stroke="#C4C4C4" />
        <rect x="10.5" y="10.1666" width="3" height="3.33333" rx="0.5" stroke="#C4C4C4" />
        <line y1="0.5" x2="14" y2="0.5" stroke="#C4C4C4" />
        <line y1="8.08337" x2="14" y2="8.08337" stroke="#C4C4C4" />
    </svg>
)
export const EmptyFilterIcon = () => (
    <svg width="61" height="65" viewBox="0 0 61 65" fill="none" >
        <line x1="23" y1="33.5" x2="56" y2="33.5" stroke="#D6D6D6" />
        <line x1="1" y1="52.5" x2="29.1647" y2="52.5" stroke="#D6D6D6" />
        <line x1="52" y1="13.5" x2="60.0471" y2="13.5" stroke="#D6D6D6" />
        <line x1="52" y1="51.5" x2="60.7176" y2="51.5" stroke="#D6D6D6" />
        <line x1="5" y1="13.5" x2="29" y2="13.5" stroke="#D6D6D6" />
        <circle cx="40.2346" cy="12.0706" r="11.5706" stroke="#D6D6D6" />
        <circle cx="40.2346" cy="52.3062" r="11.5706" stroke="#D6D6D6" />
        <circle cx="12.0706" cy="32.1883" r="11.5706" stroke="#D6D6D6" />
    </svg>
)
export const EmptySearchIcon = () => (
    <svg width="49" height="49" viewBox="0 0 49 49" fill="none">
        <path d="M23.381 1C18.9544 1 14.6273 2.31262 10.9468 4.77187C7.26624 7.23112 4.39762 10.7265 2.70366 14.8161C1.0097 18.9057 0.56648 23.4058 1.43005 27.7473C2.29363 32.0887 4.42521 36.0766 7.55524 39.2067C10.6853 42.3367 14.6732 44.4683 19.0147 45.3319C23.3561 46.1954 27.8562 45.7522 31.9458 44.0582C36.0354 42.3643 39.5308 39.4957 41.99 35.8151C44.4493 32.1346 45.7619 27.8075 45.7619 23.3809C45.7615 17.4453 43.4034 11.7528 39.2063 7.55565C35.0091 3.35849 29.3166 1.00038 23.381 1V1Z" stroke="#D6D6D6" stroke-width="2" stroke-miterlimit="10" />
        <path d="M41.2852 41.2856L47.9994 47.9999" stroke="#D6D6D6" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" />
        <path d="M39.865 25.0103C40.2706 25.0161 40.6059 24.6919 40.594 24.2864C40.5271 22.0028 39.9956 19.7541 39.0291 17.6785C37.9591 15.3806 36.3837 13.3543 34.4205 11.7509C32.4573 10.1475 30.1571 9.00843 27.6919 8.41893C25.465 7.88643 23.1555 7.81474 20.9046 8.20521C20.5049 8.27454 20.2541 8.66778 20.3408 9.06408V9.06408C20.4276 9.46038 20.8189 9.7095 21.2189 9.64184C23.2532 9.29769 25.3387 9.36672 27.3502 9.84773C29.6002 10.3857 31.6994 11.4253 33.4912 12.8887C35.2829 14.3521 36.7208 16.2014 37.6973 18.2986C38.5703 20.1736 39.0545 22.2032 39.1235 24.2653C39.1371 24.6707 39.4594 25.0044 39.865 25.0103V25.0103Z" fill="#E7E7E7" />
    </svg>
)
export const SuccessMarkIcon = () => (
    <svg width="18" height="15" viewBox="0 0 18 15" fill="none">
        <line x1="0.587785" y1="8.06574" x2="8.94193" y2="14.1354" stroke='#3DD542' stroke-width="2" />
        <path d="M8.34493 13.2495L16.8756 1.00001" stroke='#3DD542' stroke-width="2" />
    </svg> 
)
export const Logo = () => (
    <svg width="40" height="40" viewBox="0 0 39 38" fill="none" >
        <mask id="path-1-inside-1" fill="white">
            <path d="M25.1894 6.49646C22.47 5.24156 19.4159 4.90628 16.4891 5.54131C13.5622 6.17635 10.9217 7.74717 8.96683 10.0162C7.01201 12.2853 5.8492 15.1292 5.65425 18.1178C5.45929 21.1064 6.2428 24.0773 7.88628 26.581C9.52976 29.0848 11.9438 30.9854 14.7634 31.9953C17.583 33.0051 20.6547 33.0695 23.5141 32.1785C26.3735 31.2875 28.865 29.4897 30.6119 27.0569C32.3587 24.6241 33.2659 21.6886 33.1962 18.6945L29.8139 18.7732C29.8664 21.0326 29.1819 23.2478 27.8637 25.0836C26.5455 26.9194 24.6654 28.2761 22.5076 28.9484C20.3499 29.6208 18.0319 29.5722 15.9042 28.8102C13.7765 28.0481 11.9548 26.6139 10.7146 24.7245C9.47443 22.8351 8.88318 20.5933 9.0303 18.338C9.17741 16.0827 10.0549 13.9367 11.53 12.2245C13.0052 10.5122 14.9977 9.32682 17.2064 8.84761C19.4151 8.3684 21.7197 8.62142 23.7718 9.56838L25.1894 6.49646Z" />
        </mask>
        <path d="M25.1894 6.49646C22.47 5.24156 19.4159 4.90628 16.4891 5.54131C13.5622 6.17635 10.9217 7.74717 8.96683 10.0162C7.01201 12.2853 5.8492 15.1292 5.65425 18.1178C5.45929 21.1064 6.2428 24.0773 7.88628 26.581C9.52976 29.0848 11.9438 30.9854 14.7634 31.9953C17.583 33.0051 20.6547 33.0695 23.5141 32.1785C26.3735 31.2875 28.865 29.4897 30.6119 27.0569C32.3587 24.6241 33.2659 21.6886 33.1962 18.6945L29.8139 18.7732C29.8664 21.0326 29.1819 23.2478 27.8637 25.0836C26.5455 26.9194 24.6654 28.2761 22.5076 28.9484C20.3499 29.6208 18.0319 29.5722 15.9042 28.8102C13.7765 28.0481 11.9548 26.6139 10.7146 24.7245C9.47443 22.8351 8.88318 20.5933 9.0303 18.338C9.17741 16.0827 10.0549 13.9367 11.53 12.2245C13.0052 10.5122 14.9977 9.32682 17.2064 8.84761C19.4151 8.3684 21.7197 8.62142 23.7718 9.56838L25.1894 6.49646Z" stroke="#00A3FE" stroke-width="3.67665" mask="url(#path-1-inside-1)" />
        <mask id="path-2-inside-2" fill="white">
            <path d="M26.6162 7.2592C27.5211 7.81357 28.359 8.47057 29.1133 9.21716L26.6239 11.732C26.0633 11.177 25.4404 10.6887 24.7677 10.2766L26.6162 7.2592Z" />
        </mask>
        <path d="M26.6162 7.2592C27.5211 7.81357 28.359 8.47057 29.1133 9.21716L26.6239 11.732C26.0633 11.177 25.4404 10.6887 24.7677 10.2766L26.6162 7.2592Z" stroke="#00A3FE" stroke-width="7.35331" mask="url(#path-2-inside-2)" />
        <mask id="path-3-inside-3" fill="white">
            <path d="M32.365 14.3129C32.7166 15.182 32.9786 16.0847 33.147 17.007L29.666 17.6427C29.5408 16.9571 29.3461 16.2861 29.0847 15.64L32.365 14.3129Z" />
        </mask>
        <path d="M32.365 14.3129C32.7166 15.182 32.9786 16.0847 33.147 17.007L29.666 17.6427C29.5408 16.9571 29.3461 16.2861 29.0847 15.64L32.365 14.3129Z" stroke="#00A3FE" stroke-width="7.35331" mask="url(#path-3-inside-3)" />
        <mask id="path-4-inside-4" fill="white">
            <path d="M30.159 10.3766C30.8486 11.2344 31.4331 12.1717 31.8999 13.1684L28.6954 14.6692C28.3484 13.9282 27.9139 13.2315 27.4013 12.5939L30.159 10.3766Z" />
        </mask>
        <path d="M30.159 10.3766C30.8486 11.2344 31.4331 12.1717 31.8999 13.1684L28.6954 14.6692C28.3484 13.9282 27.9139 13.2315 27.4013 12.5939L30.159 10.3766Z" stroke="#00A3FE" stroke-width="7.35331" mask="url(#path-4-inside-4)" />
        <circle cx="19.415" cy="19.0145" r="6.43414" transform="rotate(-65.2284 19.415 19.0145)" fill="#00A3FE" />
    </svg> 
)
export const QuestionIcon = () => (
    <svg width="15" height="15" className="ionicon" viewBox="0 0 512 512">
        <title>Pending</title>
        <path d="M160 164s1.44-33 33.54-59.46C212.6 88.83 235.49 84.28 256 84c18.73-.23 35.47 2.94 45.48 7.82C318.59 100.2 352 120.6 352 164c0 45.67-29.18 66.37-62.35 89.18S248 298.36 248 324" fill="none" stroke="#f73457" stroke-linecap="round" stroke-miterlimit="10" stroke-width="40"/>
        <circle fill="#f73457" cx="248" cy="399.99" r="32"/>
    </svg>
)