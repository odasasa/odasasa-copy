import { ucWords } from "./str_functions";

interface KeyedObject {
  [key: string]: any;
}

export function objectToArrayOfObjects(obj: KeyedObject): Array<KeyedObject> {
  const keyValueArray: Array<KeyedObject> = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const keyValueObject: KeyedObject = {};
      keyValueObject[key] = obj[key];
      keyValueArray.push(keyValueObject);
    }
  }

  return keyValueArray;
}

/**
 * Get category from products
 */

export function extraProductCategories(products: { category: string }[]) {
  let uniqueCategory = Array.from(new Set(products.map((p) => p.category)));
  return uniqueCategory.map((category) => {
    let option = {
      label: "",
      value: "",
    };
    return {
      ...option,
      label: ucWords(category),
      value: category,
    };
  });
}

// HTTPSFUNCTIONS

export function getSearchParams(url: string, field = "vendor") {
  let params = new URL(url).searchParams;
  return params.get(field) || "";
}
