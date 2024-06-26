import {
  Modal,
  TextField,
  Box,
  Stack,
  Avatar,
  Typography,
  Chip,
  Button,
  Paper, useTheme,
} from "@mui/material";
import { useState } from "react";
import { MTNIcon } from "../../assets";
import { useAlert } from "../../hooks/useAlert";

const PaymentModal = ({ isOpen, handleClose, title, amount, isSending = false }) => {
  const [accountNumber, setAccountNumber] = useState("");
  const [accountNumberError, setAccountNumberError] = useState("");

  const [accountName, setAccountName] = useState("");
  const [accountNameError, setAccountNameError] = useState("");
  const theme = useTheme();
  const alert = useAlert();

  // const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e) => {
    if (accountNumber.trim() === "" || accountName.trim() === "") {
      setAccountNumberError("Account number and name is required");
      alert.show({
        message: "Please enter account number and name",
        type: "error",
        duration: 3000,
      });
      return;
    }

    alert.show({
      message: "Purchase complete",
      type: "success",
      duration: 3000,
    });
    setTimeout(() => {
      handleClose();
    }, 3000);
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="fs-modal"
      sx={{zIndex: 9}}
    >
      <Paper
        variant="form"
        noValidate
        className="modal-body"
        sx={{
          background: theme.palette.background.main,
          padding: "10px 17px",
          borderRadius: { xs: "0", sm: "5" },
          maxWidth: { xs: "100vw", sm: "350px" },
          height: { xs: "100vh", sm: "fit-content" },
          width: '100vw',
          position: 'fixed',
          transform: 'translate(-50%, -50%)',
          top: '50%',
          left: '50%',
          outline: 'none',
        }}
      >
        <Stack spacing={2}>
          <Typography
            color="primary"
            variant="h6"
            fontWeight="bold"
            textAlign="center"
          >
            {title}
          </Typography>
          <TextField
            required
            id="account-number"
            label="Account Number"
            variant="filled"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="Enter account number"
            error={accountNumberError !== ""}
          />
          <TextField
            required
            id="account-name"
            label="Account Name"
            variant="filled"
            value={accountNumber}
            onChange={(e) => setAccountName(e.target.value)}
            placeholder="Enter account name"
            error={accountNameError !== ""}
          />
          <TextField
            required
            id="amount"
            label="Amount"
            variant="filled"
            type="number"
            value={amount}
            placeholder="Enter Amount"
            readonly
          />
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Button
              variant="contained"
              color="error"
              sx={{ flexGrow: 1 }}
              onClick={() => handleClose()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              sx={{ flexGrow: 1 }}
            >
              { isSending ? "Deposit" : "Purchase" }
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Modal>
  );
};

export default PaymentModal;
