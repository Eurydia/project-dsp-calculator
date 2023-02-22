import { Button, TextField } from "@mui/material";
import { FC, Fragment, useEffect } from "react";

import { Recipe } from "../../../assets";
import { FieldNumber } from "../../FieldNumber";

type FormBillProps = {
  placeholder: string;
  items: Record<string, number>;
  onItemsChange: (key: string, next_value: number) => void;
};
const FormBill: FC<FormBillProps> = (props) => {
  const { placeholder, items, onItemsChange } = props;

  const handleItemAdd = () => {
    const size = Object.keys(items).length;
    const key = `${placeholder} #${size + 1}`;
    onItemsChange(key, 0);
  };

  return (
    <Fragment>
      {Object.entries(items).map((entry) => {
        const [key, value] = entry;
        return (
          <FieldNumber
            key={key}
            label={key}
            suffix="/min"
            value={value}
            minValue={0}
            maxValue={Number.MAX_SAFE_INTEGER - 1}
            onValueChange={(next_value) => {
              onItemsChange(key, next_value);
            }}
          />
        );
      })}
      <Button onClick={handleItemAdd}>{`Add ${placeholder}`}</Button>
    </Fragment>
  );
};

type FormRecipeDebugProps = {
  recipe: Recipe;
  onRecipeChange: (
    next_recipe: (prev_recipe: Recipe) => Recipe,
  ) => void;
};
export const FormRecipeDebug: FC<FormRecipeDebugProps> = (props) => {
  const { recipe, onRecipeChange } = props;

  const { cycle_time, materials, products } = recipe;

  const handleCycleTimeChange = (next_value: number) => {
    onRecipeChange((prev) => {
      const next = { ...prev, cycle_time: next_value };
      return next;
    });
  };

  const handleMaterialsChange = (key: string, next_value: number) => {
    onRecipeChange((prev) => {
      const next_materials = { ...prev.materials };
      next_materials[key] = next_value;
      const next = { ...prev };
      next["materials"] = next_materials;
      return next;
    });
  };

  const handleProductsChange = (key: string, next_value: number) => {
    onRecipeChange((prev) => {
      const next_products = { ...prev.products };
      next_products[key] = next_value;
      const next = { ...prev };
      next["products"] = next_products;
      return next;
    });
  };

  return (
    <Fragment>
      <FieldNumber
        label="Recipe: Cycle time"
        minValue={0}
        maxValue={Number.MAX_SAFE_INTEGER - 1}
        suffix="s"
        value={cycle_time}
        onValueChange={handleCycleTimeChange}
      />
      <FormBill
        placeholder="Material"
        items={materials}
        onItemsChange={handleMaterialsChange}
      />
      <FormBill
        placeholder="Product"
        items={products}
        onItemsChange={handleProductsChange}
      />
    </Fragment>
  );
};
