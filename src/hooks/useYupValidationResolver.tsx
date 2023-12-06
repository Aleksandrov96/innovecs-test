import { useCallback } from "react";
import * as yup from "yup";
import { IFormData } from "@/interfaces/IFormData";

const useYupValidationResolver = (
  validationSchema: yup.ObjectSchema<
    {
      email: string;
      password: string;
    },
    yup.AnyObject,
    {
      email: undefined;
      password: undefined;
    },
    ""
  >
) =>
  useCallback(
    async (data: IFormData) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (
              allErrors: Record<string, { type?: string; message: string }>,
              currentError: any
            ) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? "validation",
                message: currentError.message,
              },
            }),
            {}
          ),
        };
      }
    },
    [validationSchema]
  );

export default useYupValidationResolver;
