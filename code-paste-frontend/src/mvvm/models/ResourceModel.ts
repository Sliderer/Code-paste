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
  type: string;
  ownerId: string;
  path: string;
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
    highlightSetting: "",
    type: "",
    ownerId: "",
    path: "",
  };
};

export default ResourceModel;
