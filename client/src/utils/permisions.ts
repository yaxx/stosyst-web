import { locals } from "../store/data";
import { PermittedActions } from "../types/model";

export const removePermision = (resouce: string, permision: string) => {
        switch (resouce) {
            case 'staffs':
                locals({
                    ...locals(),
                    staff: {
                        ...locals().staff,
                        permisions: {
                            ...locals().staff.permisions,
                            [permision]: permision === 'creates' ?
                            [...locals().staff.permisions.creates.filter((p: string) => p !== resouce)]
                            :
                            permision === 'edits' ?
                            [...locals().staff.permisions.edits.filter((p: string) => p !== resouce)]
                            :
                            [...locals().staff.permisions.deletes.filter((p: string) => p !== resouce)]
                        }
                    }
                })
                break;
            case 'stocks':
                locals({
                    ...locals(),
                    staff: {
                        ...locals().staff,
                        permisions: {
                            ...locals().staff.permisions,
                            [permision]: permision === 'creates' ?
                            [...locals().staff.permisions.creates.filter((p: string) => p !== resouce)]
                            :
                            permision === 'edits' ?
                            [...locals().staff.permisions.edits.filter((p: string) => p !== resouce)]
                            :
                            [...locals().staff.permisions.deletes.filter((p: string) => p !== resouce)]
                        }
                    }
                })
                break;
            case 'invoices':
                locals({
                    ...locals(),
                    staff: {
                        ...locals().staff,
                        permisions: {
                            ...locals().staff.permisions,
                            [permision]: permision === 'creates' ?
                            [...locals().staff.permisions.creates.filter((p: string) => p !== resouce)]
                            :
                            permision === 'edits' ?
                            [...locals().staff.permisions.edits.filter((p: string) => p !== resouce)]
                            :
                            [...locals().staff.permisions.deletes.filter((p: string) => p !== resouce)]
                        }
                    }
                })
                break;
            case 'expenses':
                locals({
                    ...locals(),
                    staff: {
                        ...locals().staff,
                        permisions: {
                            ...locals().staff.permisions,
                            [permision]: permision === 'deletes' ?
                            [...locals().staff.permisions.deletes.filter((p: string) => p !== resouce)]
                            :
                            permision === 'edits' ?
                            [...locals().staff.permisions.deletes.filter((p: string) => p !== resouce)]
                            :
                            [...locals().staff.permisions.deletes.filter((p: string) => p !== resouce)]
                        }
                    }
                })
                console.log(locals());
                break;
            default:
                break;
        }
    }

export const addPermision = (resouce: string, permision: string) => {
        switch (resouce) {
            case 'staffs':
                    locals({
                        ...locals(),
                        staff: {
                            ...locals().staff,
                            permisions: {
                                ...locals().staff.permisions,
                                [permision]: permision  === 'creates' ?
                                [...locals().staff.permisions.creates, resouce]
                                :
                                permision === 'edits' ? 
                                [...locals().staff.permisions.edits, resouce]
                                :
                                [...locals().staff.permisions.deletes, resouce]
                            }
                        }
                    })
                break;
            case 'stocks':
                    locals({
                        ...locals(),
                        staff: {
                            ...locals().staff,
                            permisions: {
                                ...locals().staff.permisions,
                                [permision]: permision  === 'creates' ?
                                [...locals().staff.permisions.creates, resouce]
                                :
                                permision === 'edits' ? 
                                [...locals().staff.permisions.edits, resouce]
                                :
                                [...locals().staff.permisions.deletes, resouce]
                            }
                        }
                    })
                break;
            case 'invoices':
                locals({
                    ...locals(),
                    staff: {
                        ...locals().staff,
                        permisions: {
                            ...locals().staff.permisions,
                            [permision]: permision === 'creates' ?
                            [...locals().staff.permisions.creates, resouce]
                            :
                            permision === 'edits' ?
                            [...locals().staff.permisions.edits, resouce]
                            :
                            [...locals().staff.permisions.deletes, resouce]
                        }
                    }
                })
                break;
            case 'expenses':
                locals({
                    ...locals(),
                    staff: {
                        ...locals().staff,
                        permisions: {
                            ...locals().staff.permisions,
                            [permision]: permision === 'creates' ?
                            [...locals().staff.permisions.creates, resouce]
                            :
                            permision === 'edits' ?
                            [...locals().staff.permisions.edits, resouce]
                            :
                            [...locals().staff.permisions.deletes, resouce]
                        }
                    }
                })
                break;
            default:
                break;
        }
    }

    export const isAdmin = () => {
        return localStorage.getItem('org') === localStorage.getItem('usr')
    }

    export const isMe = () =>  localStorage.getItem('usr')  === locals().staff._id;

    export const can = (action: string, resource: string) => {
        
        const permisions: PermittedActions = JSON.parse(localStorage.getItem('perms') as any)

        let isPemitted: any = null

        switch (action) {
            case 'add':
                isPemitted = permisions.creates.includes(resource)
                break
            case 'edit':
                isPemitted = permisions.edits.includes(resource)
                break
            case 'delete':
                isPemitted = permisions.deletes.includes(resource)
                break
            default:
                break;
        }
        return isPemitted
    }
