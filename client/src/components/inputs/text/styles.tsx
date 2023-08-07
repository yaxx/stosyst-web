import styled from "styled-components";



export const Input = styled.input.attrs(props => ({
    placeholder: props.placeholder,
    className: 'form-control'
}))`
  padding: 0px 1px;
  border: none;
  background-color: inherit;
  font-size: 13px;
  border-radius: 0px;
  color: ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.labels.pri : props.theme.light.colors.labels.pri
    };
  &:focus {
    box-shadow: none;
    outline: none;
    border: none;
    background-color: transparent;
    color: ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.labels.pri : props.theme.light.colors.labels.pri
    };
  }
  ::placeholder {
    color: #d5d5d5;
  }
`;
export const Label = styled.label<any>`
    width: 100%;
    font-size: 11px;
    color: #717171;
    margin-bottom: 0px;
    background-color: transparent;
    text-align: ${props => props.r ? 'right' : 'left'};
`;
export const DropIconCont = styled.div<any>`
    display: flex;
    position: absolute;
    cursor: pointer;
    top: 38%;
    right: 6%;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    .icon {
        top: 1px;
        left: 1px;
    }
`;
export const InputIconCont = styled.div<any>`
    display: flex;
    position: absolute;
    cursor: pointer;
    top: 30%;
    right: 2%;
    height: 20px;
    width: 20px;
    align-items: center;
    justify-content: center;
    background: #8080802e;
    border-radius: 50%;
    .icon {
        top: 1px;
        left: 1px;
    }
`;

export const FormGroup = styled.div<any>`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  position: relative;
  padding: 0px 10px 0px 0px;
  height: ${props => props.h || 45}px;
  width: ${props => props.w || 100}%;
  background: ${props => props.focused ? 'whitesmoke' : 'initial'};
  border-bottom-left-radius: ${props => (props.top ? '0px' : '6px')};
  border-bottom-right-radius: ${props => (props.top ? '0px' : '6px')};
  border-bottom: ${props => (props.top ? '1px' : '0px')} solid #e6e1e1;
  border-right: ${props => (props.left ? '1px' : '0px')} solid #d3d3d35c;
  border-bottom-color: ${props => (props.top ? '#e6e1e1' : 'white')};
`