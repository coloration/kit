/**
 * 用于图表轴线的分割
 * 默认以10作为最小分割，如果数字普遍小于10，可以设置 minDivNum 为1，可以保证整数
 */
export declare function divideInterval(max: number, divCount?: number, minDivNum?: number): number;
