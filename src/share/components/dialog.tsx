import { FC, PropsWithChildren } from "react"
import {
  Dialog as Popup,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material"
import { Close as CloseIcon } from "@mui/icons-material"

interface Props extends PropsWithChildren {
  title: string
  visible: boolean
  onClose?(): void
  onCancel?():void
}

export const Dialog: FC<Props> = (props) => {
  const { title, children, onClose, visible, onCancel } = props
  return (
    <Popup
      closeAfterTransition
      disableEscapeKeyDown={!!onCancel}
      onClose={onCancel}
      open={visible}
      fullWidth
    >
      <DialogTitle>
        <Typography variant="h5">{title}</Typography>
        {!!onClose && (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Popup>
  )
}
