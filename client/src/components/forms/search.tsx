import { ReactElement } from "react";
import SearchInput, { ProductsSearchInput, StockSearchInput } from "../inputs";
import { MainSearchForm } from "./styles";

export function SearchForm(props: any): ReactElement {
    return (
        <MainSearchForm id="search--form">
            <StockSearchInput {...props} placeholder='Search' />
        </MainSearchForm>
    )
}
export function ProdSearchForm(props: any): ReactElement {
    return (
        <MainSearchForm>
            <ProductsSearchInput {...props} placeholder='Search' />
        </MainSearchForm>
    )
}
