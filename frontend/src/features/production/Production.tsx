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
import ProductionService from "../../services/ProductionService";

const Production = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [formData, setFormData] = useState({
    orderId: "",
    serial: "",
  });

  const { orderStore, productStore } = useStore();
  const { id } = useParams();

  useEffect(() => {
    const fetch = async () => {
      await orderStore.getOrder(id);
      await productStore.getProduct(orderStore.order.product.id);
    };

    fetch();
  }, []);

  useEffect(() => {
    setIsDisabled(!Number(formData.serial));
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

    const serial = Number(data.get("serial"));
    const orderId = Number(id)

    if (serial && orderId) {
      const response = await ProductionService.startProduction({ orderId, serial })
      console.log(response.data);
    }
  };

  return (
    <>
      <div>PRODUCTION</div>

      <Box
        component="form"
        onSubmit={handleSubmit}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* <FormControl sx={{ m: 1, minWidth: 120 }} variant="standard">
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
          </FormControl> */}

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
