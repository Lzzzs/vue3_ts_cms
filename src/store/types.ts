import { ILoginState } from './modules/login/types'
import { ISystemState } from './modules/main/system/types'
import { IDashboardState } from './modules/main/analysis/types'

export interface IRootState {
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

// 模块的接口类型
export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
  dashboard: IDashboardState
}

export type IStoreType = IRootState & IRootWithModule
