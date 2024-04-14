import * as React from 'react'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import FormHelperText from '@mui/joy/FormHelperText'
import Input from '@mui/joy/Input'
import Button from '@mui/joy/Button'
import emailjs from '@emailjs/browser'

export default function InputSubscription() {
    const [data, setData] = React.useState<{
        email: string
        status: 'initial' | 'loading' | 'failure' | 'sent'
    }>({
        email: '',
        status: 'initial',
    })
    // useRef to store the form element with ID subscriptionForm
    let form = document.querySelector('#subscriptionForm') as HTMLFormElement

    // handle form submission
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setData((current) => ({ ...current, status: 'loading' }))
        emailjs
            .sendForm(
                `${process.env.REACT_APP_EMAILJS_SERVICEID}`,
                `${process.env.REACT_APP_EMAILJS_TEMPLATEID}`,
                form,
                {
                    publicKey: `${process.env.REACT_APP_EMAILJS_PK}`,
                }
            )
            .then(
                () => {
                    console.log('SUCCESS!')
                    // clear the form
                    setData({ email: '', status: 'sent' })
                },
                (error) => {
                    console.log('FAILED...', JSON.stringify(error))
                    setData((current) => ({ ...current, status: 'failure' }))
                }
            )
    }

    return (
        <form onSubmit={handleSubmit} id="subscriptionForm">
            <FormControl>
                <FormLabel
                    sx={(theme) => ({
                        '--FormLabel-color': theme.vars.palette.primary.plainColor,
                    })}
                >
                    APICove Newsletter
                </FormLabel>
                <Input
                    sx={{ '--Input-decoratorChildHeight': '45px', width: '350px', flex: 1 }}
                    placeholder="mail@apicove.com"
                    type="email"
                    name="email"
                    required
                    value={data.email}
                    onChange={(event) => setData({ email: event.target.value, status: 'initial' })}
                    error={data.status === 'failure'}
                    endDecorator={
                        <Button
                            variant="solid"
                            color="primary"
                            loading={data.status === 'loading'}
                            type="submit"
                            sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                        >
                            Subscribe
                        </Button>
                    }
                />
                {data.status === 'failure' && (
                    <FormHelperText sx={(theme) => ({ color: theme.vars.palette.danger[400] })}>
                        Oops! something went wrong, please try again later.
                    </FormHelperText>
                )}
                {data.status === 'sent' && (
                    <FormHelperText sx={(theme) => ({ color: theme.vars.palette.primary[400] })}>
                        You are all set!
                    </FormHelperText>
                )}
            </FormControl>
        </form>
    )
}
