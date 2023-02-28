
export const getSorter = (group: string)=> group === 'date' ? {'_id.year':-1, '_id.month':-1, '_id.day':-1} : { _id: 1 }