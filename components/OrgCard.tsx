import Image from 'next/image';

// MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface OrgCardProps {
  orgData: any;
}

export const OrgCard = ({ orgData }: OrgCardProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        paddingX: 1.5,
        paddingY: 2.5,
        border: 1,
        borderRadius: '2.0%',
        marginBottom: 0.5,
      }}
    >
      <Box>
        <Image src={orgData.avatar_url} alt='organization avatar' width={20} height={20} />
      </Box>

      <Box>
        <Typography sx={{ color: '#0969DA', fontWeight: 500 }}>{orgData.login}</Typography>
      </Box>

      <Box>
        <Typography sx={{ color: '#57606A', fontSize: 15 }}>member</Typography>
      </Box>
    </Box>
  );
};

export default OrgCard;
