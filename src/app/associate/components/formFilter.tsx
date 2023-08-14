import { Box, Button, Grid, Paper, TextField } from "@mui/material"
import {
  BadgeOutlined as DocumentIdIcon,
  Person as PersonIcon,
} from "@mui/icons-material"
import {
  SelectField,
  SelectFieldValue,
} from "../../../share/components/selectField"
import React, { useState } from "react"

export interface AssociateFilters {
  documentId?: string
  name?: string
  type?: string | number
  active?: string | number
}

export interface FormFilterProps {
  associateTypes: SelectFieldValue<string>[]
  associateActive: SelectFieldValue<string>[]
  onSearchAssociate: (filters?: AssociateFilters) => void
}

export const FormFilter: React.FC<FormFilterProps> = (props) => {
  const { associateTypes, associateActive, onSearchAssociate } = props
  const [filtersValue, setFilterValue] = useState<AssociateFilters>()

  const onPressSearchButton = () => {
    onSearchAssociate?.(filtersValue)
  }

  const onPressClearFormButton = () => {
    setFilterValue({
      documentId: "",
      name: "",
      active: associateActive[0].value,
      type: associateTypes[0].value,
    })
  }

  return (
    <Paper variant="outlined" sx={{ p: 2 }} elevation={0}>
      <Box
        flexDirection="column"
        component="form"
        onSubmit={(e) => {
          e.preventDefault()
          onPressSearchButton()
        }}
      >
        <TextField
          fullWidth
          label="Numero de documento"
          name="documentId"
          id="documentId"
          defaultValue=""
          InputProps={{
            startAdornment: <DocumentIdIcon sx={{ mr: 1 }} color="disabled" />,
          }}
          onChange={(e) =>
            setFilterValue({ ...filtersValue, documentId: e.target.value })
          }
        />
        <TextField
          fullWidth
          label="Nombre asociado"
          variant="outlined"
          name="name"
          id="name"
          InputProps={{
            startAdornment: <PersonIcon sx={{ mr: 1 }} color="disabled" />,
          }}
          sx={{ marginY: 2 }}
          onChange={(e) =>
            setFilterValue({ ...filtersValue, name: e.target.value })
          }
        />
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <SelectField
              label="Tipo asociado"
              name="type"
              id="type"
              defaultValue={associateTypes[0].value}
              values={associateActive}
              fullWidth
              onSelect={(value) =>
                setFilterValue({ ...filtersValue, type: value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectField
              fullWidth
              name="active"
              id="active"
              label="Estado"
              defaultValue={associateActive[0].value}
              values={associateActive}
              onSelect={(value) =>
                setFilterValue({ ...filtersValue, active: value })
              }
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} justifyContent="end" marginTop={1}>
          <Button sx={{ marginInline: 1 }} type="submit">
            Buscar
          </Button>
          <Button
            sx={{ marginInline: 1 }}
            type="reset"
            variant="text"
            onClick={onPressClearFormButton}
          >
            Limpiar
          </Button>
        </Grid>
      </Box>
    </Paper>
  )
}
