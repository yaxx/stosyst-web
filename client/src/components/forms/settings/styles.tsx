import styled from "styled-components";

export const FormContainer = styled.div`
    width: 100%;
    height: 100%;
    position:absolute;
    z-index: 12;
    background: white;
    box-shadow: rgba(196, 195, 195, 0.216) 0px 5px 25px;
`
export const Form = styled.form`
    width: 100%;
    height: 100%;
    position:relative;
    display: grid;
    padding: 0px 5px;
    grid-template-columns: 30% 25% 38% 7% ;
`