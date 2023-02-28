import styled from "styled-components";

export const HeaderCont = styled.div`
width: 100%;
height: 100px;
display: flex;
flex-direction: row;
align-items: center;
background: white;
padding: 10px 30px;
position: relative;
margin-bottom: 10px;
justify-content: space-between;
`
export const HeaderItem = styled.div<any>`
width: ${props=>props.w || 25}%;
height: 100%;
padding: 12px 0px;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: ${props => props.f || 'flex-start' };
h1 {
    font-size: 30px;
    margin-bottom: 0px;
}
h6 {
    color: grey;
    margin-bottom: 0px;
}
`