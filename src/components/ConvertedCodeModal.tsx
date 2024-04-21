import {
    Button,
    ButtonGroup,
    DialogContent,
    Modal,
    ModalClose,
    ModalDialog,
    ModalDialogProps,
    Sheet,
    Tooltip,
    Typography,
} from '@mui/joy'
import APITextarea from './APITextarea'
import React, { useState } from 'react'
import MochaRunner from './MochaRunner'

interface ConvertedCodeModalProps {
    open: boolean
    setOpen: (open: boolean) => void
    outputContent: string
}

const ConvertedCodeModal: React.FC<ConvertedCodeModalProps> = ({
    open,
    setOpen,
    outputContent,
}) => {
    const [showRunningCode, setShowRunningCode] = useState<boolean>(false)
    const [layoutModal, setLayoutModal] = useState<ModalDialogProps['layout'] | undefined>(
        undefined
    )
    const handleClose = () => {
        setOpen(false)
        setLayoutModal(undefined)
    }
    return (
        <React.Fragment>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                // open={openModal}
                // onClose={() => setOpenModal(false)}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                open={open}
                onClose={() => handleClose()}
            >
                {/* move the ModalDialog 55px from top because header */}
                <ModalDialog
                    layout={open ? 'fullscreen' : layoutModal}
                    sx={{
                        top: '55px',
                    }}
                >
                    <ModalClose tabIndex={-1} />
                    <DialogContent>
                        <Typography
                            component="h2"
                            id="modal-title"
                            level="h4"
                            textColor="inherit"
                            fontWeight="lg"
                            mb={1}
                        >
                            Your generated code
                        </Typography>
                        {/* @todo - refactor, reuse generated code APITextarea */}
                        <APITextarea
                            codeString={outputContent}
                            readonly={true}
                            height="100%"
                            language="typescript"
                            showCopyButton={true}
                            showButton={false}
                            buttonText="Clear"
                        />
                        <ButtonGroup
                            variant="soft"
                            aria-label="outlined primary button group"
                            buttonFlex="0 1 200px"
                            sx={{ width: '100%', justifyContent: 'center' }}
                        >
                            <Tooltip title={<><b>Ctrl + Enter</b> Run the code</>}>
                                <Button
                                    tabIndex={0}
                                    color='success'
                                    onClick={() => { setShowRunningCode(true) }}
                                    startDecorator="▶️"
                                    onKeyDown={(event: React.KeyboardEvent<HTMLButtonElement>) => {
                                        if (event.ctrlKey && event.key === 'Enter') {
                                            setShowRunningCode(true)
                                        }
                                    }}
                                >
                                    Run
                                </Button>
                            </Tooltip>
                            <Button color='neutral' onClick={() => handleClose()}>Close</Button>
                        </ButtonGroup>
                    </DialogContent>
                </ModalDialog>
            </Modal>
            <Modal id="running-code-modal" 
                open={showRunningCode} 
                onClose={() => setShowRunningCode(false)}
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Sheet
                    variant="outlined"
                    sx={{
                        maxWidth: 500,
                        borderRadius: 'md',
                        p: 3,
                        boxShadow: 'lg',
                    }}
                >
                    <ModalClose variant="plain" sx={{ m: 1 }} />
                    <Typography id="modal-title"
                        component="h2"
                        level="h4"
                        textColor="inherit"
                        fontWeight="lg"
                        mb={1}
                    >
                        Running your code - Alpha feature 🚧
                    </Typography>
                    <MochaRunner testCode={outputContent} />
                </Sheet>
            </Modal>
        </React.Fragment>
    )
}
export default ConvertedCodeModal
