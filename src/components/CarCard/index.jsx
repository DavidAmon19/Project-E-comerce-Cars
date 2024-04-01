import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { DivCard, DivContent } from "./style";
import CarModal from "../CarModal";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CarCard() {
  const [expanded, setExpanded] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [carros, setCarros] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    const buscarCarros = () => {
      axios
        .get("http://localhost:3000/carros")
        .then((response) => setCarros(response.data))
        .catch((error) => console.log(error));
    };
    buscarCarros();
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClickOpenModal = (carro) => {
    setSelectedCar(carro);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <DivContent>
        {carros.map((carro) => (
          <Card key={carro.id} sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                  {carro.modelo[0]}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={carro.modelo}
              subheader={`Ano ${carro.ano}`}
            />
            <CardMedia
              component="img"
              height="194"
              image={carro.fotos[0]}
              alt={carro.marca}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to
                cook together with your guests. Add 1 cup of frozen peas along
                with the mussels, if you like.
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <DivCard>
                <span>{` R$ ${carro.preco}`}</span>

                <Button
                  variant="contained"
                  onClick={() => handleClickOpenModal(carro)}
                  color="primary"
                >
                  Mais
                </Button>
              </DivCard>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>{carro.marca}</Typography>
                <Typography paragraph>{carro.description}</Typography>
              </CardContent>
            </Collapse>
          </Card>
        ))}
      </DivContent>
      <CarModal open={openModal} handleClose={handleCloseModal} selectedCar={selectedCar} />
    </>
  );
}
