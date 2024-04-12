import * as React from 'react'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'

export default function HeaderSection() {
  return (
    <Stack sx={{ mb: 2 }}>
      <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
        <Typography level="h2">APICove Tools</Typography>
      </Stack>
      <Typography level="body-md" color="neutral">
        API tools to help you build faster and smarter.
      </Typography>
    </Stack>
  )
}
