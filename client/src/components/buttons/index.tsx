import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { CheckIcon } from '../icons'
import { Loader } from '../loaders'

export * from './circularBtn'


export const Btn = styled.button<any>`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  align-self: flex-end;
  border:none;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  right:15px;
  bottom:10px;
  p {
    margin-bottom: 0px;
    font-size: 12px;
    color: ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.brand : props.theme.light.colors.brand
  };
   
  }
  svg {
    position: relative;
    stroke: ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.brand : props.theme.light.colors.brand
  };
  }
  &:hover {
      border: none;
      background-color: ${props => props.disabled ? '' : '#00A3FE'};
  }
  :hover {
    svg {
      stroke: 'white'
    }
    p {
      color: ${props => props.disabled ? '' : 'white'}

    }
  }
  &:focus {
      border: none;
      background-color: ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.brand : props.theme.light.colors.brand
  };
  }
`
export const QtyBtn = styled.div.attrs(props => ({
  className: 'icn'
}))`
  height: 18px;
  width: 18px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
    span: {
        display: block;
        height: 100%;
        width: 100%;
        bottom: 4px;
        position: relative;
    }
  font-size: 14px;
  font-weight: bold;
  color: grey;
  /* color: ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.labels.pri : props.theme.dark.colors.labels.pri
  }; */
  &:hover {
      background: rgba(206, 205, 205, 0.473);
      color: ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.labels.pri : props.theme.light.colors.labels.pri
  };
  }
`
export const ToggleBtn = styled.div`
  height: 20px;
  width: 32px;
  border: 1px solid lightgrey;
  border-radius: 10px;
  position: relative;
    div {
      height: 15px;
      width: 15px;
      border-radius: 50%;
      position: absolute;
      background: ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.brand : props.theme.light.colors.brand
  };
      left: 2px;
      top: 1px;
      bottom: 0px;
    }
`;
export const CircularBtn = styled.div<any>`
  height: ${props => props.h || 26}px;
  width: ${props => props.w || 26}px;
  border-radius: 50%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  right: -5px;
  z-index: 2000;
  cursor: pointer;
  &:hover{
     background: rgba(30, 143, 255, 0.048);
  }
`;
export const EditBtn = styled.button`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  border: none;
  color: ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.labels.pri : props.theme.light.colors.labels.pri
  };
  display:flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.typography.body2};
  background-color: ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.brand : props.theme.light.colors.brand
  };
  :hover {
    background-color:  ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.brand : props.theme.light.colors.brand
  };
  }
  :focus {
    border: none;
    outline: none;
    box-shadow: none;
  }
`

export const Back = styled(EditBtn)`
  position: absolute;
  top: 10%;
  right: 85%;
  z-index: 500;
  background-color: rgba(85, 83, 83, 0.062);
  :hover {
    background-color: #08080834;
  }
`
export const Back2 = styled(EditBtn)`
  /* z-index: 5; */
  background-color: transparent;
  :hover {
    background-color: #08080834;
  }
`
export const Foward = styled(EditBtn)`
  z-index: 500;
  background-color: transparent;
  :hover {
    background-color: transparent;
  } 
`

export const FloatBtnCont = styled.div<any>`
position: fixed;
height: 100px;
width: 50px;
top: 80%;
transition: all .2s ease-in-out;
right: ${props => props.rt}%;
display: flex;
align-items: center;
justify-content: space-between;
flex-direction: column;
 z-index: 110;
`

export const FloatingBtn = styled.div<any>`
  height: 38px;
  width: 38px;
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  /* top: 80%; */
  cursor: pointer;
  /* transition: all .2s ease-in-out;
  right: ${props => props.rt}%; */
  background-color: ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.brand : props.theme.light.colors.brand
  };
  color: ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.labels.pri : props.theme.light.colors.labels.pri
  };
  /* position: fixed; */
  /* z-index: 110; */
  p {
    margin-bottom: 0px;
    font-size: 8px;
    position: absolute;
    color: #4c4a4a;
    width: 100px;
    left: 100%;
    margin-left: 10px;
  }
`
export const UncheckBtn = styled.div<any>`
  /* bottom: 0%; */
  height: 30px;
  width: 30px;
  /* z-index: 110; */
  border-radius: 50%;
  display: flex;
  color: white;
  position: relative;
  align-items: center;
  justify-content: center;
  /* transition: all .2s ease-in-out;
  right: ${props => props.rt}%; */
  background-color: #1e1e1e15;
  p {
    margin-bottom: 0px;
    font-size: 8px;
    position: absolute;
    color: #4c4a4a;
    width: 100px;
    left: 100%;
    margin-left: 10px;
  }
  svg {
    stroke: #00A3FE;
  }
  cursor: pointer;
  :hover {
    svg {
      stroke: white;
    }
    background-color: #00A3FE;
  }
`

export const FlatBtn = styled.button`
  width: 100%;
  height: 32px;
  background-color: ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.brand : props.theme.light.colors.brand
  };
  border: none;
  box-shadow:none;
  position: absolute;
  bottom: 0;
  color: white;
`

export const ItemsCounter = styled.div`
  height: 20px;
  min-width: 20px;
  padding: 0px 2px;
  color: ${props => props.theme.dark.colors.labels.pri
  };
  border-radius: 50%;
  position: absolute;
  background-color:  ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.error : props.theme.light.colors.error
  };
  top:-2px;
  font-size: 11px;
  border:none;
  right:-4px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: none;
`
export const NotificationCounter = styled(ItemsCounter)`
  border-radius: 10px;
  padding: 0px 4px;
  position: absolute;
  top:2px;
  font-size: 10px;
  right:5px;
  font-weight: 700;
`
export const BackBtn = styled.div`
    display: flex;
    position: relative;
    height: 100%;
    width: auto;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color:  ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.brand : props.theme.light.colors.brand
  };
    cursor: pointer;
     span {
        bottom: 2px;
        position: relative;
        right: -7px;
     }
`
export const PriBtn = styled.button.attrs(props => ({
  name: props.name,
  value: props.value
})) <any>`
    border:none;
    width: ${props => props.w || '100%'};
    height: ${props => props.h || 45}px;
    
    border-radius: ${props => props.r || 8}px;
    display: flex;
    align-items: center;
    justify-content:center;
    font-weight: 500;
    margin-top:${props => props.mt || 25}px;
    color: ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.labels.pri : props.theme.dark.colors.labels.pri
  };
    font-size: 14px;
    background-color: ${props => props.active ? props.theme.light.colors.brand : '#00a3fe2b'
  };
    &:hover {
        background-color: ${props => props.active ? props.theme.light.colors.btn_hovered : '#00a3fe2b'
        };
    }
    &:focus {
        border: 0px;
        outline: none;
    }
    svg {
      margin-right: 8px;
    }
`
export const ReviewButton = styled(PriBtn)`
  margin-top: 10px;
  background: #f4f4f4;
  font-size: 10px;
  font-weight: 600;
  color: ${props => props.theme.light.colors.brand};
  :hover {
    border: none;
    background: #efecec;
  }
  justify-content: ${props => props.checkbox ? 'start' : 'center'};
`
export const FooterBtn = styled(PriBtn) <any>`
  margin-top: 0px;
  height:45px;
  font-size: 10px;
  font-weight: 700;
  background: white;
  color: dodgerblue;
  border: 1px solid ${props => props.right ? '#00000023' : 'white'};
  :hover {
    border: none;
    color: ${props => props.right ? 'white' : 'dodgerblue'};
    background: ${props => props.right ? 'dodgerblue' : 'white'};
  }
`

export const DeleteBtn = styled(PriBtn)`
  background-color: ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.error : props.theme.light.colors.error
  };
  margin-top: 55px;
  :hover {
    background-color: ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.error_btn_hovered : props.theme.light.colors.error_btn_hovered
  };
  }
`
interface Props {
}
interface Label {
  label: string
}

export const PrimaryBtn = () => <PriBtn />


export default function RoundedBtn({ saving }: any): ReactElement {
  return (
    <Btn> {
      <CheckIcon />
    }
    </Btn>
  )
}
export const StandardButton = styled.button.attrs(props => ({
  name: props.name,
  value: props.value
})) <any>`
    width: ${props => props.w || '100%'};
    height:${props => props.h || 45}px;
    border:none;
    border-radius: ${props => props.r || 6}px;
    display: flex;
    align-items: center;
    justify-content:center;
    font-weight: 700;
    margin-top: 15px;
    color: ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.labels.pri : props.theme.dark.colors.labels.pri
  };
    font-size: 14px;
    background-color: ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.brand : props.theme.light.colors.brand
  };
    &:hover {
        background-color: ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.btn_hovered : props.theme.light.colors.btn_hovered
  };
    }
    &:focus {
        border: 0px;
        outline: none;
    }
`