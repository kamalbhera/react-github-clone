import Image from 'next/image';

// MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface UserCardProps {
  userData: any;
}

export const UserCard = ({ userData }: UserCardProps) => {
  return (
    <Box
      sx={{
        marginTop: 7,
        paddingX: 2,
        paddingY: 3,
        border: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0.5,
      }}
    >
      <Box>
        <Image
          src={userData.avatar_url}
          alt='user profile img'
          width={250}
          height={250}
          style={{ borderRadius: '50%' }}
        />
      </Box>
      <Box>
        <Typography variant='h6' component='p'>
          {userData.login}
        </Typography>
      </Box>
      <Box>
        <Typography variant='subtitle2' component='p'>
          {userData.name}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserCard;
