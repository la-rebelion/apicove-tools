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
import APITextarea from './components/APITextarea'
import { Link, List, ListItem, ListItemDecorator, Typography } from '@mui/joy'
import CodeSkeleton from './components/CodeSkeleton'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import ErrorBoundary from './components/ErrorBoundary'
import InputSubscription from './components/InputSubscription'

function App() {
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const [isGenerated, setIsGenerated] = React.useState(false)

  const handleGenerate = (generated: boolean) => {
    setIsGenerated(generated)
  }

  return (
    <CssVarsProvider disableTransitionOnChange>
      <HelmetProvider>
        <Helmet>
          <title>APICove Tools</title>
          <meta
            name="description"
            content="Convenient tools for API testing and development"
          />
          <meta
            name="keywords"
            content="API, testing, development, tools, jest, swagger, openapi, strapi"
          />
          <script
            data-name="BMC-Widget"
            data-cfasync="false"
            src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
            data-id="larebelion"
            data-description="Support me on Buy me a coffee!"
            data-message="Add caffeine to my nights and weekends"
            data-color="#542FFF"
            data-position="Right"
            data-x_margin="18"
            data-y_margin="18"
          ></script>
        </Helmet>
        <CssBaseline />
        <ErrorBoundary fallback={<div>Something went wrong!</div>}>
          {drawerOpen && (
            <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
              <Navigation />
            </Layout.SideDrawer>
          )}
          <NavBar />
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
                  flexDirection: 'column',
                }}
              >
                <Typography level="title-lg" sx={{ mb: 2 }}>
                  Your generated code {isGenerated ? '' : 'will be here'}
                </Typography>

                {/* The outout/generated text */}
                {isGenerated ? (
                  <APITextarea
                    codeString={'{\n  "key": "value"\n}'}
                    readonly={true}
                    height="50%"
                    language="typescript"
                    showCopyButton={true}
                    showButton={false}
                    buttonText="Clear"
                    onButtonClick={() => console.log('Button clicked')}
                  />
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '40%',
                    }}
                  >
                    <CodeSkeleton />
                    <Typography level="body-md" sx={{ mb: 2 }}>
                      👈🏽 Click the button to generate code from your Swagger/OAS content
                    </Typography>
                  </Box>
                )}
                {/* let's add a description of the features */}
                <Box
                  id="features"
                  sx={{
                    height: '50%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    padding: 2,
                  }}
                >
                  <Box>
                    <h2>How to use</h2>
                    <List aria-labelledby="how-to">
                      <ListItem>
                        <ListItemDecorator>🗒️</ListItemDecorator> Copy your{' '}
                        <a href="https://swagger.io/specification/v2/">Swagger/OAS content</a>{' '}
                        <small>(v2 supported)</small>
                      </ListItem>
                      <ListItem>
                        <ListItemDecorator>📒</ListItemDecorator> Paste it into the left input
                      </ListItem>
                      <ListItem>
                        <ListItemDecorator>🔀</ListItemDecorator> Click the convert button
                      </ListItem>
                      <ListItem>
                        <ListItemDecorator>🧪</ListItemDecorator> Copy the generated output
                      </ListItem>
                      <ListItem>
                        <ListItemDecorator>🚀</ListItemDecorator> Use it in your{' '}
                        <a href="https://jestjs.io/docs/tutorial-async">Jest test!</a>
                      </ListItem>
                    </List>
                  </Box>
                  <Box
                    sx={{
                      width: '50%',
                    }}
                  >
                    <h2>Why do you need it ?</h2>
                    <List aria-labelledby="why-converter">
                      <ListItem>
                        <ListItemDecorator>🤖</ListItemDecorator> Automate your API testing
                      </ListItem>
                      <ListItem>
                        <ListItemDecorator>🃏</ListItemDecorator> Use Jest for your API testing
                      </ListItem>
                      <ListItem>
                        <ListItemDecorator>🧩</ListItemDecorator> Convert Swagger/OAS to Jest
                      </ListItem>
                      <ListItem>
                        <ListItemDecorator>⌛</ListItemDecorator> Save time and effort with
                        complex APIs
                      </ListItem>
                    </List>
                    <InputSubscription />
                    <Typography level="body-xs" sx={{ mb: 2 }}>
                      Get the latest updates to help you build faster and smarter, 
                      <br/>no spam pinky promise! 🤞
                    </Typography>
                  </Box>
                </Box>
              </Box>
              {/* The input text to convert from */}
              <APITextarea
                codeString={'{\n  "key": "value"\n}'}
                showCopyButton={false}
                showButton={true}
                buttonText="Jest"
                onButtonClick={() => handleGenerate(!isGenerated)}
              />
            </Box>
            {/* Content to describe the API-Tools */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start', // Align items to the start
                alignItems: 'flex-start', // Align items to the start
                gap: '20px', // Add space between items
                p: '20px', // Add padding
                width: '100%', // Take full width
                maxWidth: '800px', // Limit maximum width
                margin: '0 auto', // Center the box
              }}
            >
              <Typography level="title-lg" sx={{ mb: 2 }}>
                API Tools to help you build faster and smarter
              </Typography>
              <Typography level="body-md" sx={{ mb: 2 }}>
                APICove Tools is a collection of tools to help you build faster and smarter.{' '}
                <br />
                Use the Swagger as starting point to converter code and accelerate your API
                development lifecycle.
              </Typography>
              <Typography level="title-md" sx={{ mb: 2 }}>
                APICove tools is your Complete Solution for API Lifecycle Management
              </Typography>

              <Typography level="body-md" sx={{ mb: 2 }}>
                With APICove tools, managing your API lifecycle has never been easier. Our
                suite of powerful tools covers every stage of the API lifecycle, from design
                and development to testing and deployment. Say goodbye to fragmented workflows
                and hello to efficiency with APICove tools.
              </Typography>

              <Typography level="title-md" sx={{ mb: 2 }}>
                Unlock the Power of API-First Development
              </Typography>

              <Typography level="body-md" sx={{ mb: 2 }}>
                Embrace the API-first approach with APICove tools. Our intuitive platform
                empowers you to design, document, and test your APIs with ease, ensuring that
                they meet the needs of your users from day one. Stay ahead of the curve and
                prioritize API-first development with APICove tools.
              </Typography>

              <Typography level="title-md" sx={{ mb: 2 }}>
                Seamless API Integration
              </Typography>

              <Typography level="body-md" sx={{ mb: 2 }}>
                Say goodbye to integration headaches with APICove tools. Our robust integration
                capabilities make it easy to connect your APIs with third-party services and
                systems, ensuring smooth communication and interoperability. Simplify your
                integration process and streamline your workflows with APICove tools.
              </Typography>

              <Typography level="title-md" sx={{ mb: 2 }}>
                Join the <a href="https://apicove.com">APICove</a> and{' '}
                <a href="https://rebelion.la">"La Rebelion Labs"</a> Community
              </Typography>

              <Typography level="body-md" sx={{ mb: 2 }}>
                Become a part of our thriving community of developers and API enthusiasts.
                Share your insights, learn from others, and collaborate on projects that push
                the boundaries of API innovation. Together, we can shape the future of API
                integration and lifecycle management.
              </Typography>

              <Typography level="title-md" sx={{ mb: 2 }}>
                Experience the Difference with APICove tools
              </Typography>

              <Typography level="body-md" sx={{ mb: 2 }}>
                Ready to revolutionize your API development process? Join the thousands of
                developers who trust APICove tools to streamline their workflows and accelerate
                their projects. Experience the power of API-first development and seamless
                integration with APICove tools today.
              </Typography>
            </Box>
            {/* @todo - add a footer */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50px',
                flexDirection: 'column',
              }}
            >
              <Typography level="body-xs" color="neutral">
                Made with ❤️ by{' '}
                <a
                  href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=adrianescutia"
                  target="_blank"
                  rel='noreferrer noopener'
                  style={{ textDecoration: 'none' }}
                >
                  Adrian Escutia
                </a>{' '}
                &nbsp;
                <Link href="https://www.buymeacoffee.com/larebelion">Add caffeine</Link> to my
                nights and weekends. ☕
              </Typography>
              <Typography level="body-xs" color="neutral">
                © {new Date().getFullYear()} La Rebelion Labs
              </Typography>
            </Box>
          </Layout.Main>
        </ErrorBoundary>
      </HelmetProvider>
    </CssVarsProvider>
  )
}

export default App
