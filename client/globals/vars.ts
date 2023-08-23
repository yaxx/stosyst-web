
import { makeVar } from '@apollo/client';



import { PRODUCTS } from './constants'

export * from '.'




// export let defState: GlobalState = {
//     page: '',
//     scope: '',
//     selectedId: '',
//     app_menu: false,
//     invoiceId: '',
//     notification: {
//         opened: false,
//         visible: false,
//         type: '',
//     },
//     isEditing: false,

// }



export const slot = makeVar('');

// export const ttData = makeVar(timetable);
export const ttModal = makeVar(false);
export const setModal = makeVar(false);

