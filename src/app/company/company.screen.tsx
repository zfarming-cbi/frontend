import { FC } from "react"
import { Alert, Box, Button, DialogActions, Grid, TextField, Typography } from "@mui/material"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useGetCompanyQuery, useUpdateCompanyMutation } from "../../settings/api/endpoints/company"


export const CompanyScreen: FC = () => {
    const {
        handleChange,
        handleBlur,
        handleSubmit,
        errors,
        values: { name: nameInputValue, nit: nitInputValue },
    } = useFormik<{
        name: string
        nit: string
    }>({
        initialValues: {
            name: "", nit: "",
        },
        validateOnMount: false,
        validateOnBlur: true,
        validateOnChange: false,
        validationSchema: FormEditCompanySchema,
        async onSubmit(credentials) {
            doUpdateCompany(credentials)
        },
    })

    const { data } = useGetCompanyQuery()
    const [doUpdateCompany, { isLoading, error }] = useUpdateCompanyMutation()

    return (
        <Grid
            justifyContent="center"
            alignItems="center"
            width="100vw"
            height="100vh"
            container
        >
            <Grid
                container
                spacing={1}
                component="form"
                flexDirection="column"
                onSubmit={handleSubmit}
                item xs={8} sm={5} lg={4}
            >
                <Box>
                    <Typography fontWeight="ligth" fontSize={20} textAlign={"center"} color={"grey"}>
                        Empresa
                    </Typography>
                </Box>
                <Grid item xs>
                    <TextField
                        fullWidth
                        required
                        label="Nombre"
                        variant="outlined"
                        name="name"
                        id="name"
                        defaultValue={data?.name}
                        value={nameInputValue}
                        disabled={isLoading}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!errors.name}
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                        fullWidth
                        required
                        label="NIT"
                        variant="outlined"
                        name="nit"
                        id="nit"
                        value={nitInputValue}
                        disabled={isLoading}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!errors.nit}
                    />
                </Grid>
                {!!error && (
                    <Alert
                        sx={{
                            marginTop: 1,
                            textAlign: "left",
                            fontSize: 10,
                            alignItems: "center",
                        }}
                        severity="error"
                        variant="filled"
                    >
                        lo sentimos en este momento no podemos validar la información
                        {/* {JSON.stringify(error)} */}
                    </Alert>
                )}
                <DialogActions >
                    <Grid container item xs={12} justifyContent="end" marginTop={1}>
                        <Button sx={{ marginInline: 1 }} type="submit">
                            Guardar
                        </Button>
                    </Grid>
                </DialogActions>
            </Grid>
        </Grid>
    )
}

const FormEditCompanySchema = Yup.object().shape({
    name: Yup.string()
        .min(3)
        .max(50)
        .required("El nombre no es valido."),
    nit: Yup.string()
        .min(3)
        .max(50)
        .required("El apellido no es valido."),
})
