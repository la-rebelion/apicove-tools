import * as React from 'react'
import { CssVarsProvider } from '@mui/joy/styles'
import CssBaseline from '@mui/joy/CssBaseline'
import Box from '@mui/joy/Box'
import Stack from '@mui/joy/Stack'

import NavBar from './components/NavBar'
import HeaderSection from './components/HeaderSection'
import './App.css'

import Layout from './components/Layout'
import Navigation from './components/Navigation'

function App() {
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      {drawerOpen && (
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
          <Navigation />
        </Layout.SideDrawer>
      )}
      <NavBar />

      <Layout.Root
        sx={{
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'minmax(64px, 200px) minmax(450px, 1fr)',
            // md: 'minmax(160px, 300px) minmax(600px, 1fr) minmax(300px, 420px)',
          },
          ...(drawerOpen && {
            height: '100vh',
            overflow: 'hidden',
          }),
        }}
      >
        <Layout.SideNav>
          <Navigation />
        </Layout.SideNav>
        <Layout.Main>
          <Box
            component="main"
            sx={{
              height: 'calc(100vh - 55px)', // 55px is the height of the NavBar
              display: 'grid',
              gridTemplateColumns: { xs: 'auto', md: '50% 50%' },
              gridTemplateRows: 'auto 1fr auto',
            }}
          >
            <Stack
              sx={{
                backgroundColor: 'background.surface',
                px: { xs: 2, md: 4 },
                py: 2,
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            >
              <HeaderSection />
            </Stack>
            <Box
              sx={{
                gridRow: 'span 3',
                display: { xs: 'none', md: 'flex' },
                backgroundColor: 'background.level1',
                backgroundSize: 'cover',
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3731&q=80")',
              }}
            />
            <Stack spacing={2} sx={{ 
              px: { xs: 2, md: 4 }, pt: 2, 
              minHeight: 0 
            }}>
              WHAT CAN I DO FOR YOU?
            </Stack>
          </Box>
        </Layout.Main>
      </Layout.Root>
    </CssVarsProvider>
  )
}

export default App
