import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { useStore } from "../../hooks/useStore";

export default function AdminLine() {
  const { authStore } = useStore();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    authStore.setAuth(event.target.checked);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={authStore.isAuth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={authStore.isAuth ? "Logout" : "Login"}
        />
      </FormGroup>
    </Box>
  );
}
