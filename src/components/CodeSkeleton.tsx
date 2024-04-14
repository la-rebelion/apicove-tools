import AspectRatio from '@mui/joy/AspectRatio'
import Stack from '@mui/joy/Stack'
import Button from '@mui/joy/Button'
import Card from '@mui/joy/Card'
import Skeleton from '@mui/joy/Skeleton'
import Typography from '@mui/joy/Typography'

export default function CodeSkeleton() {
  return (
    <Stack spacing={2} useFlexGap>
      <Card variant="outlined" sx={{ width: 343 }}>
        {/* <CardContent orientation="horizontal">
          <Skeleton animation="wave" variant="circular" width={48} height={48} />
          <div>
            <Skeleton animation="wave" variant="text" sx={{ width: 120 }} />
            <Skeleton
              animation="wave"
              variant="text"
              level="body-sm"
              sx={{ width: 200 }}
            />
          </div>
        </CardContent> */}
        <AspectRatio ratio="21/5">
          <Skeleton animation="wave" variant="overlay">
            <img alt="" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" />
          </Skeleton>
        </AspectRatio>
        <Typography sx={{ overflow: 'hidden' }}>
          <Skeleton animation="wave">
            {
              '[{\n  "key1": "value"\n},{\n  "key1": "value"\n},{\n  "key1": "value"\n},{\n  "key1": "value"\n},{\n  "key1": "value"\n},{\n  "key1": "value"\n},{\n  "key1": "value"\n},{\n  "key1": "value"\n}]'
            }
          </Skeleton>
        </Typography>
        <Button>
          Read more
          <Skeleton animation="wave" />
        </Button>
      </Card>
    </Stack>
  )
}
