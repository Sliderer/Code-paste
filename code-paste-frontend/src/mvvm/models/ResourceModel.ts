import { status } from "@grpc/grpc-js";
import { FetchingStatus, ResourceFetchingStatus } from "../../helpers/ResourceFetchingStatus";

class ResourceModel {
    isPrivate: boolean = false;
    resource: ResourceFetchingStatus;
    resourceId: string | undefined = undefined;

    constructor() {
        this.resource = {
            text: "dwd",
            status: FetchingStatus.Finished,
            progress: 0
        }
    }
}

export default ResourceModel;