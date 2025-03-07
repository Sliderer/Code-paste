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
  isLiked: boolean;
  highlightSetting: string;
};

export const getDefaultResourceModel = (): ResourceModel => {
  return {
    isPrivate: undefined,
    owner: undefined,
    name: undefined,
    resource: {
      text: "",
      status: FetchingStatus.NotStarted,
    },
    resourceUuid: undefined,
    isLiked: false,
    highlightSetting: ''
  };
};

export default ResourceModel;
