import { useQuery } from '@apollo/client';
import { GET_CHART_HEADER } from '../../../graphql/queries/charts';
import { formatMoney } from '../../../utils';
import { SpinLoader } from '../../loaders';
import { LoadingCont } from '../styles';
import { HeaderCont, HeaderItem } from './styles';


export const ChartHeader = () => {
    const { loading, data, error } = useQuery(GET_CHART_HEADER,{
        fetchPolicy: "network-only"
    })

    if(error) console.log(error)
    
    return (
        <HeaderCont> {
            data ? 
            <>
                <HeaderItem w={30}>
                    <h1>{formatMoney(data.chartHeader.stocksCount)}</h1>
                    <h6>Stocks</h6>
                </HeaderItem>
                <HeaderItem w={30}>
                    <h1>{formatMoney(data.chartHeader.uniqueStocks)}</h1>
                    <h6>Unique Stocks</h6>
                </HeaderItem>
                <HeaderItem w={15}>
                    <h1>{formatMoney(data.chartHeader.categories)}</h1>
                    <h6>Categories</h6>
                </HeaderItem>
                <HeaderItem f="flex-end" w={30}>
                    <h1>{formatMoney(data.chartHeader.totalAmount)}</h1>
                    <h6>Total Value</h6>
                    
                </HeaderItem>
            </>
            :
                <LoadingCont>
                    <SpinLoader size={'40px'} />
                </LoadingCont>
            }
        </HeaderCont>
    )
}

