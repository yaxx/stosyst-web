import { ReactElement } from 'react'
import styled from 'styled-components'
import { HeaderNav } from '../components/headers'
import { SideNav } from '../components/sideNavigation/SideNav'
import { BarCard, ChartCard, DashboardContainer } from './styles'

import { SalesExpenseChart, TrendsChart } from '../components/charts'
import { ChartHeader } from '../components/charts/header'
import { ChartFooter } from '../components/charts/footer'
import { StaffsChart } from '../components/charts/staffs'
import ProfitChart from '../components/charts/profits'




export const ItemWraper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`
const Page = (props: any): ReactElement => {

    return (
        <DashboardContainer>
            <SideNav />
            <HeaderNav />
            <div style={{height:'auto'}} className='container main-container'>
                <ChartHeader />
                <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <BarCard>
                        <SalesExpenseChart />
                    </BarCard>
                    <ChartCard w={29} >
                        <StaffsChart />
                    </ChartCard>
                </div>
                <div style={{position:'relative', width: '100%', display:'flex',justifyContent:'space-between'}}>
                    <ChartCard w={49.5} >
                        <TrendsChart />
                    </ChartCard>
                    <ChartCard w={49.5}>
                        <ProfitChart />
                    </ChartCard>
                </div>
                <ChartFooter />
            </div>
        </DashboardContainer>
    )
}

export const SummaryPage = Page;
