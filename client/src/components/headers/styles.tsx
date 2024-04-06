import styled from 'styled-components'

export const Bar = styled.div`
  display: flex;
`

export const TableActions = styled.div<any>`
  width: 150px;
  height: 300px;
  position: absolute;
  z-index: 1048;
  top: 88%;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 0 5px 25px #c4c3c337;
  right: 10%;
  border-radius: 6px;
  border: 1px solid rgba(71, 75, 76, 0.055);
  overflow: hidden;
`
export const TableOption = styled.div<any>`
  width: 100%;
  height: 27px;
  padding: 0px 5px;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  border-bottom: ${props => (props.bordered ? '1px' : '0px')} solid
    rgba(0, 0, 0, 0.05);
  cursor: pointer;
  p {
    position: relative;
    margin-bottom: 0px;
    color: #414040;
    font-size: 12.5px;
    width: 80%;
    left: ${props => (props.selected ? '4px' : '15px')};
  }
  svg {
    stroke: #00a3fe;
  }
  :hover {
    background-color: #00a3fe;
    p {
      color: white;
    }
    svg {
      stroke: white;
    }
  }
`
export const ListDivider = styled.div`
  height: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  p {
    margin-bottom: 0px;
    font-size: 10px;
    font-weight: bold;
    color: #a49f9f;
    padding-left: 10px;

  }
`
export const ButtonDivider = styled.div`
  height: 35px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  p {
    margin-bottom: 0px;
    font-size: 10px;
    font-weight: 900;
    color: dodgerblue;
    width: 100%;
    text-align: center;
    padding-right: 20px;
  }
  :hover {
    background: #1e8fff1c;
  }
  cursor: pointer;
    
`
export const GroupContainer = styled.div`
  width: 70%;
  height: 100%;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  :hover {
    cursor: pointer;
  }
  p {
    margin-bottom: 0px;
  }
`

export const GroupLabel = styled(GroupContainer)`
  align-items: center;
  justify-content: center;
  color: grey;
  svg {
    margin: 3px;
  }
  :hover {
    background-color: #d3d3d35c;
  }
  height: 22px;
  width: 45px;
  border-radius: 6px;
 
`

export const MainHeaderCont = styled.div.attrs(props => ({
  id: 'main--app--header'
}))`
  height: 60px;
  width: 100%;
  position: fixed;
  top: 0px;
  left: 0;
  margin: auto;
  z-index: 1023;
  background-color: rgb(247 247 247);
`

export const TopHeader = styled.header.attrs(props => ({
  className: 'container header-container'
}))`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  justify-content: center;
  font-family: 'Open Sans', sans-serif;
`
export const Header = styled.header<any>`
  height: ${props => props.height || 50}px;
  width: 100%;
  margin: 0 auto;
  z-index: 1023;
  margin-top: 55px;
  background: white;
  position: fixed;
  font-family: 'Open Sans', sans-serif;
  border-bottom-color: ${props =>
    props.theme.mode === 'dark'
      ? props.theme.dark.colors.separators.pri
      : props.theme.light.colors.separators.pri};
`

export const InvoiceListHeader = styled.ul`
  height: 45px;
  width: 100%;
  position: relative;
  display: flex;
  position: relative;
  padding-left: 0px;
  justify-content: start;
  font-size: 0.62rem;
  color: rgb(173, 173, 173);
  li:first-child {
    width: 337px;
  }
  li:last-child {
    align-items: flex-end;
  }
`
export const SettingsHeader = styled(Header)`
  height: 30px;
  width: 100%;
  position: relative;
  z-index: 1;
  margin-top: -30px;
  margin-bottom: 30px;
`
export const SettingsNavigation = styled.ul`
  height: 30px;
  width: 100%;
  padding-left: 0px;
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 0px;
  justify-content: space-between;
  li {
    font-size: 0.8rem;
    :hover {
      color: #00a3fe;
    }
  }
  padding-left: 0px;
`
export const Title = styled.div`
  height: 100%;
  width: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  h6 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0px;
  }
  p {
    margin-bottom: 0px;
    font-size: 0.7rem;
  }
`
export const Divider = styled.div<any>`
  place-items: center;
  width: ${props => props.w || 100}%;
  position: ${props => props.ps || 'absolute'};
  bottom: ${props => props.bottom || 0}%;
  left: ${props => props.l || 'auto'};
  border-bottom: 1px solid
    ${props =>
      props.theme.mode === 'dark'
        ? props.theme.dark.colors.separators.sec
        : props.theme.light.colors.separators.pri};
`
export const SettingsItem = styled.div<any>`
  width: 100%;
  margin: auto;
  position: relative;
  height: ${props => props.height || 150}px;
`
export const StaffList = styled.div<any>`
  min-height: ${props => props.height || 200}px;
`
export const StockList = styled.div<any>`
  min-height: ${props => props.height || 200}px;
  margin-top: 20px;
`
export const StaffItems = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  min-height: 200px;
  position: relative;
  p {
    font-size: 0.8rem;
    margin-bottom: 0px;
  }
`
export const StokcItems = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  min-height: 200px;
  position: relative;
  p {
    font-size: 0.8rem;
    margin-bottom: 0px;
  }
`
export const Staff = styled.div<any>`
  width: 100%;
  height: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  :hover {
    background-color: rgba(71, 75, 76, 0.055);
  }
  h4 {
    text-align: center;
    max-width: 160px;
    margin-bottom: 5px;
    margin-top: 10px;
  }
  p:last-child {
    margin-top: -4px;
    max-width: 180px;
    color: ${props => props.theme.light.colors.labels.sec};
    font-size: ${props => props.theme.typography.body1};
  }
`
export const StockItem = styled.div<any>`
  width: 100%;
  height: 260px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  border-radius: 4px;
  text-overflow: ellipsis;
  background: #fafafa;
  :hover {
    background-color: rgba(71, 75, 76, 0.055);
  }
  h4 {
    text-align: center;
    max-width: 160px;
    margin-bottom: 0px;
    margin-top: 10px;
    font-weight: normal;
    font-size: 14px;
  }
  h4:last-child {
    margin-top: 5px;
    font-size: 16px;
    font-weight: 400;
  }
  p {
    margin-top: -4px;
    max-width: 180px;
    margin-bottom: 0px;
    color: ${props => props.theme.light.colors.labels.sec};
    font-size: ${props => props.theme.typography.body1};
  }
`
export const StaffWrapper = styled.div`
  position: relative;
  width: 25%;
  height: auto;
`
export const StockWrapper = styled.div`
  width: 24.4%;
  height: 450px;
  margin-bottom: 10px;
  border-radius: 4px;
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid #f2f1f1;
  margin-right: 5px;
  a {
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    padding: 0px 10px 0px 5px;
    color: #0f1111;
    margin-top: 5px;
  }
  .views {
    padding: 0px 5px 0px 5px;
    margin-bottom: 0px;
    margin-top: 5px;
    margin-bottom: 10px;
    color: #636262;
    font-size: 13px;
    font-weight: 500;
  }
  .likes {
    height: 25px;
    width: auto;
    position: absolute;
    display: flex;
    align-items: center;
    right: 10px;
    top: 10px;
    z-index: 1;
    .likes-count {
      margin-bottom: 0px;
      margin-top: 0px;
      padding: 0px 0px 0px 2px;
    }
    .likes-cont {
      height: 25px;
      width: 25px;
    }
  }
  p:last-child {
    font-size: 14px;
    font-weight: 400;
    padding: 0px 10px 0px 5px;
    color: #0f1111;
    margin-top: 5px;
    margin-bottom: 10px;
    span {
      font-weight: 700;
    }
  }
`
export const Banner = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  margin-bottom: 40px;
  background: lightgrey;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    border-radius: inherit;
  }
`
export const BannerItems = styled.div`
  position: absolute;
  width: 100%;
  height: 50px;
  top: 33%;
  padding: 0px 40px;
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
export const StaffSelected = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 520px;
  z-index: 200;
  background: white;
`
export const StaffInfo = styled.ul`
  width: 100%;
  height: auto;
  display: flex;
  padding-left: 0px;
  flex-direction: column;
`

export const StaffInfoItem = styled.li<any>`
  width: 100%;
  padding: 0px 42px;
  font-size: ${props => props.theme.typography.body2};
`
export const PermisionsContainer = styled.div`
  width: 100%;
  max-height: 375px;
  overflow: scroll;
`
export const CheckBox = styled.div`
  height: 17px;
  width: 17px;
  border: 1px solid rgba(0, 0, 0, 0.07);
`

export const PermisionItem = styled(StaffInfoItem)``
export const ItemContainer = styled.div<any>`
  min-height: ${props => props.h || '35px'};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 5px 0px;
  p {
    margin-bottom: 5px;
    font-size: ${props => props.theme.typography.body1};
    color: ${props => props.theme.light.colors.labels.sec};
  }
  p:last-child {
    margin-bottom: 0px;
  }
`
export const Permision = styled.div`
  display: flex;
  margin: 5px 0px;
  p {
    font-size: ${props => props.theme.typography.body1};
    padding: 0px;
    margin-left: 5px;
    color: ${props => props.theme.light.colors.labels.sec};
  }
`

export const LabelGroup = styled.div<any>`
  min-width: 100px;
  display: flex;
  flex-direction: column;
  height: ${props => props.height || 80}px;
  margin-left: ${props => props.ml || 0}px;
  position: relative;
  p {
    font-size: ${props => props.theme.typography.body1};
    margin-bottom: 0px;
    font-weight: 500;
  }
`

export const ActionGroup = styled(LabelGroup)``
export const SettingGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  top: 25px;
  position: relative;
`
export const GroupItems = styled.div<any>`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  position: relative;
  margin-left: 15px;
  bottom: ${props => props.bottom || 0}px;
  width: ${props => props.w || 'auto'};
  p {
    margin-bottom: 0px;
    font-weight: 500;
    color: ${props => props.theme.light.colors.labels.sec};
    font-size: ${props => props.theme.typography.body2};
    span {
      font-weight: normal;
    }
    a {
      font-weight: normal;
    }
  }
`
export const ChangePicBtn = styled.div`
  border-radius: 4px;
  height: 27px;
  font-size: 0.8rem;
  font-weight: 500;
  background: #e4e4e4;
  padding: 4px;
  width: 150px;
  color: black;
  text-align: center;
  margin: 10px 0px;
`
export const AuthBtn = styled(ChangePicBtn)`
  width: 240px;
  height: 30px;
  background: ${props => props.theme.dark.colors.brand};
  color: ${props => props.theme.dark.colors.labels.pri};
`
export const SaveBtn = styled(ChangePicBtn)`
  background: ${props => props.theme.dark.colors.brand};
  width: 100px;
  height: 30px;
  color: ${props => props.theme.dark.colors.labels.pri};
  position: absolute;
  border-radius: 14px;
  right: 0%;
`
export const SubsBtn = styled(ChangePicBtn)`
  background-color: rgb(15, 20, 25);
  width: 110px;
  height: 38px;
  color: white;
  position: absolute;
  border-radius: 20px;
  right: 2%;
  top: 100%;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  :hover {
    background-color: rgba(15, 20, 25, 0.8);
  }
`
export const ProfilePicture = styled.div<any>`
  height: ${props => props.height || 100}px;
  width: ${props => props.width || 100}px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  position: relative;
  border: 4px solid ghostwhite;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: inherit;
  }
`
export const ProfileBaner = styled.div<any>`
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center;
  position: absolute;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: inherit;
    position: absolute;
  }
`

export const HeaderItem = styled.li<any>`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.ai};
  justify-content: center;
  position: relative;
  cursor: pointer;
  bottom: 0px;
  z-index: 12;
  a {
     font-size: 11px;
     font-weight: 600;
  }
  a {
    :hover {
      color: #212122;
    }
    color: ${props => (props.match ? '#2e2f30' : 'grey')};
    text-decoration: none;
  }
  width: ${props => props.width}%;
  border-bottom: 1px solid
    ${props => (props.match ? props.theme.dark.colors.brand : 'initial')};
`
export const ExpenseListHeader = styled(InvoiceListHeader)`
  li {
    &:last-child {
      font-weight: 500;
      font-size: 12px;
      color: ${props => props.theme.dark.colors.brand};
    }
  }
`
export const SummaryListHeader = styled(InvoiceListHeader)`
  li {
    &:last-child {
      font-weight: 500;
      font-size: 19px;
      color: 'rgb(173,173,173)';
    }
  }
`
export const StocksListHeader = styled.ul`
  height: 45px;
  width: 100%;
  position: relative;
  display: flex;
  position: relative;
  padding-left: 0px;
  justify-content: start;
  font-size: 0.62rem;
  color: rgb(173, 173, 173);
  li:first-child {
    width: 337px;
  }
  li:last-child {
    align-items: flex-end;
  }
`
export const CardHeader = styled.header`
  height: 55px;
  width: 100%;
  background: #f7f7fa;
  top: 0px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 0px 12px;
  h4 {
    font-size: 14px;
    width: 265px;
    margin: auto;
    text-align: center;
    font-weight: 600;
    left: 24px;
    position: absolute;
    color: ${props =>
      props.theme.mode === 'dark'
        ? props.theme.dark.colors.labels.pri
        : props.theme.light.colors.labels.pri};
  }
`

export const CardFooter = styled(CardHeader)`
  top: auto;
  bottom: 0px;
  position: absolute;
  justify-content: space-between;
  padding: 0px 16px;
  p {
    margin-bottom: 0px;
    font-size: 14px;
    text-align: right;
    font-weight: bold;
    left: 10px;
    position: relative;
    display: inline-block;
    flex-grow: 2;
    color: ${props =>
      props.theme.mode === 'dark'
        ? props.theme.dark.colors.labels.pri
        : props.theme.light.colors.labels.pri};
    cursor: pointer;
    &:hover {
      color: ${props =>
        props.theme.mode === 'dark'
          ? props.theme.dark.colors.brand
          : props.theme.light.colors.brand};
    }
  }
`
export const ReviewHeader = styled.div`
  width: 100%;
  height: 60px;
  top: 0px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid whitesmoke;
  h4 {
    font-size: 14px;
    text-align: center;
    font-weight: 600;
    margin-bottom: 0px;
  }
`
export const ReviewFooter = styled(ReviewHeader)`
  top: auto;
  bottom: 0px;
  border-bottom: 0px;
  padding: 0px 45px;
  justify-content: space-between;
  border-top: 1px solid whitesmoke;
`
export const DoneBtnCont = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const FeedBack = styled.div<any>`
  position: absolute;
  background-color: ${props => (props.state ? '#13ca13c3 ' : '#f90000a6')};
  color: white;
  width: 100%;
  z-index: 501;
  bottom: ${props => (props.msg ? 0 : -40)}px;
  height: 40px;
  display: grid;
  place-content: center;
  text-align: center;
  transition: all 0.2s ease-in-out;
  font-size: ${props => props.theme.typography.body1};
  p {
    width: 100%;
    margin-bottom: 0px;
    font-weight: bold;
  }
`
export const ProfileOptions = styled.div.attrs({
  id: 'menu--section'
})`
  position: relative;
  height: 100%;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 15px;
  cursor: pointer;
`
export const OptionList = styled.ul`
  min-height: 124px;
  width: 180px;
  position: absolute;
  display: block;
  left: -30px;
  padding-top: 10px;
  padding-left: 0px;
  top: 42px;
  border-radius: 10px;
  box-shadow: 0 5px 25px #c4c3c337;
  background-color: white;
  border: 1px solid rgba(71, 75, 76, 0.055);
  &:before {
    content: '';
    position: absolute;
    top: -5px;
    left: 50%;
    height: 11px;
    width: 11px;
    transform: rotate(45deg);
    background: inherit;
    z-index: -1;
    border-bottom: 0px;
    border-right: 0px;
    border: 1px solid rgba(71, 75, 76, 0.055);
  }
`
export const LinkedAccList = styled.ul`
  min-height: 35px;
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 101%;
  z-index: 10;
  padding-left: 0px;
  border-radius: 10px;
  box-shadow: 0 5px 25px #c4c3c337;
  background-color: white;
`
export const LinkedAccItem: any = styled.li`
  width: 100%;
  height: 35px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  cursor: pointer;
  background-color: white;
  p {
    margin-bottom: 0px;
    font-size: 12px;
    padding: 0px 10px;
  }
  .usrnm {
    color: #b3b0b0;
  }
`

export const OptItemCont: any = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  border-bottom: 1px solid whitesmoke;
  :hover {
    background-color: whitesmoke;
    border: none;
  }
  .icon {
    margin-right: 10px;
  }
`

export const OptionItem = styled.li<any>`
  height: 35px;
  width: 100%;
  display: flex;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  position: relative;
  p {
    margin-bottom: 0px;
    font-size: 12px;
     padding: 0px 10px;
  }
  :hover {
    background-color: rgb(247 247 247);
  }
`
export const SettingTitle = styled.h2`
  font-size: 22px;
  margin: 20px 0px;
  font-weight: bold;
`

export const MainBanerCont = styled.div`
  height: 200px;
  width: 100%;
  margin-bottom: 70px;
  position: relative;
  background: lightgrey;
`
export const ProfileImage = styled.div`
  height: 150px;
  width: 150px;
  border-radius: 80px;
  position: absolute;
  background: #b4b4b4;
  top: 60%;
  left: 20px;
`
export const ProfileInfo = styled.div`
  height: 200px;
  width: 100%;
  margin-bottom: 2px;
  position: relative;
  padding: 0px 0px;
  display: flex;
  flex-direction: column;
  h4 {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 2px;
    margin-top: 10px;
  }
  .username {
    color: rgb(83, 100, 113);
    font-size: 16px;
  }
  .addr {
    margin-bottom: 2px;
  }
  p:nth-child(4) {
    font-weight: bold;
  }
  .stats {
    width: 330px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    p {
      font-weight: bold;
      margin-bottom: 0px;
    }
    span {
      color: rgb(83, 100, 113);
      font-weight: normal;
    }
  }
`
export const LogoSection = styled.section<any>`
  position: relative;
  height: 100%;
  width: ${props => props.w || 100}px;
  display: flex;
  position: relative;
  align-items: center;
  h6 {
    font-weight: bold;
    color: #00a3fe;
    margin-bottom: 0px;
  }
`
export const SearchSection = styled.section.attrs({
  id: 'search--section'
})`
  position: relative;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  height: 100%;
`
export const CartSection = styled.section<any>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`
export const HeaderItemsCont = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 925px;
`
