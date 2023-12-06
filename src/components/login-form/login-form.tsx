import { useContext, useState } from "react";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useForm } from "react-hook-form";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { NotificationContext } from "@/context/notification-context";
import { IFormData } from "@/interfaces/IFormData";
import { schema } from "@/components/login-form/schema";
import "@/components/login-form/login-form.scss";

const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { showNotification } = useContext(NotificationContext);
  const { register, handleSubmit, formState, reset } = useForm<IFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: useYupValidationResolver(schema),
  });
  const { errors } = formState;

  const simulateLogin = (userData: IFormData) => {
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

  const onSubmit = (data: IFormData) => {
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
          Welcome
        </Typography>
      </Box>
      <Box className="form__controls">
        <TextField
          label="Email"
          type="email"
          fullWidth
          error={!!errors.email}
          helperText={errors.email?.message}
          InputLabelProps={{ shrink: true }}
          {...register("email")}
        />
        <TextField
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
};

export default LoginForm;
