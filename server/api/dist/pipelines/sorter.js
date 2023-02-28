"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSorter = void 0;
const getSorter = (group) => group === 'date' ? { '_id.year': -1, '_id.month': -1, '_id.day': -1 } : { _id: 1 };
exports.getSorter = getSorter;
//# sourceMappingURL=sorter.js.map