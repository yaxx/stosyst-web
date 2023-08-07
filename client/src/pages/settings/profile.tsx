import { ReactElement, useState } from 'react'

import { GET_ACC_DETAILS } from '../../graphql/queries/account'
import { useQuery } from '@apollo/client'
import { SideNav } from '../../components/sideNavigation/SideNav'
import { ImageItem } from '../../components/images'
import { Divider } from '../../components/headers/styles'
import { AccDateItem, AccHeaderItem, AccountInfoCont, AccountInfoItem, AccSectionHeader, BillingInfoCont, FeedbackCont, LinkeAccInfoItem, ListContainer, ModalContainer } from './styles'
import { PlusIcon } from '../../components/icons'
import { IconCont } from '../../components/inputs/styles'
import AccountForm from '../../components/forms/settings/account'
import { PageLoading } from '../../components/loaders'

import { format_date } from '../../utils'
interface Props {

}

function Dp({ uri }: { uri: string }) {

    const [dp, setdp] = useState(uri)
    return (
        <ImageItem source='a35f9e5f-771c-4afd-b4b7-0869842c8dc9' h={120} w={120} r={60} />
    )
}

export default function Profile({ }: Props): ReactElement {
    const [visibleForm, setVisibleForm] = useState('')
    const [openModal, setOpenModal] = useState(false)

    const openForm = (name: string) => {
        setVisibleForm(name)
        setOpenModal(true)
    }
    const closeModal = () => {
        setVisibleForm('')
        setOpenModal(false)
    }


    const { loading, data, refetch, error } = useQuery(GET_ACC_DETAILS, {
        fetchPolicy: "network-only"
    })

    if (error) {
        console.log(error);
    }

    if (data) {
        console.log(data);
    }

    return (
        <>
            <SideNav />
            {
                loading ?
                    <PageLoading />
                    :
                    <>
                        <AccSectionHeader style={{ marginTop: 20 }}>
                            <AccHeaderItem>
                                <h6>Timeline</h6>
                                <p>Change identifying details for your account</p>
                            </AccHeaderItem>
                            <AccHeaderItem end>
                                <IconCont size={14}>
                                    <PlusIcon />
                                </IconCont>
                            </AccHeaderItem>
                            <Divider />
                        </AccSectionHeader>
                        <ListContainer>
                            <AccountInfoCont>
                                <AccDateItem>
                                    <h6>DATE CREATED </h6>
                                    <p>{format_date(data.accDetails.createdAt || '')}</p>
                                </AccDateItem>
                                <AccDateItem>
                                    <h6> LAST PAID </h6>
                                    <p>{format_date(data.accDetails.timeLine.renewed || '')}</p>
                                </AccDateItem>
                                <AccDateItem>
                                    <h6>DUE</h6>
                                    <p>{format_date(data.accDetails.timeLine.due)}</p>
                                </AccDateItem>
                                <AccDateItem end>
                                    <h6>STATUS</h6>
                                    <p style={{ color: '#61b361' }}>Active</p>
                                </AccDateItem>
                                <Divider />
                            </AccountInfoCont>
                        </ListContainer>
                        <AccSectionHeader>
                            <Divider bottom={100} />
                            <AccHeaderItem>
                                <h6>Payment Mehthods</h6>
                                <p>Change identifying details for your account</p>
                            </AccHeaderItem>
                            <AccHeaderItem end>
                                <IconCont size={14}>
                                    <PlusIcon />
                                </IconCont>
                            </AccHeaderItem>
                            <Divider />
                        </AccSectionHeader>
                        <ListContainer>
                            {
                                data.accDetails.paymentMethods.length ?
                                    <>
                                        {
                                            data.accDetails.paymentMethods.map((card: any) => (
                                                <BillingInfoCont key={card._id}>
                                                    <LinkeAccInfoItem>
                                                        <h6>{card.name}</h6>
                                                        <p>{card.cardNumber}</p>
                                                    </LinkeAccInfoItem>
                                                    <AccountInfoItem end>
                                                        <p style={{ textAlign: 'right' }}>DEFAULT</p>
                                                        {/* <h6>{link.username}</h6> */}
                                                    </AccountInfoItem>
                                                    <Divider />
                                                </BillingInfoCont>
                                            )
                                        )
                                        }
                                    </>
                                    :
                                    <FeedbackCont>
                                        <h6>No payment information added</h6>
                                        <p>Add payment to continue using the application</p>
                                    </FeedbackCont>
                            }
                        </ListContainer>
                        <AccSectionHeader>
                            <Divider bottom={100} />
                            <AccHeaderItem>
                                <h6>Linked Accounts</h6>
                                <p>Change identifying details for your account</p>
                            </AccHeaderItem>
                            <AccHeaderItem end>
                                <IconCont onClick={() => openForm('account')} size={14}>
                                    <PlusIcon />
                                </IconCont>
                            </AccHeaderItem> {
                                visibleForm === "account" && <AccountForm />
                            }
                            <Divider />
                        </AccSectionHeader>
                        <ListContainer> {
                            data.accDetails.linkedTo.length ?
                                data.accDetails.linkedTo.map((link: any) => (
                                    <BillingInfoCont key={link._id}>
                                        <LinkeAccInfoItem>
                                            <h6>{link.name}</h6>
                                            <p>{link.address}</p>
                                        </LinkeAccInfoItem>
                                        <AccountInfoItem end>
                                            <p style={{ textAlign: 'right' }}>{link.phone}</p>
                                            <h6>{link.username}</h6>
                                        </AccountInfoItem>
                                        <Divider />
                                    </BillingInfoCont>
                                ))
                                :
                                <FeedbackCont>
                                    <h6>No account associated with this account</h6>
                                    <p>Add another account to be associated with this account </p>
                                </FeedbackCont>
                        }
                        </ListContainer>
                    </>
            }



            {/* <SettingsItem height = '120'>
                <SettingGroup>
                    <LabelGroup>
                        <p>Username</p>
                    </LabelGroup>
                    <ActionGroup>
                        <GroupItems w ='250px' bottom = '10'>
                            <NameInput
                                value = { data?.account?.username|| '' }
                                name = 'id'
                                label = 'Username' 
                                placeholder ='Your username'
                            />
                        </GroupItems>
                    </ActionGroup>
                </SettingGroup>
            </SettingsItem> */}
            {/* <SettingsItem height = '150'>
                <SettingGroup> 
                    <LabelGroup>
                        <p>Display Name</p>
                    </LabelGroup>
                    <ActionGroup>
                        <GroupItems w ='250px' bottom = '10'>
                            <NameInput
                                value = { data?.account?.name||'' }
                                name = 'name'
                                label = 'Display name' 
                                placeholder ='Senate Plaza Jalingo'
                            />
                        </GroupItems>
                    </ActionGroup>
                </SettingGroup>
                <SaveBtn>Save</SaveBtn>
                <Divider top ='100'/>
            </SettingsItem> */}
            {
                openModal &&
                <ModalContainer onClick={() => closeModal()} >
                </ModalContainer>
            }
        </>

    )
}
