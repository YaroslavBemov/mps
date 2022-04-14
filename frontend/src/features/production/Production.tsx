import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { useStore } from "../../hooks/useStore";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

const Production = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [formData, setFormData] = useState({
    orderId: "",
    baseMtpId: "",
    serial: "",
  });

  const { baseMTPStore, orderStore, productStore } = useStore();
  const { id } = useParams();

  useEffect(() => {
    const fetch = async () => {
      await orderStore.getOrder(id);
      await productStore.getProduct(orderStore.order.product.id);
      await baseMTPStore.getAllBaseMTPs();
    };

    fetch();
  }, []);

  useEffect(() => {
    setIsDisabled(!formData.baseMtpId || !Number(formData.serial));
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const baseMtpId = Number(data.get("baseMtpId"));
    const serial = Number(data.get("serial"));
    const orderId = Number(id)

    if (baseMtpId && serial && orderId) {
      // await baseProcedureStore.storeBaseProcedure({});
      // await baseProcedureStore.getAllBaseProcedures();
    }
  };

  return (
    <>
      <div>PRODUCTION</div>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={
          {
            // display: "flex",
            // flexDirection: 'column',
            // justifyContent: "center",
            // alignItems: "center",
            // padding: 2,
            // gap: 1,
          }
        }
      >
        <Box
          sx={{
            display: "flex",
            // flexDirection: 'column',
            // justifyContent: "center",
            alignItems: "center",

            // padding: 2,
            // gap: 1,
          }}
        >
          <FormControl sx={{ m: 1, minWidth: 120 }} variant="standard">
            <InputLabel id="base-mtp-id">Base MTP</InputLabel>
            <Select
              labelId="base-mtp-id"
              label="Product base MTP"
              name="baseMtpId"
              value={formData.baseMtpId}
              onChange={handleChange}
            >
              {baseMTPStore.byProduct?.map((mtp) => (
                <MenuItem key={mtp.id} value={mtp.id}>
                  {mtp.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            type="number"
            value={formData.serial}
            onChange={handleChange}
            name="serial"
            label="Start serial from"
            variant="standard"
          />
        </Box>

        <Button type="submit" variant="contained" disabled={isDisabled}>
          Start
        </Button>
      </Box>
    </>
  );
};

export default observer(Production);
