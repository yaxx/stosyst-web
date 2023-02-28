import styled from 'styled-components'

export const PaymentReviewer = styled.div<any>`
    position: absolute;
    left: 18px;
    height: 140px;
    width: 100px;
    top: -104px;
    padding: 5px 0px 0px 0px;
    border: 1px solid whitesmoke;
    display: flex;
    flex-direction: column;
    justify-content: start;
    transition: all .1s ease-in;
    /* right: ${props => props.show ? -105 : 2}px; */
    z-index: 1;
    .amountVal {
      color: black;
    }
    /* &:before {
     content:'';
     position: absolute;
     top: 85%;
     left: -5%;
     height: 11px;
     width: 11px;
     background: #00A3FE;
     transform: rotate(45deg);
  } */
`;
export const PendingAmount = styled.div`
    position: relative;
    height: 27px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    font-size: 12px;
    padding-left: 7px;
    margin-bottom: 5px;
    p { 
        margin-bottom: 0px;
        text-align: left;
        width: 100%;
        padding-left: 0px;
    }
    p:first-child {
        top: 2px;
        font-size: 10px;
        position: relative;
        color: grey;
    }
    p:last-child {
        font-size: 12px;
        align-items: start;
         position: relative;
    }
`;
export const InvoiceLabel = styled.div`
  position: absolute;
  top: 18%;
  display: flex;
  height: 50px;
  min-width: 100px;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  overflow: visible;
  .recieved {
    margin-bottom: 0px;
    font-weight: 300;
    font-size: 26px;
    position: relative;
    span {
      font-size: 26px;
      color: lightgrey;
    };
  }
  .rcvLabel {
    left: 0px;
    top: -5px;
    font-size: 11px;
    margin-bottom: 0px;
    position:absolute;
    color: grey;
    font-weight: normal;
  }
`
export const ReviewCont =  styled.span`
    position: relative;
    display: inline-block;
    margin-left: 0px;
    bottom:3px;
`
export const EllipseCont =  styled.span`
    position: relative;
    display: inline-block;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    :hover {
      background-color:#00a5fe3e;
    }
    svg {
      position: absolute;
      left: 35%;
      bottom: 23%;
    }
`
export const FormInputGroup =  styled.span`
    position: relative;
    display: inline-block;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    :hover {
      background-color:#00a5fe3e;
    }
    svg {
      position: absolute;
      left: 35%;
      bottom: 23%;
    }
`
export const DetailsImgCont =  styled.div`
    height: 100%;
    width: 200px;
    margin-right: 10px; 
    position: 'relative';
    border-radius: 10px;
`
export const LoadingCont =  styled.div`
  height: 30px;
  width: 30px;
  right:15px;
  bottom:10px;
  border-radius: 50%;
  background-color: inherit;
  align-self: flex-end;
  border:none;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
`
export const RequireMark =  styled.sub`
    font-size: 13px;
    top: auto;
    color: #ff000094;
    top: 1px;
`
export const ClearCont =  styled.sub`
    position: absolute;
    /* background-color: #e0dede; */
    right: 4px;
    top: 0%;
    display:flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`
export const Form = styled.form`
    margin: auto;
    height: 50px;
    border-radius: 5px;
    position: relative;
    top:50px;
    background-color: inherit;
    display: flex;
    align-items:center;
    justify-content: start;
`;
export const TableForm = styled(Form)`
    width: 100%;
    z-index: 200;
    display: flex;
    border-radius: 18px;
    padding: 10px;
    position: relative;
    /* height: ${props => (props.id) ? '100%' : '220px'
  }; */
    height: 220px;
    top: ${props => (props.id) ? 'auto' : ''
  };
    position: ${props => (props.id) ? 'absolute' : 'relative'
  };
    background-color: ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.backgrounds.elavations.pri : props.theme.light.colors.backgrounds.base.pri
  };
    .formGroup {
        margin-right: 10px;
    }
    .formGroup:first-child {
        /* width: 400px; */
    }
`;

export const StandardForm = styled(Form)`
   flex-direction: column;
   height: auto;
   width: 100%;
   top: 0px;
`;
export const ReviewFormCont = styled(Form)`
   flex-direction: column;
   height: auto;
   width: 100%;
   padding: 0px 40px;
   top: 0px;
`;
export const MainSearchForm = styled(Form)`
   top: auto;
   border-radius:0px;
`;
export const AccForm = styled(StandardForm)`
    width: 240px;
   .formGroup {
        background-color: white;
   }
   input {
       ::placeholder {
        color: #e4e4e4;
     }
   }
`;

export const QtyFormGroup = styled.div.attrs(props => ({
  className: 'formGroup'
}))`
    background: inherit;
    height: auto;
    border: none;
    min-width:50px;
    position:relative;
    bottom: 4px;
    margin-bottom: 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: right;
      input {
            color: ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.labels.pri : props.theme.light.colors.labels.pri
          };
          &::-webkit-input-placeholder {
              color: ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.labels.pri : props.theme.light.colors.labels.pri
          };
          }
          &:focus {
              color: ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.labels.pri : props.theme.light.colors.labels.pri
          }
      }
    }
  `
  export const PaymentReview = styled.div<any>`
    height: 330px;
    width: 100%;
    z-index: 200;
    transition: all .1s ease-in;
    position: absolute;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    bottom: ${ props => props.slideUp ? 0 : -350}px;
  `
  export const ClearInputCont = styled.div<any>`
    height: 20px;
    width: 20px;
    right: 5px;
    border-radius: 50%;
    display: flex;
    position: absolute;
    background: #06060618;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    :hover {
       background: #0606061d;
    }

  `
  export const CompleteMark = styled.div<any>`
    margin: 5px;
    height: ${ props => props.size || 18}px;
    width: ${ props => props.size || 18 }px;
    border-radius: 50%;
    position: relative;
    background: ${ props => props.completed ? 'lightgreen' : "#f7345865"};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    svg {
      margin: 0px;
      stroke: ${ props => props.completed ? 'white' : 'red'};
    }
  `
  export const ReviewTotal = styled.div<any>`
    width: 100%;
    height: 40px;
    margin-bottom: 6px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    p, h6{
      margin-bottom: 0px;
    }
    h6 {
      font-size: 20px;
      font-weight: normal;
    }
    p {
     font-size: 9px;
     color: rgb(113, 113, 113)
    }
  `
  export const MainFormGroup = styled.div<any>`
    width: auto;
    height: auto;
    margin: 5px;
    border-radius: 6px;
    position: relative;
  `