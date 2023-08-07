import { useLazyQuery } from '@apollo/client'
import React, { useState } from 'react'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { SWITCH_ACCOUNT } from '../../graphql/queries'
import { Client } from '../../types/model'
import { RightAngleIcon } from '../icons'
import { IconCont } from '../inputs/styles'
import { OptionList, OptItemCont, OptionItem, LinkedAccList, LinkedAccItem } from './styles'

export const readLocalStorage = () => {
    const account: any = localStorage.getItem('client') as any
    return JSON.parse(account)
}

const HeaderMenu = (props: any) => {

    const navigate = useNavigate();

    const client = readLocalStorage()
    
    const signOut = () => {
        localStorage.clear();
        navigate("/signin");
    }
    const [switchAccount, { loading, error, data }] = useLazyQuery(SWITCH_ACCOUNT);

    if(data) {
        console.log("switched account", data)
    }
    
    if(error) {
        console.log(error);
    }

    if(loading) console.log('loading')

    const handleSwitchAccount = (client: Client) => {
        switchAccount({
            variables: {
                id: client._id
            }
        })
    }
    
    return (
        <OptionList >
            <OptItemCont>
                <OptionItem>
                    <p>{client?.name}</p>
                    <p style={{ color: 'grey' }}>
                        @{client?.username}
                    </p>
                </OptionItem>
            </OptItemCont>
            <OptItemCont>
                <OptionItem>
                    <p>Settings</p>
                </OptionItem>
            </OptItemCont>
            <OptItemCont>
                <OptionItem>
                    <p>Switch account</p>
                </OptionItem>
                <IconCont className="icon" size={12}>
                    <RightAngleIcon />
                </IconCont>
                <LinkedAccList> {
                    client?.linkedTo.map((a: any) => (
                        <LinkedAccItem onClick={()=>handleSwitchAccount(a)}>
                            <p>{a.name}</p>
                            <p>@{a.username}</p>
                        </LinkedAccItem>
                    ))
                }
                </LinkedAccList>
            </OptItemCont>
            <OptionItem onClick={() => signOut()}>
                <p>Sign out</p>
            </OptionItem>
        </OptionList>

    )
}

export default HeaderMenu