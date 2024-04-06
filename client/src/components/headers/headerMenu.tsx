import { useLazyQuery } from '@apollo/client'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SWITCH_ACCOUNT } from '../../graphql/queries'
import { RightAngleIcon } from '../icons'
import { IconCont } from '../inputs/styles'
import { OptionList, OptItemCont, OptionItem, LinkedAccList, LinkedAccItem, Divider } from './styles'

export const readLocalStorage = () => {
    const account: any = localStorage.getItem('client') as any
    return JSON.parse(account)
}

const HeaderMenu = (props: any) => {

    const [accountList, setAccountList] = useState(false)

    const navigate = useNavigate();

    const client = readLocalStorage()

    const signOut = () => {
        localStorage.removeItem("client");
        localStorage.removeItem("token");
        navigate("/signin");
    }
    const [switchAccount, { loading, error, data }] = useLazyQuery(SWITCH_ACCOUNT, {
        fetchPolicy: 'network-only',
    });

    if (data) {
        const { switchAccount: { token, client } } = data;
        localStorage.setItem('token', token);
        localStorage.setItem('client', JSON.stringify(client));
        window.location.reload()
    }

    if (error) {
        console.log(error);
    }

    const handleSwitchAccount = (id: String) => {
        switchAccount({
            variables: {
                id
            }
        })
    }

    return (
        <OptionList>
            <OptItemCont>
                <OptionItem>
                    <p>{client?.name}</p>
                    <p style={{ color: 'grey' }}>@{client?.username}</p>
                </OptionItem>
            </OptItemCont>
            <OptItemCont onMouseEnter={() => setAccountList(true)} onMouseLeave={() => setAccountList(false)}>
                {
                    localStorage.getItem('admin') === 'yes' &&
                    <>
                        <OptionItem>
                            <p>Switch account</p>
                        </OptionItem>
                        <IconCont className="icon" size={12}>
                            <RightAngleIcon />
                        </IconCont>
                    </>
                }
                {
                    accountList &&
                    <LinkedAccList> {
                        client?.linkedTo.map((a: any, i: number) => (
                            <LinkedAccItem key={i} onClick={() => handleSwitchAccount(a._id)}>
                                <p>{a.name}</p>
                                <p className='usrnm'>@{a.username}</p>
                                {
                                    i !== client?.linkedTo.length && <Divider />
                                }
                            </LinkedAccItem>
                        ))
                    }
                    </LinkedAccList>
                }
            </OptItemCont>
            <OptionItem onClick={() => signOut()}>
                <p>Sign out</p>
            </OptionItem>
        </OptionList>

    )
}

export default HeaderMenu