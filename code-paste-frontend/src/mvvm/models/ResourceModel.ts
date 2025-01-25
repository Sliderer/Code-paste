import {
  FetchingStatus,
  ResourceFetchingStatus,
} from "../../helpers/ResourceFetchingStatus";

class ResourceModel {
  isPrivate: boolean | undefined = undefined;
  owner: string | undefined = undefined;
  name: string | undefined = undefined;
  resource: ResourceFetchingStatus = {
    text: "",
    status: FetchingStatus.NotStarted,
  };
  resourceUuid: string | undefined = undefined;
}

export default ResourceModel;
