import { Fragment, ReactElement, SyntheticEvent, useEffect } from 'react'

import { Back, CircularBtn, DeleteBtn, EditBtn, PriBtn } from '../../components/buttons'
import { useMutation, useQuery } from '@apollo/client'
import { GET_ALL_STAFFS } from '../../graphql/queries/account'
import {EmptyState, ErrorState } from '../../components/issues'
import { Loader, PageLoading } from '../../components/loaders'
import { initStaff, locals } from '../../store/data'
import { addPermision, editCallback, format_date, isAdmin, isMe, removePermision, showFeedback } from '../../utils'
import { useGetLocals } from '../../hooks/useGetProducts'
import SettingsForm from '../../components/forms/staffs.settings'
import { useState } from 'react'
import { SettingsFormWraper } from '../../components/listItems/cartItem'
import { PhotoMask } from '../../components/stockImages'
import { FileInput } from '../../components/inputs'
import { UPLOAD_FILE } from '../../graphql/mutations/file-upload'
import { CheckIcon, MoreIcon, PlusIcon } from '../../components/icons'
import { SideNav } from '../../components/sideNavigation/SideNav'
import { FlatList as HeaderItems, FlatRow as Header, Item, MoreActions } from '../../components/listItems'
import { H4, H5, H6 } from '../../components/typography'
import { DELETE_STAFF, SaveInfo } from '../../graphql/mutations/account'
import { Staff as StaffModel } from '../../types/model'
import { ImageItem } from '../../components/images'
import { Mask } from '../../components/images/styles'
import { Divider, StaffList, StaffItems, StaffWrapper, Staff, StaffInfoItem, ItemContainer, PermisionItem, Permision, CheckBox, StaffSelected, Banner, BannerItems, StaffInfo, PermisionsContainer, FeedBack } from '../../components/headers/stylesx'
import { IssueContainer, Issue } from '../../components/issues/styles'
import { Card } from '../../components/modals/styles'
interface Props {
    
}

export function Page(props: any): ReactElement {

    useEffect(() => {
        return () => {
            locals({
                ...locals(),
                notification: {
                    ...locals().notification,
                    visible: true,
                    opened: false
                }
            })
        }
    }, [])

    const [editing, setEditing] = useState(false);

    const { localData:{ localState }, issues } = useGetLocals();

    const { loading, data, refetch, error} = useQuery(GET_ALL_STAFFS, {
        fetchPolicy: "network-only"
    })

    if (error) console.log({ error })
    if (data) console.log({ data })
        
    return (
        <Fragment>
            <SideNav />
            <Header>
                <HeaderItems>
                    <Divider bottom='100' />
                    <HeaderItems>
                        <Divider bottom='100' />
                        <Item width={42.5}>
                            <H4>Staffs</H4>
                        </Item>
                        <Divider />
                    </HeaderItems> {
                        isAdmin() && 
                        <CircularBtn h='30' w='30' onClick={(e: any) => editCallback(e, 'settings', 'new', initStaff, '')}>
                            <PlusIcon/>
                        </CircularBtn>
                    } 
                    <Divider />
                </HeaderItems>
            </Header>
            <StaffList height = '170'>
                <StaffItems> {
                     loading ?
                        <IssueContainer w = '100vw'>
                            <Issue>
                                 <PageLoading/>
                            </Issue>
                        </IssueContainer>
                        :
                        error ? 
                        <IssueContainer w='100vw'>
                            <Issue>
                                <ErrorState w ='150px' retryCallback = { refetch } />
                            </Issue>
                        </IssueContainer>
                        :
                        !data?.staffs?.length ?
                        <IssueContainer w='100vw'>
                            <Issue>
                                <EmptyState
                                    addCallback = {(e:any) => editCallback(e,'settings','new', initStaff, '' )}
                                    { ...props }
                                    w ='150px'
                                    btnLabel = 'Add Staff'
                                    message = 'No Staffs' 
                                    suggestion = 'All staffs added appears here' 
                                />
                            </Issue>
                        </IssueContainer>
                        :
                        data?.staffs.map((staff: StaffModel) =>
                        <StaffWrapper>
                            <Staff onClick = {(e: Event) => editCallback(e,'settings', 'view', staff, 'view' )}>
                                    <ImageItem bc={'whitesmoke'} h={'130px'} w={'130px'} r={'50%'} source={staff.dp} />
                                <H4>{staff.firstName}</H4>
                                <p>
                                    {staff.position}
                                </p>
                            </Staff>
                        </StaffWrapper>
                        )
                    }
               </StaffItems>
            </StaffList>
        </Fragment>
    )
}



 const  PermisionGroup = (props: any)  => {
     const { name, addCallback, removeCallback} = props
    return (
        <Fragment>
            <StaffInfoItem>
                <ItemContainer h='25px'>
                    <H6>{name}</H6>
                </ItemContainer>
                <Divider ps='relative' />
            </StaffInfoItem>
            <PermisionItem>
                <ItemContainer>
                    <Permision> {
                        locals().staff.permisions.creates.some((p: string) => p === name.toLowerCase()) ? 
                         <CheckIcon clickCallback={() => removeCallback(name.toLowerCase(), 'creates')} />
                         :
                        <CheckBox onClick = {()=>addCallback(name.toLowerCase(),'creates')}/>
                        }
                        <p>Create</p>
                    </Permision>
                    <Permision> {
                        locals().staff.permisions.edits.some((p: string) => p === props.name.toLowerCase()) ?
                        <CheckIcon clickCallback={() => removeCallback(name.toLowerCase(),'edits')}/>
                        :
                        <CheckBox onClick={() => addCallback(name.toLowerCase(), 'edits')} />
                        }
                        <p>Edit</p>
                    </Permision>
                    <Permision> {
                        locals().staff.permisions.deletes.some((p: string) => p === name.toLowerCase()) ?
                        <CheckIcon clickCallback={() => removeCallback(name.toLowerCase(), 'deletes')} />
                        :
                        <CheckBox onClick={() => addCallback(name.toLowerCase(), 'deletes')} />
                        }
                        <p>Delete</p>
                    </Permision>
                </ItemContainer>
                <Divider ps='relative' />
            </PermisionItem>
        </Fragment>
    )
}


export default function StaffEditor(props: any) {
    const [editing, setEditing] = useState(false)
    const [permisions, setPermisions] = useState(false)

    let [slideIn, setSlideIn] = useState(locals().page ==='staff' ? true : false)
    let [photo, setPhoto] = useState('')

    const [menu, setMenu] = useState(false)

    const menuActions = 
    [
        {
            label: 'Edit Info',
            divide: true,
            permitted: isMe() || isAdmin(),
            callback: () => setEditing(true)
        },
        {
            label: 'Edit Permisions',
            divide: true,
            permitted: isAdmin(),
            callback: () => setPermisions(true)
        }
    ]
    
    const resouceList = ['STAFFS', 'STOCKS', 'INVOICES', 'EXPENSES'];

    useEffect(() => {
        setSlideIn(true)
    }, [slideIn])

       
    const backToView  = () => {
        locals({
            ...locals(),
        })
        setEditing(false)
        setPermisions(false)
    }

    const [uploadFile] = useMutation(UPLOAD_FILE, {
        onCompleted: (data: any) => {
            locals({
                ...locals(),
                staff: photo === 'dp' ? 
                {
                    ...locals().staff,
                    dp: data.uploadFile.uri
                }
                :
                {
                    ...locals().staff,
                    banner: data.uploadFile.uri
                }
            })
        },
        onError: (error: any) => {
            console.log({error})
        }
    })
    
    const hangleFileChange = (e: any, p: string) => {
        e.stopPropagation();
        setPhoto(p)
        const file = e.target.files[0];

        if(!file) return 

        uploadFile({
            variables: { 
                file 
            } 
        })
    }
    const [saveInfo, { error, loading, data }] = useMutation(SaveInfo, {
        update: (cache, { data }) => {
            let prev = cache.readQuery({
                query: GET_ALL_STAFFS
            })

            let { staffs }: any = prev

            staffs = staffs.map((s: StaffModel) => s._id === data.saveInfo._id ? data.saveInfo : s)

            cache.writeQuery({
                query: GET_ALL_STAFFS,
                data: {
                    staffs
                }
            })
            locals({
                ...locals(),
                staff: data.saveInfo
            })
            showFeedback(true, 'Permisions updated')
        }
    })
    const [deleteStaff, { error:e, loading: deleting, data:d }] = useMutation(DELETE_STAFF, {
        update: (cache, { data }) => {
            let prev = cache.readQuery({
                query: GET_ALL_STAFFS
            })
            let { staffs }: any = prev
            staffs = staffs.filter((s: StaffModel) => s._id !== data.deleteStaff.id)

            cache.writeQuery({
                query: GET_ALL_STAFFS,
                data: {
                    staffs
                }
            })
            showFeedback(true, 'Staff deleted successfully')
        }
    })

    const updatePermisions = () => {
        const { __typename, permisions, ...stripedStaff }: any = locals().staff;
        const { __typename:tn, ...stripedPermisions } = permisions

        saveInfo({
            variables: {
                staff: {
                    ...stripedStaff, 
                    permisions: stripedPermisions
                }
            }
        })
    }
    const dropStaff = () => {
        deleteStaff({
            variables: {
                id: locals().staff._id
            }
        })
    }

    if (error) {
        showFeedback(false, 'Unable to update permisions')
        console.log({ error })
    }
    if(e) {
        showFeedback(false, 'Unable to delete staff')
        console.log({ e })
    }
    return (
        <>
        <Card overflow = 'visible' slideIn={ slideIn } onClick={(e: any) => e.stopPropagation()}>
            <StaffSelected>
                <Banner>{
                    (editing || permisions) &&
                    <Back title ='Back' onClick ={ () => backToView() }>
                        <svg width="8" height="13" viewBox="0 0 10 17" fill="none" >
                            <rect width="1.31603" height="11.0286" transform="matrix(-0.710482 0.703715 -0.710482 -0.703715 9.14258 15.3335)" fill="dodgerblue"/>
                            <rect width="1.32253" height="9.92865" transform="matrix(0.710482 0.703715 -0.710482 0.703715 8.31836 0.626465)" fill="dodgerblue"/>
                        </svg>
                    </Back>
                    }
                    <ImageItem bw={0} source={locals().staff?.banner} h={'auto'} w={'auto'} r={'0%'} />
                        {
                        (editing || locals().scope === 'new') &&
                        <>
                            <FileInput onChange={(e: SyntheticEvent) => hangleFileChange(e, 'banner')} type='file' />
                            <Mask>Edit</Mask>
                        </>
                    }
                </Banner>
                <BannerItems>
                    <div style={{position:'relative', overflow:'hidden', top: 40, marginBottom:100, borderRadius: 60, width:120, height:120}}>
                        <ImageItem bw={10} bc={'white'}  source={locals().staff?.dp} h={'120px'} w={'120px'} r={'50%'} /> 
                        {
                            (editing || locals().scope === 'new') &&
                            <>
                                <FileInput onChange={(e: SyntheticEvent) => hangleFileChange(e, 'dp')} type='file' />
                                <Mask>Edit</Mask>
                            </>
                        }
                    </div>
                    {
                        ((!editing && locals().scope !== 'new') && (isMe()||isAdmin())) ?
                        <EditBtn>
                            <MoreIcon openMenuCallback ={() => setMenu(true)} fill ='white'/> {
                                    menu && <MoreActions onClick={() => setMenu(false)} onMouseLeave={() => setMenu(false)} top='49%' rt='-19px'
                                    actions={ menuActions }
                                />
                            }
                        </EditBtn>
                        :
                        <></>
                    }
                </BannerItems>
                {
                    editing || locals().scope === 'new' ? 
                    <SettingsFormWraper h='auto'>
                        <H4>Staff Details</H4>
                        <SettingsForm toggleCallback = { setEditing }  h='auto'/>
                    </SettingsFormWraper>
                    :
                    <StaffInfo>
                        <StaffInfoItem>
                            <ItemContainer>
                                <H4>{ locals().staff.firstName }</H4>
                            </ItemContainer>
                            <Divider ps='relative' />
                        </StaffInfoItem> {
                                (!permisions && !editing)  &&
                            <Fragment>
                                <StaffInfoItem>
                                    <ItemContainer>
                                        <H5>Department</H5>
                                        <p>{locals().staff.department||'---'}</p>
                                        <H5>Position</H5>
                                        <p>{locals().staff.position || '---'}</p>
                                    </ItemContainer>
                                    <Divider ps='relative' />
                                </StaffInfoItem>
                                <StaffInfoItem>
                                    <ItemContainer >
                                        <H5>Mobile</H5>
                                        <p>{locals().staff.phone|| '---'}</p>
                                        <H5>Email</H5>
                                        <p>{locals().staff.email || '---'}</p>
                                        <H5>Address</H5>
                                        <p>{locals().staff.address|| '---'}</p>
                                    </ItemContainer>
                                    <Divider ps='relative' />
                                </StaffInfoItem>{
                                        isAdmin() &&
                                        <StaffInfoItem>
                                            <ItemContainer >
                                                <H5>Password</H5>
                                                <p>{locals().staff.password}</p>
                                            </ItemContainer>
                                            <Divider ps='relative' />
                                        </StaffInfoItem>
                                }
                                <StaffInfoItem>
                                    <ItemContainer >
                                        <H5>Date of Birth</H5>
                                        <p>{'---'}</p>
                                        <H5>Created</H5>
                                        <p>{format_date(locals().staff.createdAt)}</p>
                                    </ItemContainer>
                                    <Divider ps='relative' />
                                </StaffInfoItem> {
                                    isAdmin() &&
                                    <DeleteBtn onClick={() => dropStaff()} w='256px'> {
                                        deleting ?
                                            <Loader />
                                            :
                                            'Delete Staff'
                                    }
                                    </DeleteBtn>
                                } 
                            </Fragment> 
                        }
                        {
                            (permisions && !editing) &&
                            <Fragment>
                                    <StaffInfoItem>
                                        <ItemContainer h='30px'>
                                            <H5>Permisions</H5>
                                        </ItemContainer>
                                        <Divider ps='relative' />
                                    </StaffInfoItem>
                                    <PermisionsContainer>{
                                        resouceList.map((resouceName)=>(
                                            <PermisionGroup removeCallback={removePermision} addCallback={addPermision} name={resouceName} />
                                        ))
                                    }
                                    </PermisionsContainer>
                                    <PriBtn onClick={()=>updatePermisions()} w='256px'> { 
                                        loading ?
                                        <Loader />
                                        :
                                        'Update Permisions'
                                    }
                                    </PriBtn>
                           </Fragment>
                        }
                </StaffInfo> 
                }
            </StaffSelected>
            <FeedBack state={locals().feedback.success} msg={locals().feedback.msg}><p>{locals().feedback.msg}</p></FeedBack>
        </Card>
        </>
    )
}


export const Staffs =  Page