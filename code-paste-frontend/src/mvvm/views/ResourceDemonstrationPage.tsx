import { Box, Container, useTheme } from "@mui/material";
import { observer } from "mobx-react";
import { useParams, RoutesProps, useLocation } from "react-router-dom";
import { ResourceDemonstrationViewModel } from "../view_models/ResourceDemonstrationViewModel";
import ResourcePasswordPanel from "../../ui/moleculas/ResourcePasswordPanel";
import { useStyles } from "../../ui/styling/styles/ElementStyles";
import ResourceDemonstrationPanel from "../../ui/organisms/ResourceDemonstrationPanel";
import { ResourceAction } from "../../helpers/ResourceAction";
import LoadingPanel from "../../ui/atoms/LoadingPanel";
import { useEffect } from "react";
import { FetchingStatus } from "../../helpers/ResourceFetchingStatus";

const ResourceDemonstrationPage = observer(
  ({ viewModel }: { viewModel: ResourceDemonstrationViewModel }) => {
    const theme = useTheme();
    const styles = useStyles(theme);
    const location = useLocation();

    useEffect(() => {
      const resourceId = location.pathname.split("/").reverse()[0];
      viewModel.setResourceId(resourceId);
    }, []);

    const actions: ResourceAction[] = [
      {
        title: "Автор",
        action: () => {},
      },
      {
        title: "В избранное",
        action: () => {},
      },
      {
        title: "Скачать",
        action: () => {},
      },
      {
        title: "Скопировать",
        action: () => {},
      },
      {
        title: "Поделиться",
        action: () => {},
      },
    ];

    if (viewModel.resourceModel.isPrivate === undefined || viewModel.getResource().status === FetchingStatus.NotStarted && viewModel.isPasswordEntered) {
      return <LoadingPanel />;
    }

    return (
      <Box className={styles.basicPanel}>
        {viewModel.needToAskPassword() ? (
          <ResourcePasswordPanel onCheckButtonClick={viewModel.checkPassword} />
        ) : (
          <ResourceDemonstrationPanel
            resource={viewModel.getResource()}
            actions={actions}
          />
        )}
      </Box>
    );
  }
);

export default ResourceDemonstrationPage;
