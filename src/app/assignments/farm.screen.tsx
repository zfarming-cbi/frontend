import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Box, Card, CardActionArea, CardContent, CardMedia, Paper, Typography } from '@mui/material';
import { Toolbar, ToolbarButton } from '../../share/components/toolbar';
import { Add as AddIcon, Search as FilterIcon } from "@mui/icons-material"
import { useGetFarmsQuery } from '../../settings/api/endpoints/farm';
import { useAppDispatch } from '../../settings/redux/hooks';
import { showFormCreateFarm } from '../../settings/redux/dialogs.slice';

export interface FarmListRow {
  id?: string | number
  name: string
  description: string
  start_crop_dt: string
  end_crop_dt: string
}

export const FarmScreen: React.FC = () => {
  const toolbarButtons: ToolbarButton[] = [
    {
      icon: <AddIcon />,
      action() {
        dispatch(
          showFormCreateFarm({
            visible: true,
            data: {},
          })
        )
      },
    },
  ]

  const dispatch = useAppDispatch()
  const { data, isLoading, error } = useGetFarmsQuery()

  const farms = React.useMemo(() => {
    return data?.map<FarmListRow>(({ id, name, description, start_crop_dt, end_crop_dt }) => ({ id, name, description, start_crop_dt, end_crop_dt })) ?? []
  }, [data])

  return (
    <Grid container flex={1} flexDirection="column">
      <Toolbar title="Gestión de granjas" buttons={toolbarButtons} />
      <Grid item container>
        {farms.map((farm, index) => (
          <Card
            sx={{
              marginX: 2,
              marginY: 2,
              height: 250,
              width: 250,
            }}>
            <CardActionArea>
              <CardContent>
                <Box sx={{ height: "125px" }}>
                  <Typography fontWeight="ligth" fontSize={20} textAlign={"center"} color={"grey"}>
                    {farm.name}
                  </Typography>
                </Box>
                <Box sx={{ height: "125px" }}>
                  <Typography fontWeight="ligth" fontSize={20} textAlign={"center"} color={"grey"}>
                    {farm.description}
                  </Typography>
                  <Typography fontWeight="ligth" fontSize={10} textAlign={"center"} color={"grey"}>
                    Fecha inicial : {farm.start_crop_dt}
                  </Typography>
                  <Typography fontWeight="ligth" fontSize={10} textAlign={"center"} color={"grey"}>
                    Fecha final : {farm.end_crop_dt}
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Grid>
    </Grid>
  );
}