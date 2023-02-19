import { FC, ReactNode } from "react";
import { Divider, Stack, Typography, useTheme } from "@mui/material";

type IconDividerProps = {
  icon: ReactNode;
  label: string;
};
export const IconDivider: FC<IconDividerProps> = (props) => {
  const { icon, label } = props;

  const { palette } = useTheme();

  return (
    <Divider flexItem>
      <Stack spacing={0.5} direction="column" alignItems="center">
        {icon}
        <Typography fontSize="small" color={palette.text.secondary}>
          {label}
        </Typography>
      </Stack>
    </Divider>
  );
};
