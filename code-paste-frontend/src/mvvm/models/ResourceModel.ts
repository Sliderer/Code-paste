import {
  FetchingStatus,
  ResourceFetchingStatus,
} from "../../helpers/ResourceFetchingStatus";

type ResourceModel = {
  isPrivate: boolean | undefined;
  owner: string | undefined;
  name: string | undefined;
  resource: ResourceFetchingStatus;
  resourceUuid: string | undefined;
}

export const getDefaultResourceModel = () : ResourceModel => {
  return {
    isPrivate: undefined,
    owner: undefined,
    name: undefined,
    resource: {
      text: '',
      status: FetchingStatus.NotStarted
    },
    resourceUuid: undefined
  }
}

export default ResourceModel;
