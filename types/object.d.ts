export declare type PlainObject = {
    [key: string]: any;
};
export declare function isObj(o: any): boolean;
export declare function objHas(obj: PlainObject, ...fields: string[]): boolean;
export declare function objGet(defaultValue: undefined, obj: PlainObject, ...fields: string[]): boolean;
