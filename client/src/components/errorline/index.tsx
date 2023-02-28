import React, { ReactElement } from 'react'
import styled from 'styled-components'

const FeedBack = styled.p`
  font-size: .66rem;
  width: 100%;
  text-align: center;
  position: relative;
  margin-bottom: 20px;
  margin-top: 15px;
  color: #f79595;
`
interface Props {
    
}

export default function Error(props: any): ReactElement {

    let { graphQLErrors, networkError, message } = props.error

    // if (graphQLErrors)
    // graphQLErrors.forEach(({ message, locations, path }) =>
    //   console.log(
    //     `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
    //   ),
    // );

    if (networkError) 
    message = "Something went wrong, but don’t fret — let’s give it another shot.";

    return  <FeedBack>{ message }</FeedBack>

}
