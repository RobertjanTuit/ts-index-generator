export interface IndexFile {
    path: string;
    export: string;
}
export interface IndexOptions {
    ignore: string[];
}
export declare function clearIndexes(rootPath: string): void;
export declare function getIndexes(rootPath: string, { ignore }: IndexOptions): IndexFile[];
