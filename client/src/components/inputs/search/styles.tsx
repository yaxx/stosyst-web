import styled from "styled-components";



export const Input = styled.input.attrs(props => ({
    placeholder: props.placeholder,
    className: 'form-control'
}))`
  padding: 0px 1px 0px 30px;
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
export const NumbInput = styled.input.attrs(props => ({
    placeholder: props.placeholder,
    className: 'form-control',
    // type: 'number'
}))`
  padding: 0px 1px 0px 0px;
  border: none;
  text-align: right;
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
export const FormGroupCont = styled.div<any>`
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${(props) => props.h}px;
  width: ${(props) => props.w || 100}%;
  border-radius: ${(props) => props.r || 8}px;
  border: none;
  position: relative;
`;
export const InputIconCont = styled.div<any>`
    display: flex;
    position: absolute;
    cursor: pointer;
    top: 18%;
    left: 2%;
    height: 20px;
    width: 20px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    svg {
        position: relative;
    }
`;

export const FormGroup = styled.div<any>`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  position: relative;
  border: none;
  border-radius: 6px;
  background: whitesmoke;
  border-radius: inherit;
  height: ${props => props.h}px;
  width: ${props => props.w || 100}%;
`