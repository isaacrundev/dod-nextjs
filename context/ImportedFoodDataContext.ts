import { createContext } from "react";

import { FormInputs } from "@/components/AddNewForm";

export const ImportedFoodDataContext = createContext<FormInputs | undefined>(
  undefined
);
