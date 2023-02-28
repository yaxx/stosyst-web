import { ReactElement } from 'react'
import { SettingsNavHeader } from '../../components/headers'

export default function Settings(): ReactElement {
    return (
        <div className='container settings-container'>
            <SettingsNavHeader/>
        </div>
    )
}
