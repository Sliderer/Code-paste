import React from 'react';
import { createStyles, Grid2, makeStyles, Paper }  from '@mui/material'; 

const VariantSelector = ({values}: {values: string[]}) => {
    return <Grid2>
        {values.map(value => <Grid2>{value}</Grid2>)}
    </Grid2>
}

export default VariantSelector;