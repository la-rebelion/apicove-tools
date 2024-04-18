import React, { useMemo, useState } from 'react'
import Editor from '@monaco-editor/react'
// MUI joy
import Button from '@mui/joy/Button'
import IconButton from '@mui/joy/IconButton'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Box, Card, CardActions, CardContent, CardCover, Tooltip, Typography } from '@mui/joy'

interface APITextareaProps {
  codeString: string
  height?: string
  language?: 'json' | 'yaml' | 'xml' | 'javascript' | 'typescript' | 'html'
  readonly?: boolean
  showCopyButton: boolean
  showButton: boolean
  buttonText: string
  onButtonClick: () => void
  onCodeChange: (newCode: string) => void
}

const APITextarea: React.FC<APITextareaProps> = ({
  codeString,
  height = '80%',
  language = 'json',
  readonly = false,
  showCopyButton,
  showButton,
  buttonText,
  onButtonClick,
  onCodeChange,
}) => {
  const [code, setCode] = useState<string>('{\n  "key1": "value"\n}')
  useMemo(() => setCode(codeString), [codeString])

  const handleCopy = async () => {
    const textToCopy = code
    await navigator.clipboard.writeText(textToCopy)
    alert('Code copied to clipboard')
  }

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: { height },
        width: '100%',
        padding: 2,
        position: 'relative',
        // make the card resizable
        overflow: 'auto',
        resize: 'vertical',
      }}
    >
      <CardCover
        sx={{
          background:
            'linear-gradient(to top, rgba(74,94,231,0.8), rgba(0,0,0,0) 400px), linear-gradient(to top, rgba(10,155,209,0.8), rgba(0,0,0,0) 1100px)',
        }}
      />
      <CardContent sx={{ justifyContent: 'flex-end' }}>
        {showCopyButton && (
          <Tooltip title="Copy code">
            <IconButton
              sx={{
                position: 'absolute',
                zIndex: 1,
                top: 15,
                right: 50,
              }}
              onClick={handleCopy}
            >
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
        )}
        <Editor
          height="100%"
          language={language}
          theme="light"
          value={code}
          onChange={(value) => {
            setCode(value ?? '')
            onCodeChange(value ?? '')
          }}
        options={{
            inlineSuggest: {
                enabled: true,
            },
            fontSize: 16,
            formatOnType: true,
            autoClosingBrackets: 'languageDefined',
            minimap: { scale: 10 },
            readOnly: readonly,
        }}
        />
        {showButton && (
          <Box sx={{ gap: 1.5, '& > button': { flex: 1 }, justifyContent: 'flex-end' }}>
            <CardActions buttonFlex="1">
              <Typography level="title-lg" sx={{ color: 'rgba(255,255,209.04)' }}>
                Convert to:
              </Typography>
              <Button
                sx={{
                  borderRadius: 'sm',
                  backgroundColor: 'rgba(13,195,209.04)',
                  border: '2px solid white',
                }}
                onClick={onButtonClick}
                startDecorator="🃏"
              >
                {buttonText}
              </Button>
              <Tooltip title="Coming soon">
                <Button
                  sx={{
                    borderRadius: 'sm',
                    backgroundColor: 'rgba(10,155,209.05)',
                    border: '2px solid grey',
                  }}
                  color="neutral"
                  onClick={() => {
                    alert('Coming soon, subscribe to get the latests news.')
                  }}
                  endDecorator="🔜"
                >
                  Strapi
                </Button>
              </Tooltip>
            </CardActions>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default APITextarea
