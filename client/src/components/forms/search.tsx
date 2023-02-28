import { ReactElement } from "react";
import SearchInput from "../inputs";
import { MainSearchForm } from "./styles";

export function SearchForm(props: any): ReactElement {
    return (
        <MainSearchForm>
            <SearchInput {...props} placeholder='Search' />
        </MainSearchForm>
    )
}
