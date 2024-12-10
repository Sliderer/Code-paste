import { Grid, GridItem, List } from "@chakra-ui/react";

const VariantSelector = ({values}: {values: string[]}) => {
    return <Grid
     templateRows="repeat(2, 1fr)"
     templateColumns="repeat(2, 1fr)"
        >
        {values.map(value => <GridItem>{value}</GridItem>)}
    </Grid>
}

export default VariantSelector;