
import * as Auth from '../../auth'
import { Product, Expense, Invoice } from '../../models/index'
import { RequestResponse } from './invoice'
import { getchartHeader, getTotalExpPipeline, getExpiredPipeline, getExpiringPipeline, getHeaderCategories, getLowStocksPipeline, getOutOfStocksPipeline, getTotalSalesPipeline, getTrendsPipeline } from '../../pipelines/index'

export default {
  Query: {
    chartHeader: async (root: any, __:any, {req, res}: RequestResponse) => {
      Auth.checkSignedIn(req)
      const {data: {orgId}}:any = req
      const header: any = await Product.aggregate(getchartHeader(orgId))
      const cats: any = await Product.aggregate(getHeaderCategories(orgId))
      return {
        ...header[0], 
        categories: cats[0].count
     }
    },
    chartFooter: async (root: any, __:any, {req, res}: RequestResponse) => {
      Auth.checkSignedIn(req)
      const {data: {orgId}}:any = req
      const lowStocks: any = await Product.aggregate(getLowStocksPipeline(orgId))
      const outOfStocks: any = await Product.aggregate(getOutOfStocksPipeline(orgId))
      const expiring: any = await Product.aggregate(getExpiringPipeline(orgId))
      const expired: any = await Product.aggregate(getExpiredPipeline(orgId))
      return {
          expired: expired.length,
          expiring: expiring.length,
          outOfStocks: outOfStocks.length,
          lowStocksCount: lowStocks.length,
     }
    },
    salesExpenses: async (root: any, {duration}: any, {req, res}: RequestResponse) => {
      Auth.checkSignedIn(req)
      const {data: {orgId: clientId}}:any = req
      const sales: any = await Invoice.aggregate(getTotalSalesPipeline(clientId, duration) as any)
      const expenses: any = await Expense.aggregate(getTotalExpPipeline(clientId, duration) as any)
      return {
          sales,
          expenses
      }
    },
    trends: async (root: any, {item, duration}: any, {req, res}: RequestResponse) => {
      Auth.checkSignedIn(req)
      const {data: {orgId: clientId}}:any = req
      return await Invoice.aggregate(getTrendsPipeline(clientId, duration, item) as any)
    },
    topStaff: async (root: any, {item, duration}: any, {req, res}: RequestResponse) => {
      Auth.checkSignedIn(req)
      const {data: {orgId: clientId}}:any = req
      return await Invoice.aggregate(getTrendsPipeline(clientId, duration, item ) as any)
    }
  }
}