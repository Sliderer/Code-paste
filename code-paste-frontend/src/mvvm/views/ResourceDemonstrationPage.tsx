import { Box, Container, useTheme } from "@mui/material";
import { observer } from "mobx-react";
import { useParams, RoutesProps, useLocation } from "react-router-dom";
import { ResourceDemonstrationViewModel } from "../view_models/ResourceDemonstrationViewModel";
import ResourcePasswordPanel from "../../ui/moleculas/ResourcePasswordPanel";
import { useStyles } from "../../ui/styling/styles/ElementStyles";
import ResourceDemonstrationPanel from "../../ui/organisms/ResourceDemonstrationPanel";
import { ResourceAction } from "../../helpers/ResourceAction";

const ResourceDemonstrationPage = observer(
  ({ viewModel }: { viewModel: ResourceDemonstrationViewModel }) => {
    const theme = useTheme();
    const styles = useStyles(theme);

    const location = useLocation();
    const resourceId = location.pathname.split("/").reverse()[0];

    const actions: ResourceAction[] = [
        {
            title: 'Автор',
            action: () => {}
        },
        {
            title: 'В избранное',
            action: () => {}
        },
        {
            title: 'Скачать',
            action: () => {}
        },
        {
            title: 'Скопировать',
            action: () => {}
        },
        {
            title: 'Поделиться',
            action: () => {}
        },
    ] 

    viewModel.setResourceId(resourceId);
    console.log(resourceId);

    return (
      <Box className={styles.basicPanel}>
        {viewModel.isOpened ? (
          <ResourceDemonstrationPanel resource={viewModel.getResource()} actions={actions}/>
        ) : (
          <ResourcePasswordPanel onCheckButtonClick={viewModel.checkPassword} />
        )}
      </Box>
    );
  }
);

export default ResourceDemonstrationPage;
