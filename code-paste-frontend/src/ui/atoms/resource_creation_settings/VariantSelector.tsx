import { Grid2 }  from '@mui/material'; 

const VariantSelector = ({values}: {values: string[]}) => {
    return <Grid2>
        {values.map(value => <Grid2>{value}</Grid2>)}
    </Grid2>
}

export default VariantSelector;