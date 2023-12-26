import InfoIcon from '@mui/icons-material/Info';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import {useEffect, useState} from 'react';
import useCallApi from '../hooks/callApi';

export const Weather = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const [lat, setLat] = useState<number>();
  const [long, setLong] = useState<number>();
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
        },
        error => {
          console.error('Error getting location:', error.message);
        },
      );
    } else {
      console.error('Geolocation is not supported by your browser');
    }
  }, []);

  const {loading, data, data2} = useCallApi(lat, long);
  const toggleDialog = () => {
    setOpenDialog(prev => !prev);
  };
  return (
    <>
      <Paper elevation={3} sx={{padding: 2, marginTop: 2}}>
        <Box
          display={'flex'}
          justifyContent="center"
          alignItems={'center'}
          flexDirection="row">
          <Typography variant="h6">Weather Details</Typography>
          <IconButton onClick={toggleDialog}>
            <InfoIcon />
          </IconButton>
        </Box>
        {!loading ? (
          <>
            <Box display={'flex'} justifyContent="center" flexDirection="row">
              <Typography variant="h6" paddingRight={2}>
                You Live in:
              </Typography>
              <Typography variant="h6">{data?.name}</Typography>
            </Box>
            <Box display={'flex'} justifyContent="center" flexDirection="row">
              <Typography variant="h6" paddingRight={2}>
                Weather is:
              </Typography>
              <Typography variant="h6" textTransform={'capitalize'}>
                {data?.weather?.[0]?.description}
              </Typography>
            </Box>
          </>
        ) : (
          <p>Loading weather...</p>
        )}
      </Paper>
      <Dialog open={openDialog} onClose={toggleDialog}>
        <DialogTitle> Weather forecast for the next 5 days is</DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table>
              <TableBody>
                {data2?.list?.map(day => (
                  <TableRow>
                    <TableCell>{day?.dt_txt}</TableCell>
                    <TableCell>
                      <Typography textTransform={'capitalize'}>
                        {day?.weather?.[0]?.description}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </>
  );
};
