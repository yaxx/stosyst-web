import styled from "styled-components";

export const FormContainer = styled.div`
    width: 100%;
    height: 100%;
    position:absolute;
    z-index: 12;
    border-radius: 6px;
    background: white;
    box-shadow: rgba(196, 195, 195, 0.216) 0px 5px 25px;
`
export const Form = styled.form`
    width: 100%;
    height: 100%;
    position:relative;
    display: grid;
    padding: 0px 10px;
    align-items: center;
    grid-template-columns: 30% 25% 38% 7% ;
`
export const CardForm = styled.form`
    width: 100%;
    height: 100%;
    position:relative;
    display: grid;
    padding: 0px 10px;
    align-items: center;
    grid-template-columns: 30% 30% 15% 15% 10%;
`
export const FormCont = styled.div<any>`
    width: 35%;
    height: 200px;
    left: 0px;
    top: 10px;
    position: relative;
    margin-bottom: 30px;
  `
export const ProForm = styled.form`
    position: relative;
    background-color: inherit;
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: start;
    margin-bottom: 40px;
`;