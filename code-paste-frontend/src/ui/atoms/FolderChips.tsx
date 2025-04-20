import { Stack, Typography } from "@mui/material";
import StylingProps from "../../helpers/StylingProps";
import { Link } from "react-router-dom";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

const FolderChips = ({
  stylingProps,
  fullPath,
  getResourceUuid,
  name,
}: {
  stylingProps: StylingProps;
  getResourceUuid: (value: string) => Promise<AxiosResponse<string>>;
  fullPath: string;
  name: string;
}) => {
  const [redirectLink, setRedirectLink] = useState<string | undefined>(
    undefined
  );

  const getRedirectLink = async () => {
    if (fullPath.includes("/")) {
      const response = await getResourceUuid(fullPath);
      const resourceUuid = await response;
      setRedirectLink(`/resource/${resourceUuid.data}`);
    } else {
      setRedirectLink(`/account/${fullPath}`);
    }
  };

  useEffect(() => {
    getRedirectLink();
  });

  return (
    <Stack
      direction={"row"}
      alignContent={"center"}
      justifyContent={"center"}
      sx={{ display: "flex" }}
    >
      <Stack direction={"row"} spacing={2}>
        <Typography alignContent={"center"}>/</Typography>
        <Link
          style={{
            alignContent: "center",
            alignItems: "center",
            color: stylingProps.theme.palette.primary.main,
            fontSize: "20px",
            textDecoration: "none",
            textAlign: "center",
            fontFamily: "Montserrat Alternates",
          }}
          reloadDocument
          to={redirectLink ?? ""}
          onClick={(event) => {
            if (redirectLink) {
              return;
            }
            event.preventDefault();
          }}
        >
          {name}
        </Link>
      </Stack>
    </Stack>
  );
};

export default FolderChips;
