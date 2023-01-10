import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { deleteProduct } from "../../redux/actions/actionsProduct";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Product({ el }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={el.imageSrc}
      />
      <CardContent>
        <Typography gutterBottom variant="h3" component="div">
          {el.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {el.category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          added by: {el.user.name}
        </Typography>
      </CardContent>
      {currentUser.role == "admin" ? (
        <CardActions>
          <Button size="small" onClick={() => dispatch(deleteProduct(el._id))}>
            Delete
          </Button>
          <Link to={`/edit/${el._id}`}>
            <Button size="small">Edit</Button>
          </Link>
        </CardActions>
      ) : null}
    </Card>
  );
}
