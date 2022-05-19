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
import { toJS } from "mobx";

const Production = () => {
  const [isCreateDisabled, setIsCreateDisabled] = useState(true);
  const [isStartDisabled, setIsStartDisabled] = useState(true);
  const [formData, setFormData] = useState({
    orderId: "",
    serial: "",
  });

  const { orderStore, productStore, mtpStore } = useStore();
  const { id } = useParams();

  useEffect(() => {
    const fetch = async () => {
      await orderStore.getOrder(id);
      await productStore.getProduct(orderStore.order.product.id);
    };

    fetch().then(() => {
      setIsCreateDisabled(
        !Number(formData.serial) || orderStore.order.is_created
      );
      setIsStartDisabled(
        !orderStore.order.is_created ||
          (orderStore.order.is_created && orderStore.order.is_started)
      );
    });
  }, []);

  useEffect(() => {
    setIsCreateDisabled(
      !Number(formData.serial) || orderStore.order.is_created
    );
    setIsStartDisabled(
      !orderStore.order.is_created ||
        (orderStore.order.is_created && orderStore.order.is_started)
    );
  }, [orderStore.order, formData.serial]);

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
    const orderId = Number(id);

    if (serial && orderId) {
      try {
        const response = await ProductionService.createMtps({
          orderId,
          serial,
        });
        mtpStore.getAllMtps();
        await orderStore.getOrder(id);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleStartProduction = async () => {
    const orderId = Number(id);
    try {
      const response = await ProductionService.startProduction({ orderId });
      await orderStore.getOrder(id);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>PRODUCTION</div>

      <Box component="form" onSubmit={handleSubmit}>
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

        <Button type="submit" variant="contained" disabled={isCreateDisabled}>
          Create MTPs
        </Button>

        <Button
          variant="contained"
          onClick={handleStartProduction}
          disabled={isStartDisabled}
          sx={{ ml: 1 }}
        >
          Start production
        </Button>
      </Box>
    </>
  );
};

export default observer(Production);
