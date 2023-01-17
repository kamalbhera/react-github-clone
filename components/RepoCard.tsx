import Image from 'next/image';
import Link from 'next/link';

import { formatDistance } from 'date-fns';

// MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface RepoCardProps {
  repoData: any;
}

export const RepoCard = ({ repoData }: RepoCardProps) => {
  const theme = useTheme();
  const notMobile = useMediaQuery(theme.breakpoints.up('sm')); // more than 600px

  const lastUpdate: string = formatDistance(new Date(repoData.updated_at), new Date(), {
    addSuffix: true,
    includeSeconds: true,
  });

  return (
    <Box sx={{ p: 2, border: 1, borderRadius: '1%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1.5 }}>
        <Box sx={{ marginRight: '5%' }}>
          <Typography
            variant='h6'
            component='h3'
            sx={{ color: '#0969DA', textDecoration: 'underline' }}
          >
            {repoData.name}
          </Typography>
        </Box>
        <Box sx={{ border: 1, paddingY: 0.25, paddingX: 1, borderRadius: '15%' }}>
          <Typography variant='caption' sx={{ color: '#57606A' }}>
            {repoData.private ? 'Private' : 'Public'}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={
          notMobile
            ? { display: 'flex', marginBottom: 1.5, gap: 0.75, fontStyle: 'italic' }
            : { display: 'flex', flexDirection: 'column', marginBottom: 1.5, fontStyle: 'italic' }
        }
      >
        <Box>
          <Typography sx={{ fontSize: 16 }}>Available at</Typography>
        </Box>
        <Box>
          <Link href={repoData.html_url}>
            <a>
              <Typography
                sx={{
                  color: '#0000EE',
                  textDecoration: 'underline',
                  fontSize: 16,
                  overflowWrap: 'anywhere',
                }}
              >
                {repoData.html_url}
              </Typography>
            </a>
          </Link>
        </Box>
      </Box>

      <Box>
        <Typography sx={{ color: '#57606A', marginBottom: 2, fontSize: 17, fontWeight: 500 }}>
          {repoData.description ? repoData.description : ''}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', color: '#57606A' }}>
        <Box sx={{ marginRight: 1 }}>
          <Image src={'/blue-dot.png'} alt='blue dot' width={12} height={12} />
        </Box>
        <Box sx={{ marginRight: 4 }}>
          <Typography sx={{ fontSize: 13 }}>
            {repoData.language ? repoData.language : 'undefined'}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: 13 }}>Updated {lastUpdate}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RepoCard;
