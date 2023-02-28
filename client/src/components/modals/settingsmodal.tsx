import { Fragment, useEffect } from 'react'
import { CloseIcon } from '../icons'
import { defState, locals } from '../../store/data'
import { closeModal } from '../../utils'
import { useGetLocals } from '../../hooks/useGetProducts'
import StaffEditor from '../../pages/settings/staff'
import { ModalContainer } from './styles'

const  Modal = (props: any) => {

    useEffect(() => {
        return () => {
            locals({
                ...defState
            })
        }
    }, [])

    const { localData: { localState }, issues } = useGetLocals();

    return localState.page === 'settings' ?
        <ModalContainer onClick = { () => closeModal() } >
            <CloseIcon onClick = { () => closeModal() }/> 
            <StaffEditor {...props} />
        </ModalContainer>
        :
        <Fragment></Fragment> 
}

export const SettingsModal =  Modal
