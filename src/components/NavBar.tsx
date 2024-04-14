import * as React from 'react'
import { Box, IconButton } from '@mui/joy'
import Typography from '@mui/joy/Typography'
import Avatar from '@mui/joy/Avatar'
import ColorSchemeToggle from './ColorSchemeToggle'
import logo from '../logo.png'

export default function NavBar() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        top: 0,
        px: 1.5,
        py: 1,
        zIndex: 10000,
        backgroundColor: 'background.body',
        borderBottom: '1px solid',
        borderColor: 'divider',
        position: 'sticky',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <IconButton size="sm" variant="soft">
          <Avatar src={logo} size="sm" />
        </IconButton>
        <Typography component="h1" fontWeight="xl">
          APICove Tools
        </Typography>
        <Typography sx={{ display: { xs: 'none', md: 'flex' } }}>
          <small>
            {process.env.REACT_APP_VERSION}{' '}
            {process.env.NODE_ENV === 'development' ? process.env.NODE_ENV : 'Alpha'}
          </small>
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
        <a
          href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=adrianescutia"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <Box
            sx={{
              gap: 1,
              alignItems: 'center',
              display: { xs: 'none', sm: 'flex' },
            }}
          >
            <Avatar
              variant="outlined"
              size="sm"
              src="https://media.licdn.com/dms/image/C4E03AQGyI0fUBAwZZA/profile-displayphoto-shrink_200_200/0/1587047383961?e=1718236800&v=beta&t=qQxqRZly0I60nZ_2LjCne6oXNsWuC8kpdSrWApCEqbc"
            />
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography level="title-sm">Adrian Escutia</Typography>
              <Typography level="body-xs">Follow me @LinkedIn</Typography>
            </Box>
          </Box>
        </a>
        <ColorSchemeToggle sx={{ alignSelf: 'center' }} />
      </Box>
    </Box>
  )
}
