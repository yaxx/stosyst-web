import styled from "styled-components";

export const Card = styled.div.attrs({
  className:'stockCard'
})`
  width: 97%;
  padding: 10px;
  padding-bottom: 7px;
  border-radius: 20px;
  margin: auto;
  position: relative;
  max-height: 370px;
  overflow: hidden ;
  background: white;
  margin-bottom: 5px;
`;
export const Header = styled.h6`
  font-size: 10px;
  font-size: 500;
  height: 20px;
  position: relative;
`
export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 30px;
  color: black;
  position: relative;

  h6 {
    font-size: 16px;
    font-size: 700;
    margin-bottom: 0px;
  }
  p {
    font-size: 14px;
    color: grey;
    margin-bottom: 0px;
  }
`
export const StockCont = styled.div`
  display: grid;
  gap: 0px 10px;
  width: 100%;
  height: 74px;
  border: none;
  position: relative;
  cursor: pointer;
  align-items: start;
  justify-content: start;
  p {
    margin-bottom: 0px;
  }
  grid-template-columns: 60px 1fr;
`;
export const DescCol = styled.div`
  height: 68px;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
`;
export const TitleCont = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const DescCont = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: start;
  p {
    font-size: 14px;
    margin-bottom: -3px;
    max-width: 220px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 0px;
    color: #222222;
  }
  p:last-child {
     color: grey;
     margin-bottom: 0px;
  }
`;

export const PriceCont = styled.div`
  height: 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: space-between;
  align-items: center;
  p {
    font-size: 14px;
    margin-bottom: 0px;
  }
  p:last-child {
    font-size: 14px;
    color: black;
    font-weight: normal;
    text-align: right;
    font-weight: 500;
  }
`;
export const StorePriceCont = styled(PriceCont)`
  height: 25px;
  width: 100%;
  position: relative;
  left: 0px;
  bottom: 0px;
  flex-direction: row;
`;

export const DescRow = styled.div`
  width: 100%;
  flex-direction: row;
  overflow: visible;
  justify-content: space-between;
`;

export const TotalCont = styled(PriceCont)`
  height: 55px;
  width: 100%;
  margin-bottom: 0px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;


export const Title = styled.p<any>`
  font-size: 14px;
`;
export const StockPrice = styled.p`
  /* font-size: 14px; */
`;

export const Money = styled(Title) <any>`
  text-align: right;
  position: relative;
  color: ${({ pending }: any) => (pending ? '#fa6767' : 'black')};
`;
export const SubTotal = styled(Title) <any>`
  position: absolute;
  text-align: right;
  width: 50%;
  right: 0px;
  font-weight: normal;
  color: ${({ pending }: any) => (pending ? '#fa6767' : 'black')};
`;
export const CheckOutLabel = styled.p`
  text-align: center;
  font-weight: normal;
  color: #00a3fe;
  font-size: 12px;
  margin-top: -5px;
`;

export const Desc = styled.p`
  width: 90%;
  font-size: 12px;
`;
export const Instock = styled.p<any>`
  font-size: 14px;
  text-align: right;

`;

export const ImageCont = styled.div<any>`
    background: rgb(230 230 230);
    height: 60px;
    width: 60px;
    border-radius: 8px;
    position: relative;
    background-size: cover;
    background-position: center;
    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: inherit;
    }
`;