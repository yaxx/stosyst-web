import styled, { keyframes } from 'styled-components';
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`
const Spinner = styled.div<any>`
    z-index: 20;
    border-radius: 50%;
    transition: all;
    position: absolute;
    border: 2px solid ${props => props.c || '#059cfa53'};
    border-top-color: #1da1f2;
    left: ${props => props.lf}%;
    bottom: ${props => props.b}%;
    width: ${props => props.size || '20px'};
    height: ${props => props.size || '20px'};
    animation: ${rotate} .27s linear infinite;
`
const PageSpinner = styled(Spinner)`
  width: 40px;
  height: 40px;
  right: auto;
  border-top-color: #1da0f2;
`
const MoreSpinner = styled(Spinner)`
  width: 28px;
  height: 28px;
  right: auto;
  bottom: 8px;
  margin: auto;
  left: 48%;
  position: absolute;
`

export const Loader = (props: any) => <Spinner {...props} />
export const SpinLoader = (props: any) => <Spinner {...props} />

export const PageLoading = () => <PageSpinner />

export const LoadingMore = () => <MoreSpinner />
