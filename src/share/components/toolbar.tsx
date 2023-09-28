import { ArrowBack } from "@mui/icons-material"
import {
  IconButton,
  Paper,
  Toolbar as MUIToolbar,
  Typography,
} from "@mui/material"
import { Box } from "@mui/system"
import React from "react"
import { useNavigate } from "react-router-dom"

export const Toolbar: React.FC<Toolbar> = (props) => {
  const { showButtonReturn } = props
  const navigate = useNavigate()
  return (
    <Paper variant="outlined" square>
      <MUIToolbar variant="dense">
        {showButtonReturn && (
          <IconButton onClick={() => navigate(-1)} sx={{ mr: 4 }}>
            <ArrowBack />
          </IconButton>
        )}
        <Typography variant="h6" color="inherit" component="div">
          {props.title}
        </Typography>
        <Box sx={{ flex: 1 }} />
        {props.buttons?.map((button, index) => (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            key={index}
            onClick={button.action}
          >
            {button.icon}
          </IconButton>
        ))}
        <Box sx={{ width: 24 }} />
      </MUIToolbar>
    </Paper>
  )
}

export interface Toolbar {
  buttons?: ToolbarButton[]
  title?: string
  showButtonReturn?: boolean
}

export interface ToolbarButton {
  icon: React.ReactNode
  action: (params?: unknown) => void
}
