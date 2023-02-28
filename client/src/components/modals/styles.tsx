import styled from "styled-components";

export const ModalContainer = styled.div<any>`
    position: fixed;
    height: 100%;
    width:100%;
    z-index: 115;
    top:0;
    background-color: rgb(0 0 0 / 46%);
`;
export const ReviewModal = styled.div<any>`
    position: fixed;
    height: 100%;
    width:100%;
    z-index: 116;
    top:0;
    background-color: rgb(0 0 0 / 20%);
`;

export const ContainerSlider = styled.div<any>`
  right: 125px;
  position: relative;
  height: 100%;
  width: 300px;
  transition: all 4s ease-in-out;
  right: ${props => props.slideIn ? -115 : -10}px;
`
export const Card = styled.div<any>`
  position: absolute;
  height:100%;
  width: 330px;
  background-color: ${props => props.theme.mode === 'dark' ? props.theme.dark.colors.backgrounds.base.pri : props.theme.light.colors.backgrounds.base.pri
    };
  transition: all .2s linear;
  right: ${props => props.slideIn ? 250 : -350}px;
`;
export const CardBody = styled(Card)`
  height: 84%;
  right: 0px;
  padding-top: 0px;
  width: 100%;
  position: relative;
  overflow: visible;
 `;