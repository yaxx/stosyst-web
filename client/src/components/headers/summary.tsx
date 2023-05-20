import { ReactElement } from "react"
import { TAGGLINE } from "../typography"
import { Header, SummaryListHeader, Divider, HeaderItem } from "./styles"

export const SummaryHeader = (props: any): ReactElement => {
    return (
        <Header>
            <SummaryListHeader>
                <Divider top='100' />
                <HeaderItem width={33.3}>
                    <TAGGLINE>SALES</TAGGLINE>
                </HeaderItem>
                <HeaderItem ai='center' width={33.3}>
                    <TAGGLINE>EXPENSES</TAGGLINE>
                </HeaderItem>
                <HeaderItem width={33.3} >
                    <TAGGLINE>NET PROFIT</TAGGLINE>
                </HeaderItem>
            </SummaryListHeader>
        </Header>
    )
}