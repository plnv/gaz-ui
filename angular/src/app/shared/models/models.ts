export const POLLING = 5 * 60 * 1000;


export interface GraphBlock {
  id: number;
  deviation: string;
  deviationType: number;
  chartId: number;
  name: string;
  value1: string;
  value2: string;
  measure?: string;
  icon?: string;
}


export interface ChartData {
  categories: string[];
  series: { data: number }[];
}


export interface Chart {
  id: number;
  value: ChartData;
}


export interface DashboardValue {
  big: string;
  small: string;
  type: number;
}


export interface Dashboard {
  certification: {
    values: DashboardValue,
    data: {
      id: number;
      label: string;
      values: DashboardValue
    }[]
  };
  energy: {
    [key: string]: {
      id: number,
      values: DashboardValue
    }
  };
}