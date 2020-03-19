import { Moment } from 'moment'
import moment from 'moment/src/moment'

export enum MomentFormatEnum {
  YYYY_MM_DD = 'YYYY-MM-DD',
  YYYY_MM_DD_HH_MM_SS = 'YYYY-MM-DD HH:mm:ss',
}



export const todayMoment: Moment = moment()
export const lastDayMoment: Moment = moment().subtract(1, 'days')
export const last3DayMoment: Moment = moment().subtract(3, 'days')
export const last7DayMoment: Moment = moment().subtract(7, 'days')
export const last15DayMoment: Moment = moment().subtract(15, 'days')
export const last30DayMoment: Moment = moment().subtract(30, 'days')
export const last60DayMoment: Moment = moment().subtract(60, 'days')

export const last60DaysMoment: [Moment, Moment] = [last60DayMoment, lastDayMoment]
export const last30DaysMoment: [Moment, Moment] = [last30DayMoment, lastDayMoment]
export const last15DaysMoment: [Moment, Moment] = [last15DayMoment, lastDayMoment]
export const last7DaysMoment: [Moment, Moment] = [last7DayMoment, lastDayMoment]
export const last3DaysMoment: [Moment, Moment] = [last3DayMoment, lastDayMoment]

export { moment, Moment }