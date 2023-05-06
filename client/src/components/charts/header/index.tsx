import { useQuery } from '@apollo/client';
import { GET_CHART_HEADER } from '../../../graphql/queries/charts';
import { formatMoney } from '../../../utils';
import { SpinLoader } from '../../loaders';
import { LoadingCont } from '../styles';
import { HeaderCont, HeaderItem } from './styles';

export const roundAmount = (amount: number) => {
    if (amount.toString().length >= 7) {
        return `${(amount / 1000000).toFixed(1)}M`;
    }
    else if (amount.toString().length === 6){
        return `${(amount / 1000).toFixed(0)}K`;
    }
     else if (amount.toString().length === 5) {
        return `${(amount / 1000).toFixed(0)}K`;
    } else if (amount.toString().length === 4) {
        return `${(amount / 1000).toFixed(0)}K`;
    }
     else {
        return amount.toFixed(0);
    }
};

export const ChartHeader = () => {
    const { loading, data, error } = useQuery(GET_CHART_HEADER,{
        fetchPolicy: "network-only"
    })
    // console.log(data.chartHeader.totalAmount);
    
    if(error) console.log(error)
    if (data) console.log(data);
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
                        <h1>{roundAmount(data.chartHeader.totalAmount)}</h1>
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

