import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { DivDetails } from "./style";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(10),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(5),
  },
}));

export default function CarModal({ open, handleClose, selectedCar }) {
  if (!selectedCar) {
    return null;
    0;
  }

  const { modelo, description, marca, preco, ano } = selectedCar;

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {modelo}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Typography gutterBottom>{description}</Typography>
      </DialogContent>
      <DialogContent dividers>
        <Typography gutterBottom>
          <DivDetails>
            {preco}
            {marca}
            {modelo}
            {ano}
          </DivDetails>
        </Typography>
      </DialogContent>
    </BootstrapDialog>
  );
}
