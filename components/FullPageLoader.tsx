import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

// - - - -

export const FullPageLoader = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress size={80} />
    </Box>
  );
};

export default FullPageLoader;
