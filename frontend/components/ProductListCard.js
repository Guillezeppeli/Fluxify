import React from "react";
import ProductList from "./ProductList";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    margin: "auto",
    boxShadow: "0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)",
  },
});

const ProductListCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <ProductList />
      </CardContent>
    </Card>
  );
};

export default ProductListCard;
