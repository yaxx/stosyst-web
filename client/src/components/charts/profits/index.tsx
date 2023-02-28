import { HeaderCont, LoadingCont, MessageCont } from '../styles'

const ProfitChart = () => {
  return (
    <>
        <HeaderCont>
            <h5>Net profits</h5>
        </HeaderCont>
          <MessageCont>
            <h6>No profits projection yet</h6>
            <p>Please add cost prices to generate profits analyses</p>
          </MessageCont>
    </>
  )
}

export default ProfitChart