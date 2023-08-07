import styled from "styled-components";

export const ModalContainer = styled.div<any>`
    position: fixed;
    height: 100vh;
    width:100vw;
    z-index: 10;
    top:0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
`;
export const AccountInfoCont = styled.div`
    position: relative;
    height: 60px;
    width:100%;
    display: grid;
    justify-content: center;
    padding: 10px 0px;
    grid-template-columns: 1fr 1.3fr .75fr .9fr;
`;
export const AccSectionHeader = styled.div<any>`
    position: relative;
    height: 60px;
    width:100%;
    display: grid;
    grid-template-columns: 90% 10%;
`;
export const AccDateItem = styled.div<any>`
    position: relative;
    height: 100%;
    width:100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: ${props => props.end ? 'end' : 'start'};
    h6 {
        font-size: 10px;
        margin-bottom: 0px;
        color: grey;
    }
    p {
        margin-bottom: 0px;
        font-size: 14px;
    }
`;
export const ListContainer = styled.ul<any>`
    list-style: none;
    width: 100%;
    padding: 0px;
    margin-bottom: 60px;
    display: flex;
    flex-direction: column;
    min-height: 120px;
`;
export const AccHeaderItem = styled.div<any>`
    position: relative;
    height: 100%;
    width:100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: ${props => props.end ? 'end' : 'start'};
    h6 {
        font-size: 16px;
        margin-bottom: 0px;
        font-weight: 700;
    }
    p {
        margin-bottom: 0px;
        font-size: 13px;
        color: grey;
    }
`;
export const BillingInfoCont = styled.li<any>`
    position: relative;
    height: 60px;
    width:100%;
    justify-content: center;
    display: grid;
    grid-template-columns: 90% 10%;
    align-items: center;
    :hover {
        background: #fbfbfb;
    }
`;
export const AccountInfoItem = styled.div<any>`
    position: relative;
    height: 100%;
    width:100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: ${props=>props.end ? 'end' : 'start'};
    padding: 10px 0px;
    p {
        margin-bottom: 0px;
        font-size: 14px;
    }
    h6 {
        color: grey;
        font-size: 12px;
         margin-bottom: 0px;
    }
`;

export const LinkeAccInfoItem = styled(AccountInfoItem)<any>`
    p {
        margin-bottom: 0px;
        font-size: 11px;
        color: grey;
    }
    h6 {
        font-size: 14px;
        margin-bottom: 0px;
        color: black;
    }
`;
export const FeedbackCont = styled.div<any>`
    height: 120px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-top: 60px;
    p {
        margin-bottom: 0px;
        font-size: 12px;
        color: grey;
    }
    h6 {
        font-size: 14px;
        margin-bottom: 0px;
        color: black;
    }
`;