import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import demo from '../image/demo.gif'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: '90%',
      marginTop: '20px',
      margin: '0 auto'
    },
    productTitle: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between'
    }
  }));
function RelatedProducts() {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Typography variant="h5" gutterBottom={true}>Related Products</Typography>
            <Grid container spacing={3}>
                <Grid item lg={3} md={4}  xs={6}>
                    <Card>
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="160"
                            image={demo}
                            title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Product
                                </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                        <div className={classes.productTitle}>
                            <Typography gutterBottom variant="h6" component="span">
                                Rs. 4500
                            </Typography>
                            <Button size="small" color="primary">
                            Add to Cart
                            </Button>
                        </div>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item lg={3} md={4}  xs={6}>
                    <Card>
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="160"
                            image={demo}
                            title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Product
                                    </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                    across all continents except Antarctica
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                        <div className={classes.productTitle}>
                            <Typography gutterBottom variant="h6" component="span">
                                Rs. 4500
                            </Typography>
                            <Button size="small" color="primary">
                            Add to Cart
                            </Button>
                        </div>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item lg={3} md={4}  xs={6}>
                    <Card>
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="160"
                            image={demo}
                            title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Product
                                </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <div className={classes.productTitle}>
                                <Typography gutterBottom variant="h6" component="span">
                                    Rs. 4500
                                </Typography>
                                <Button size="small" color="primary">
                                Add to Cart
                                </Button>
                            </div>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default RelatedProducts
