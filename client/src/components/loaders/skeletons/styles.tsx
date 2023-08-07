import styled, { keyframes } from 'styled-components'

const flash = keyframes`
  from {
    left: -100%;
  }
  to {
     left: 100%;
  }
`

export const Flash = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation: ${flash} 1s cubic-bezier(0.4, 0.0, 0.2, 1) infinite;
  background: linear-gradient(
    to right, #efefef 10%, #f7f7f7 50%, #efefef 90%
  );

`
export const SkelItemCont = styled.div<any>`
  display: grid;
  grid-template-columns: 35px 2fr 1fr;
  gap: 0px 5px;
  width: 100%;
  height: ${props => props.h || '50'}px;
  border: none;
  padding: ${props => props.pd || 5}px 0px;
  align-items: center;
  justify-content: start;
`

export const SkelImageCont = styled.div<any>`
  position: relative;
  background: rgb(230 230 230);
  height: ${props => props.h || '42px'};
  width: ${props => props.w || '42px'};
  border-radius: ${props => props.r || '4px'};
  overflow: hidden;
  background: whitesmoke;
`

export const SkelItemInfo = styled.div<any>`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  overflow: hidden;
`
export const SkelInfo = styled.div<any>`
  height: 13px;
  border-radius: 3px;
  background: whitesmoke;
  position: relative;
  overflow: hidden;
  width: ${props => props.w || 100}%;
  margin-bottom: ${props => props.mb || 0}px;
`

export const SkelOpItemInfo = styled.div<any>`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: end;
`
