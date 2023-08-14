import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material"
import useId from "@mui/material/utils/useId"
import React, { FC } from "react"

export const SelectField: FC<SelectField | undefined> = (props) => {
  const inputId = props?.id ?? useId()
  const dense = props?.dense ?? true
  const itemID = props?.itemID ?? inputId
  return (
    <FormControl
      size={dense ? "small" : "medium"}
      required={props?.required}
      sx={{ minWidth: 120 }}
      error={props?.error}
      fullWidth={props?.fullWidth}
    >
      {!!props?.label && <InputLabel id={inputId}>{props?.label}</InputLabel>}
      <Select
        labelId={inputId}
        id={inputId}
        itemID={itemID}
        label={props?.label}
        size={dense ? "small" : "medium"}
        defaultValue={props?.defaultValue}
        value={props?.value}
        onChange={(e) => props?.onSelect?.(e.target.value)}
        name={props?.name}
        inputProps={{
          name: props?.name,
          id: inputId,
        }}
      >
        {props?.values.map((value, index) => (
          <MenuItem key={index} value={value.value} dense={dense}>
            {props?.render?.(value, index) ?? value.content}
          </MenuItem>
        ))}
      </Select>
      {!!props?.helperText && !!props?.helperTextVisible && (
        <FormHelperText>props?.helperText</FormHelperText>
      )}
    </FormControl>
  )
}

export interface SelectField<T = string> {
  id?: string
  error?: boolean
  value?: SelectFieldValue<T>["value"]
  values: SelectFieldValue<T>[]
  defaultValue?: SelectFieldValue<T>["value"]
  render?: (item: SelectFieldValue<T>, index: number) => React.ReactNode
  helperText?: string
  helperTextVisible?: boolean
  label?: string
  required?: boolean
  fullWidth?: boolean
  dense?: boolean
  name?: string
  itemID?: string
  onSelect?: (value: SelectFieldValue<T>["value"]) => void
}

export interface SelectFieldValue<T> {
  value: string | number
  content: T
}
