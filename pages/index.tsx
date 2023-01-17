// Next.js imports
import type { NextPage } from 'next';
// React imports
import { useState } from 'react';
// Axios
import axios from 'axios';
// Configs
import { GITHUB_API_BASE_URL } from '../config/urls';
// Utils
import handleAxiosError from '../utils/handleAxiosError';
// Mine Components
import UserCard from '../components/UserCard';
import RepoCard from '../components/RepoCard';
import OrgCard from '../components/OrgCard';
import FullPageLoader from '../components/FullPageLoader';

// MUI
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// - - - -

const Home: NextPage = () => {
  const theme = useTheme();
  const notMobile = useMediaQuery(theme.breakpoints.up('sm')); // more than 600px

  const [userName, setUserName] = useState<string>('');
  const [isUserNameTouched, setIsUserNameTouched] = useState<boolean>(false);

  const [reposData, setReposData] = useState([]);
  const [orgsData, setOrgsData] = useState([]);
  const [userData, setUserData] = useState<null | any>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [err, setErr] = useState<any | null>(null);

  const [showRepos, setShowRepos] = useState<boolean>(true); // Either show repos or show orgs

  const [wasAlreadyFetching, setWasAlreadyFetching] = useState<boolean>(false);

  // - - -

  const fetchRepos = async (pageNumber: number) => {
    const fetchReposUrl = `${GITHUB_API_BASE_URL}/users/${userName}/repos?per_page=10&page=${pageNumber}`;
    const axiosReposResponse = await axios.get(fetchReposUrl, {
      headers: {
        Accept: 'application/json',
      },
    });
    const repositories = axiosReposResponse.data;
    setReposData(repositories);
  };

  const fetchReposOrgsUser = async () => {
    try {
      setErr(null);
      setIsLoading(true);
      setWasAlreadyFetching(true);

      // 1. Fetch the username profile info
      const fetchUserInfoUrl = `${GITHUB_API_BASE_URL}/users/${userName}`;
      const axiosUserInfoResponse = await axios.get(fetchUserInfoUrl, {
        headers: {
          Accept: 'application/json',
        },
      });
      const userInfo = axiosUserInfoResponse.data;
      setUserData(userInfo);

      // 2. Fetch the username's repositories
      await fetchRepos(1);

      // 3. Fetch the username's organizations
      const fetchOrgsUrl = `${GITHUB_API_BASE_URL}/users/${userName}/orgs`;
      const axiosOrgsResponse = await axios.get(fetchOrgsUrl, {
        headers: {
          Accept: 'application/json',
        },
      });
      const organizations = axiosOrgsResponse.data;
      setOrgsData(organizations);

      return;
    } catch (error: any) {
      setErr(error);
      if (axios.isAxiosError(error)) {
        // Print information to the console
        handleAxiosError(error);
      } else {
        console.log('Other error has occured while fetching data!');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // - - - - -

  const handleConfirmClick = async () => {
    if (userName === '') {
      setIsUserNameTouched(true);
      return;
    }

    await fetchReposOrgsUser();
  };

  const handlePaginationChange = async (event: React.ChangeEvent<unknown>, value: number) => {
    // Fetch another 10 repos, based on page number in value variable!
    await fetchRepos(value);
  };

  // - - -

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (err) {
    // Error message for the whole screen
  }

  return (
    <Container>
      {/* Flex container for input and button */}
      <Box
        sx={
          notMobile
            ? { marginTop: 5, display: 'flex', justifyContent: 'space-evenly' }
            : {
                marginTop: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
              }
        }
      >
        <Box sx={notMobile ? { width: 2 / 5 } : { width: 4 / 5 }}>
          <TextField
            type='text'
            variant='outlined'
            label='Enter the GitHub username...'
            fullWidth
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            onBlur={() => setIsUserNameTouched(true)}
            error={userName === '' && isUserNameTouched}
            helperText={userName === '' && isUserNameTouched && 'Username is required!'}
          />
        </Box>
        <Box sx={notMobile ? { width: 1 / 5 } : { width: 3 / 5 }}>
          <Button
            sx={{ width: '100%', marginTop: '2.5%' }}
            variant='outlined'
            color='success'
            size='large'
            onClick={() => handleConfirmClick()}
          >
            Confirm
          </Button>
        </Box>
      </Box>

      {/* Buttons to toggle of either showing repos or orgs */}
      <Box
        sx={
          notMobile
            ? { marginTop: 6, display: 'flex', justifyContent: 'space-around' }
            : {
                marginTop: 6,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                alignItems: 'center',
              }
        }
      >
        <Box sx={notMobile ? { width: 1 / 3 } : { width: 5 / 5 }}>
          <Button
            sx={{ height: '100%' }}
            size='large'
            fullWidth
            variant={showRepos ? 'contained' : 'outlined'}
            onClick={() => setShowRepos(true)}
          >
            Show Repositories
          </Button>
        </Box>
        <Box sx={notMobile ? { width: 1 / 3 } : { width: 5 / 5 }}>
          <Button
            size='large'
            fullWidth
            variant={!showRepos ? 'contained' : 'outlined'}
            onClick={() => setShowRepos(false)}
          >
            Show Organizations
          </Button>
        </Box>
      </Box>

      {/* Handle fetching errors before possible displaying data */}
      {err && (
        <Box sx={{ marginTop: 6 }}>
          <Typography variant='h5' component='p'>
            Error has occured while fetching data for this userName!
          </Typography>
        </Box>
      )}

      {/* User information if no error */}
      {!err && userData && <UserCard userData={userData} />}

      {/* If fetched successfully, but no data and no error */}
      {((!err && showRepos && reposData.length === 0 && wasAlreadyFetching) ||
        (!err && !showRepos && orgsData.length === 0 && wasAlreadyFetching)) && (
        <Box sx={{ marginTop: 6, marginBottom: 8 }}>
          <Typography variant='h5' component='p'>
            Nothing to show!
          </Typography>
        </Box>
      )}

      {/* Repos if toggled and no error */}
      {!err && showRepos && reposData.length !== 0 && (
        <Box sx={{ marginTop: 5, marginBottom: 6 }}>
          <Box sx={{ marginBottom: 2 }}>
            <Typography
              variant='h4'
              component='h2'
              sx={{ textDecoration: 'underline', fontStyle: 'oblique' }}
            >
              Repositories:
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {reposData.map((actualRepo: any) => (
              <RepoCard key={actualRepo.id} repoData={actualRepo} />
            ))}
          </Box>
        </Box>
      )}

      {/* Orgs if toggled and no error */}
      {!err && !showRepos && orgsData.length !== 0 && (
        <Box sx={{ marginTop: 5, marginBottom: 6 }}>
          <Box sx={{ marginBottom: 2 }}>
            <Typography
              variant='h4'
              component='h2'
              sx={{ textDecoration: 'underline', fontStyle: 'oblique' }}
            >
              Organizations:
            </Typography>
          </Box>
          <Box>
            {orgsData.map((actualOrg: any) => (
              <OrgCard key={actualOrg.id} orgData={actualOrg} />
            ))}
          </Box>
        </Box>
      )}

      {/* Pagination for repositories only, if no error */}
      {!err &&
        showRepos &&
        userData !== null &&
        userData.public_repos !== null &&
        userData.public_repos > 0 && (
          <Box sx={{ marginBottom: 8, display: 'flex', justifyContent: 'center' }}>
            <Pagination
              count={Math.ceil(userData.public_repos / 10)}
              onChange={handlePaginationChange}
            />
          </Box>
        )}
    </Container>
  );
};

export default Home;
