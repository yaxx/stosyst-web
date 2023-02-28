import { useQuery } from '@apollo/client';
import { GET_CHART_FOOTER } from '../../../graphql/queries/charts';
import { HeaderCont, HeaderItem } from '../header/styles';
import { SpinLoader } from '../../loaders';
import { LoadingCont } from '../styles';
export const ChartFooter = () => {
    const { loading, data, error } = useQuery(GET_CHART_FOOTER,{
        fetchPolicy: "network-only"
    })
    if (error) console.log(error);

    return (
        <HeaderCont> {
            data ? 
            <>
                <HeaderItem w={30}>
                    <h1>{data.chartFooter.lowStocksCount}</h1>
                    <h6>Low Stocks</h6>
                </HeaderItem>
                <HeaderItem w={30}>
                    <h1>{data.chartFooter.outOfStocks}</h1>
                    <h6>Out of Stock</h6>
                </HeaderItem>
                <HeaderItem w={15}>
                    <h1>{data.chartFooter.expiring}</h1>
                    <h6>Expiring</h6>
                </HeaderItem>
                <HeaderItem f="flex-end" w={30}>
                    <h1>{data.chartFooter.expired}</h1>
                    <h6>Expired</h6>
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

