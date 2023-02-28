import { useState } from 'react'
import { colors } from '.';
import { ListItem, NextListIcon, TrendingList } from './styles';

export const TrendsList = (props: any) => {
    const [next, setNext] = useState(true)

    const {listItems, inview} = props;

    const getList = ()=>{
       return next ? listItems.slice(0,5) : listItems.slice(5,10)
    }
    const getListColors = ()=>{
       return next ? colors.slice(0,5) : colors.slice(5,10)
    }

    return (
            <>
                <TrendingList start={next ? '1' : '6'}> {
                    getList().map((i: any, index: number) => (
                        <ListItem color={getListColors()[index]} key={i.stocks.item.name}>
                            <p>{inview === 'Stocks' ?i.stocks.item.name : i.stocks.item.category}</p>{
                               <p>{inview === 'Stocks' ? i.stocks.item.description : ''}</p>
                            }
                        </ListItem>
                    ))
                }
                </TrendingList>
                <NextListIcon onClick={() => setNext(!next)} title={!next ? 'Previous' : 'Next'}> {
                    !next ?
                        <svg width="8" height="11" viewBox="0 0 13 16" fill="none" >
                            <path d="M12 9C12.5523 9 13 8.55228 13 8C13 7.44772 12.5523 7 12 7V9ZM0.292894 7.29289C-0.0976303 7.68342 -0.0976303 8.31658 0.292894 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928934C7.68054 0.53841 7.04738 0.53841 6.65685 0.928934L0.292894 7.29289ZM12 7H1V9H12V7Z" fill="#00A3FE" />
                        </svg>
                        :
                        <svg width="8" height="11" viewBox="0 0 13 16" fill="none" >
                            <path d="M1 7C0.447716 7 3.46305e-07 7.44772 2.98023e-07 8C2.49741e-07 8.55228 0.447715 9 1 9L1 7ZM12.7071 8.70711C13.0976 8.31658 13.0976 7.68342 12.7071 7.29289L6.34315 0.928935C5.95262 0.538411 5.31946 0.53841 4.92893 0.928935C4.53841 1.31946 4.53841 1.95262 4.92893 2.34315L10.5858 8L4.92893 13.6569C4.53841 14.0474 4.53841 14.6805 4.92893 15.0711C5.31946 15.4616 5.95262 15.4616 6.34315 15.0711L12.7071 8.70711ZM1 9L12 9L12 7L1 7L1 9Z" fill="#00A3FE" />
                        </svg>
                }
                </NextListIcon>
            </>
    )

}

