import PropTypes from "prop-types";
import { useContext } from "react";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import useYupValidationResolver from "../../hooks/useYupValidationResolver";
import { NotificationContext } from "../../context/notification-context";
import "./login-form.scss";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(12, "Password cannot exceed more than 12 characters")
    .required("Password is required"),
});

function LoginForm({ loading, setLoading }) {
  const { showNotification } = useContext(NotificationContext);
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: useYupValidationResolver(schema),
  });
  const { errors } = formState;

  const simulateLogin = (userData) => {
    setLoading(true);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          showNotification({
            severity: "success",
            message: "Successfully signed in!",
          });
          resolve(userData.email);
        } catch (error) {
          showNotification({
            severity: "error",
            message: "Error while signing in",
          });
          reject(error);
        } finally {
          setLoading(false);
        }
      }, 3000);
    });
  };

  const onSubmit = (data) => {
    simulateLogin(data);
    reset();
  };

  return (
    <Box
      className="form"
      component="form"
      sx={{ boxShadow: 1 }}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box className="form__title">
        <Typography variant="h4" component="h5">
          Welcome!
        </Typography>
      </Box>
      <Box className="form__controls">
        <TextField
          name="email"
          label="Email"
          type="email"
          fullWidth
          error={!!errors.email}
          helperText={errors.email?.message}
          InputLabelProps={{ shrink: true }}
          {...register("email")}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          fullWidth
          error={!!errors.password}
          helperText={errors.password?.message}
          InputLabelProps={{ shrink: true }}
          {...register("password")}
        />
        <Button
          type="submit"
          variant="outlined"
          fullWidth
          disabled={loading || !!Object.keys(errors).length}
        >
          {loading ? <CircularProgress /> : "Sign In"}
        </Button>
      </Box>
    </Box>
  );
}

LoginForm.propTypes = {
  loading: PropTypes.bool,
  setLoading: PropTypes.func,
};

export default LoginForm;
