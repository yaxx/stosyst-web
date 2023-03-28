"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStockSetPipeline = void 0;
const getStockSetPipeline = (ownerId, query, group, groupLabel, filter, offset) => {
    let pipe = [];
    if (group === 'name') {
        pipe = [
            {
                $match: { owner: ownerId }
            },
            {
                $set: {
                    firstCharacter: { $toUpper: { $substr: ['$name', 0, 1] } }
                }
            },
            {
                $match: { firstCharacter: groupLabel }
            },
            {
                $unset: 'firstCharacter'
            },
            {
                $sort: { name: 1 }
            },
        ];
    }
    else if (group === 'category') {
        pipe = [
            {
                $match: { owner: ownerId, category: groupLabel }
            }
        ];
    }
    else if (group === 'instock') {
        pipe = [
            {
                $match: { owner: ownerId, instock: +groupLabel }
            }
        ];
    }
    return pipe;
};
exports.getStockSetPipeline = getStockSetPipeline;
//# sourceMappingURL=sets.js.map