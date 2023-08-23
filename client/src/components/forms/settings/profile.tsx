import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { UPLOAD_FILE } from '../../../graphql/mutations'
import { UPDATE_ACCOUNT } from '../../../graphql/mutations/account'
import { GET_ACCOUNT } from '../../../graphql/queries'
import { tempClient } from '../../../store/data'
import { data } from '../../charts'
import { MainBanerCont, ProfileBaner, ProfileImage, ProfilePicture, SubsBtn, ProfileInfo } from '../../headers/styles'
import { CheckIcon } from '../../icons'
import { IconCont } from '../../icons/styles'
import { ImageItem } from '../../images'
import { Mask } from '../../images/styles'
import { FileInput, FormGroupCont, NameInput } from '../../inputs'
import { Loader, SpinLoader } from '../../loaders'
import { FormCont, ProForm } from './styles'


const ProfileForm = (props: any) => {

    const [account, setAccount] = useState(props?.account || {})
    const [inFocus, setInFocus] = useState("name");
    const [done, setDone] = useState(false);




    const [
        uploadFile,
        { loading: uploading, error: uploadError },
    ] = useMutation(UPLOAD_FILE, {
        onCompleted: (data: any) => {
            // setImage(data.uploadFile.uri);
            // setStocks({
            //     ...stock,
            //     stockImage: data.uploadFile.uri,
            // });
        },
        onError: (error: any) => {
            console.log({ error });
        },
    });
    if (uploadError) {
        console.log(uploadError);
    }

    const hangleFileChange = async (e: any) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        } else {
            setAccount({
                 ...account, 
                 dp: file 
            });
            uploadFile({
                variables: {
                    file,
                },
            });
        }
    };
    const handleClear = (name: string) => {
        setAccount({
            ...account,
            [name]: "",
        });
    };
    const handleChange = (e: any) => {
        e.persist()
        const { name, value } = e.target
        setAccount({
            ...account,
            [name]: value,
        });
    };

    const [saveAccInfo, { error, loading, data }] = useMutation(UPDATE_ACCOUNT, {
        update: (cache, { data: { updateAccount } }) => {
            const data: any = cache.readQuery({
                query: GET_ACCOUNT,
            });
            cache.writeQuery({
                query: GET_ACCOUNT,
                data: {
                    ...updateAccount
                },
            });
        },
    });

    if (error) console.log({ error });

    const handleSubmit = ()=>{
        delete account.paymentMenthod
        delete account.linkedTo
        delete account.__typename
        console.log(account)
        // saveAccInfo({
        //     variables: {
        //        input: {
        //             ...account
        //        } 
        //     }
        // })
    }

    return (
        <>
            <MainBanerCont>
                <ProfileBaner height='100' width='100'>
                    <ImageItem
                        h={"100%"}
                        w={"100%"}
                        r="0px"
                        source={account.dp}
                        alt=""
                    />
                    <FileInput onChange={hangleFileChange} type="file" />
                    {
                        uploading &&
                        <SpinLoader c="white" lf={25} b={27} size="20px" />
                    }
                    <Mask>Edit</Mask>
                </ProfileBaner>
                <ProfileImage>
                    <ProfilePicture height='150' width='150'>
                        <ImageItem
                            h={'144px'}
                            w={'140px'}
                            r="75px"
                            source={account.dp}
                            alt=""
                        />
                        <FileInput onChange={hangleFileChange} type="file" />
                        {
                            uploading && 
                            <SpinLoader c="white" lf={25} b={27} size="18px" />
                        }
                        <Mask>Edit</Mask>
                    </ProfilePicture>
                </ProfileImage>
                <SubsBtn onClick={handleSubmit}>
                    {
                        loading ? 
                        <Loader size={"24px"}/>
                        :
                        done ?
                        <IconCont rot={0} size={14}>
                            <CheckIcon color={'white'} />
                        </IconCont> 
                        :
                        'Save'
                    }
                    
                </SubsBtn>
            </MainBanerCont>
            <FormCont>
                <ProForm>
                    <FormGroupCont>
                        <NameInput
                            autoFocus='autoFocus'
                            name='name'
                            label='Name'
                            value={account.name}
                            focusCallback={setInFocus}
                            clearCallback={handleClear}
                            changeCallback={handleChange}
                        />
                    </FormGroupCont>
                    <FormGroupCont>
                        <NameInput
                            name='username'
                            label='Username'
                            value={account.username}
                            changeCallback={handleChange}
                            focusCallback={setInFocus}
                            clearCallback={handleClear}
                        />
                    </FormGroupCont>
                    <FormGroupCont>
                        <NameInput
                            name='address'
                            label='Address'
                            value={account.address}
                            focusCallback={setInFocus}
                            clearCallback={handleClear}
                            changeCallback={handleChange}
                        />
                    </FormGroupCont>
                </ProForm>
            </FormCont>
        </>

    )
}

export default ProfileForm