"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Auth = __importStar(require("../../auth"));
const models_1 = require("../../models");
const pipelines_1 = require("../../pipelines");
exports.default = {
    Query: {
        chartHeader: async (root, __, { req, res }) => {
            Auth.checkSignedIn(req);
            const { data: { orgId } } = req;
            const header = await models_1.Product.aggregate((0, pipelines_1.getchartHeader)(orgId));
            const cats = await models_1.Product.aggregate((0, pipelines_1.getHeaderCategories)(orgId));
            return {
                ...header[0],
                categories: cats[0].count
            };
        },
        chartFooter: async (root, __, { req, res }) => {
            Auth.checkSignedIn(req);
            const { data: { orgId } } = req;
            const lowStocks = await models_1.Product.aggregate((0, pipelines_1.getLowStocksPipeline)(orgId));
            const outOfStocks = await models_1.Product.aggregate((0, pipelines_1.getOutOfStocksPipeline)(orgId));
            const expiring = await models_1.Product.aggregate((0, pipelines_1.getExpiringPipeline)(orgId));
            const expired = await models_1.Product.aggregate((0, pipelines_1.getExpiredPipeline)(orgId));
            return {
                expired: expired.length,
                expiring: expiring.length,
                outOfStocks: outOfStocks.length,
                lowStocksCount: lowStocks.length,
            };
        },
        salesExpenses: async (root, { duration }, { req, res }) => {
            Auth.checkSignedIn(req);
            const { data: { orgId: clientId } } = req;
            const sales = await models_1.Invoice.aggregate((0, pipelines_1.getTotalSalesPipeline)(clientId, duration));
            const expenses = await models_1.Expense.aggregate((0, pipelines_1.getTotalExpPipeline)(clientId, duration));
            return {
                sales,
                expenses
            };
        },
        trends: async (root, { item, duration }, { req, res }) => {
            Auth.checkSignedIn(req);
            const { data: { orgId: clientId } } = req;
            return await models_1.Invoice.aggregate((0, pipelines_1.getTrendsPipeline)(clientId, duration, item));
        },
        topStaff: async (root, { item, duration }, { req, res }) => {
            Auth.checkSignedIn(req);
            const { data: { orgId: clientId } } = req;
            return await models_1.Invoice.aggregate((0, pipelines_1.getTrendsPipeline)(clientId, duration, item));
        }
    }
};
//# sourceMappingURL=charts.js.map