// #region imports
import { useState, useEffect } from 'react'

import { CssVarsProvider, useTheme } from '@mui/joy/styles'
import CssBaseline from '@mui/joy/CssBaseline'
import Box from '@mui/joy/Box'
import Stack from '@mui/joy/Stack'

import NavBar from './components/NavBar'
import HeaderSection from './components/HeaderSection'
import './App.css'

import Layout from './components/Layout'
import Navigation from './components/Navigation'
import APITextarea from './components/APITextarea'
import {
  IconButton,
  Link,
  List,
  ListItem,
  ListItemDecorator,
  Radio,
  RadioGroup,
  Snackbar,
  Typography,
} from '@mui/joy'
import CloseIcon from '@mui/icons-material/Close'
import HttpIcon from '@mui/icons-material/Http'
import CodeIcon from '@mui/icons-material/Code'
import CodeSkeleton from './components/CodeSkeleton'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import ErrorBoundary from './components/ErrorBoundary'
import InputSubscription from './components/InputSubscription'

// import { SwaggerConverter } from '@la-rebelion/swagger-converter/dist/src/SwaggerConverter'
// import { JestInstance } from '@la-rebelion/swagger-converter/dist/src/JestInstance'
import { JestFactory } from '@la-rebelion/swagger-converter/dist/src/JestFactory'

// ONLY for local testing when the package is not published
// add "../../converters/oas-converter/dist/src/**/*" to the tsconfig.json paths
// import { JestFactory } from 'oas-converter/dist/src/JestFactory'
import swaggerExample from './test-data/emailjs-swagger.json'
import { useMediaQuery } from '@mui/material'
import ConvertedCodeModal from './components/ConvertedCodeModal'
// #endregion imports

// #region components to refactor/move ***************************************

function ClientModeRadio() {
  return (
    <RadioGroup 
      aria-label="Client Mode" 
      name="clientMode" 
      defaultValue="Fetch HTTP"
      orientation='horizontal'
    >
      <List
        orientation='horizontal'
        sx={{
          minWidth: 240,
          '--List-gap': '0.5rem',
          '--ListItem-paddingY': '1rem',
          '--ListItem-radius': '8px',
          '--ListItemDecorator-size': '32px',
        }}
      >
        {['Fetch HTTP', 'Client API'].map((item, index) => (
          <ListItem variant="outlined" key={item} sx={{ boxShadow: 'sm' }}>
            <ListItemDecorator>
              {[<HttpIcon />, <CodeIcon />][index]}
            </ListItemDecorator>
            <Radio
              overlay
              onChange={(event) => { console.log(event.target.value) }}
              value={item}
              label={item}
              sx={{ flexGrow: 1, flexDirection: 'row-reverse' }}
              slotProps={{
                action: ({ checked }) => ({
                  sx: (theme) => ({
                    ...(checked && {
                      inset: -1,
                      border: '2px solid',
                      borderColor: theme.vars.palette.primary[500],
                    }),
                  }),
                }),
              }}
            />
          </ListItem>
        ))}
      </List>
    </RadioGroup>
  );
}
// #endregion components

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)
  const [swaggerContent, setSwaggerContent] = useState('{}')
  const [outputContent, setOutputContent] = useState('')
  const [open, setOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState('info')
  const [showModalCode, setShowModalCode] = useState(false)

  const theme = useTheme()
  const isSmallScreen = !useMediaQuery(theme.breakpoints.up('sm'))

  const alertColor: { [key: string]: string } = {
    success: '#4caf50',
    error: 'pink',
    warning: 'orange',
    info: '#35b1ff',
  }
  const color = alertColor[alertType]

  // #region functions  ******************************************************
  const showMessage = (message: string, msgType: string) => {
    setAlertMessage(message)
    setAlertType(msgType)
    setOpen(true)
  }
  const showInfoMessage = (message: string) => {
    showMessage(message, 'info')
  }

  const showErrorMessage = (message: string) => {
    showMessage(message, 'error')
  }

  // Create an instance of the JestFactory
  const createFactoryInstance = (swaggerObj: any) => {
    // @todo - add the other factory instances and
    // handle types, for instance the StrapiFactory
    return new JestFactory(swaggerObj)
  }

  // initialize the SwaggerConverter when render page first time
  useEffect(() => {
    setSwaggerContent(JSON.stringify(swaggerExample, null, 2))
  }, [])

  const handleGenerate = () => {
    const swaggerFactory = createFactoryInstance(JSON.parse(swaggerContent))
    if (!swaggerFactory.isValid()) {
      console.error('Cannot create a new instance of JestFactory, Swagger content is invalid')
      showErrorMessage(
        'Cannot create a new instance of JestFactory, Swagger content is invalid'
      )
      return
    }
    swaggerFactory.setApiClientModeString('api')
    const jestInstance = swaggerFactory.create()
    const jestTests = jestInstance.render()
    setIsGenerated(true)
    setOutputContent(jestTests)
    setShowModalCode(true)    
    // setLayoutModal('fullscreen')
  }

  const handleClose = () => {
    setOpen(false)
  }
  // #endregion functions

  return (
    <CssVarsProvider disableTransitionOnChange>
      <Box sx={{ width: 500 }}>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          sx={{
            top: 100,
            backgroundColor: color,
          }}
          open={open}
          onClose={handleClose}
          key={'top-center'}
          autoHideDuration={5000}
          endDecorator={
            <IconButton onClick={() => setOpen(false)} size="sm">
              <CloseIcon />
            </IconButton>
          }
        >
          {alertMessage}
        </Snackbar>
      </Box>
      <HelmetProvider>
        <Helmet>
          <title>APICove Tools</title>
          <meta
            name="description"
            content="Convenient tools for API testing and development"
          />
          <meta
            name="keywords"
            content="API, testing, development, tools, jest, swagger, openapi, strapi, mocha, chai, unit testing, integration testing"
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
                <ClientModeRadio />
              </Stack>
              <Box
                id="generated-code"
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
                    codeString={outputContent}
                    readonly={true}
                    height={isSmallScreen ? '80%' : '100%'}
                    language="typescript"
                    showCopyButton={true}
                    showButton={false}
                    buttonText="Clear"
                    onButtonClick={() => showInfoMessage('Button clicked')}
                    // do nothing when code changes for this textarea
                    onCodeChange={() => {}}
                  />
                ) : (
                  <Box
                    id="code-skeleton"
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
                        <a href="https://jestjs.io/docs/tutorial-async">Jest</a> and{' '}
                        <a href="https://mochajs.org/">Mocha</a> test!
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
                        <ListItemDecorator>🃏</ListItemDecorator> Use Jest or Mocha for your
                        API testing
                      </ListItem>
                      <ListItem>
                        <ListItemDecorator>🧩</ListItemDecorator> Convert Swagger/OAS to
                        Jest/Mocha
                      </ListItem>
                      <ListItem>
                        <ListItemDecorator>⌛</ListItemDecorator> Save time and effort with
                        complex APIs
                      </ListItem>
                      <ListItem>
                        <ListItemDecorator>🔏</ListItemDecorator>{' '}
                        <a href="https://localfirstweb.dev">Local-first</a>, no data is send to
                        the server.
                      </ListItem>
                    </List>
                    <InputSubscription />
                    <Typography level="body-xs" sx={{ mb: 2 }}>
                      Get the latest updates to help you build faster and smarter,
                      <br />
                      no spam pinky promise! 🤞
                    </Typography>
                  </Box>
                </Box>
              </Box>
              {/* The input text to convert from */}
              <APITextarea
                codeString={swaggerContent}
                showCopyButton={false}
                showButton={true}
                buttonText="Mocha"
                height={isSmallScreen ? '80%' : '100%'}
                onButtonClick={() => handleGenerate()}
                onCodeChange={(newCode) => setSwaggerContent(newCode)}
              />
            </Box>
            {/* Content to describe the API-Tools */}
            <Box
              id="text-content"
              key={'text-content'}
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
                  rel="noreferrer noopener"
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
          <ConvertedCodeModal
            open={showModalCode}
            setOpen={setShowModalCode}
            outputContent={outputContent}
          />
        </ErrorBoundary>
      </HelmetProvider>
    </CssVarsProvider>
  )
}

export default App
