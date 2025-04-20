export enum FetchingStatus {
    NotStarted,
    InProgress,
    Finished
}

export type ResourceFetchingStatus = {
    text: string,
    status: FetchingStatus
};