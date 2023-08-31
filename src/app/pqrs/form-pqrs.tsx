import {
  Box,
  Button,
  DialogActions,
  Divider,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material"
import { BadgeOutlined as DocumentIdIcon } from "@mui/icons-material"
import {
  SelectField,
  SelectFieldValue,
} from "../../share/components/selectField"
import React, { useState } from "react"

interface Props {
  onSave(): void
  onCancel(): void
}

interface PQRS { }

export const FormPQRS: React.FC<Props> = (props) => {
  const { onSave, onCancel } = props

  const KindOfPQRS: SelectFieldValue<string>[] = [
    {
      value: 0,
      content: "Petición",
    },
    {
      value: 1,
      content: "Queja",
    },
    {
      value: 2,
      content: "Reclamo",
    },
    {
      value: 3,
      content: "Solicitúd",
    },
  ]

  const [pqrsForm, setPQRSForm] = useState<PQRS>()

  const onSavePQRS = () => { }

  return (
    <Grid
      container
      spacing={1}
      component="form"
      flexDirection="column"
      onSubmit={(e) => {
        e.preventDefault()
        onSavePQRS()
      }}
    >
      <Grid item marginBottom={1}>
        <Typography variant="subtitle1" color="gray">
          Información Contrato
        </Typography>
        <Divider />
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs>
          <SelectField
            label="Tipo asociado"
            name="associateType"
            id="associateType"
            itemID="associateType"
            defaultValue={KindOfPQRS[0].value}
            values={KindOfPQRS}
            fullWidth
          />
        </Grid>
        <Grid item xs>
          <TextField
            fullWidth
            label="Número de Contrato"
            name="contractCode"
            id="contractCode"
            itemID="contractCode"
            defaultValue=""
            InputProps={{
              startAdornment: (
                <DocumentIdIcon sx={{ mr: 1 }} color="disabled" />
              ),
            }}
          />
        </Grid>
      </Grid>

      <Grid item marginTop={2} marginBottom={1}>
        <Typography variant="subtitle1" color="gray">
          Información Personal
        </Typography>
        <Divider />
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={4}>
          <SelectField
            label="Tipo de identificación"
            name="identificationType"
            id="identificationType"
            itemID="identificationType"
            defaultValue={KindOfPQRS[0].value}
            values={KindOfPQRS}
            fullWidth
          />
        </Grid>
        <Grid item xs>
          <TextField
            fullWidth
            label="Número de documento"
            name="documentId"
            id="documentId"
            itemID="documentId"
            defaultValue=""
            InputProps={{
              startAdornment: (
                <DocumentIdIcon sx={{ mr: 1 }} color="disabled" />
              ),
            }}
          />
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs>
          <TextField
            fullWidth
            label="Nombres"
            name="firstnames"
            id="firstnames"
            itemID="firstnames"
            defaultValue=""
            InputProps={{
              startAdornment: (
                <DocumentIdIcon sx={{ mr: 1 }} color="disabled" />
              ),
            }}
          />
        </Grid>
        <Grid item xs>
          <TextField
            fullWidth
            label="Apellidos"
            name="lastname"
            id="lastname"
            itemID="lastname"
            defaultValue=""
            InputProps={{
              startAdornment: (
                <DocumentIdIcon sx={{ mr: 1 }} color="disabled" />
              ),
            }}
          />
        </Grid>
      </Grid>

      <Grid item>
        <TextField
          fullWidth
          label="Correo Electrónico"
          name="email"
          id="email"
          itemID="email"
          defaultValue=""
          InputProps={{
            startAdornment: <DocumentIdIcon sx={{ mr: 1 }} color="disabled" />,
          }}
        />
      </Grid>

      <Grid item>
        <TextField
          fullWidth
          label="Télefono celular"
          name="celularPhone"
          id="celularPhone"
          itemID="celularPhone"
          defaultValue=""
          InputProps={{
            startAdornment: <DocumentIdIcon sx={{ mr: 1 }} color="disabled" />,
          }}
        />
      </Grid>

      <Grid item marginBottom={1} marginTop={2}>
        <Typography variant="subtitle1" color="gray">
          Información PQRS
        </Typography>
        <Divider />
      </Grid>

      <Grid item>
        <SelectField
          label="Tipo Solicitud"
          name="requestType"
          id="requestType"
          itemID="requestType"
          defaultValue={KindOfPQRS[0].value}
          values={KindOfPQRS}
          fullWidth
        />
      </Grid>

      <Grid item>
        <TextField
          fullWidth
          label="Descripción del reporte"
          name="description"
          id="description"
          itemID="description"
          multiline
          minRows={4}
          maxRows={10}
          defaultValue=""
        />
      </Grid>

      <DialogActions >
        <Grid container item xs={12} justifyContent="end" marginTop={1}>
          <Button sx={{ marginInline: 1 }} type="submit">
            Generar PQRS
          </Button>
        </Grid>
      </DialogActions>
    </Grid>
  )
}
