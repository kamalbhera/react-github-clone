import Link from 'next/link';

// MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export const Header = () => {
  const theme = useTheme();
  const notMobile = useMediaQuery(theme.breakpoints.up('sm')); // more than 600px

  return (
    <Box
      sx={{
        minHeight: 100,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'black',
        color: 'white',
        fontStyle: 'italic',
      }}
    >
      <Box sx={notMobile ? { width: 1, marginLeft: '5%' } : { width: 1, textAlign: 'center' }}>
        <Link href='/'>
          <a>
            <Typography variant={notMobile ? 'h3' : 'h4'} component='h1'>
               React Github Clone
            </Typography>
          </a>
        </Link>
      </Box>
    </Box>
  );
};

export default Header;
