export const REGULAR_EXPRESSIONS = {
    ["Name"]: /^\b(?!.*?\s{2})[A-Za-z ]{1,40}\b$/m,
    ["City"]: /^\b(?!.*?\s{2})[A-Za-z ]{1,20}\b$/m,
    ["Phone"]: /^\+[0-9]{10,20}$/m,
    ["Address"]: /^\b(?!.*?\s{2})[A-Za-z0-9 ]{1,20}\b$/m,
    ["Email"]: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/m,
    ["Notes"]: /^[^<>]{0,250}$/m,
    ['Product Name']: /^\b(?!.*?\s{2})[A-Za-z0-9 ]{3,40}\b$/m,
    ['Amount']: /^[0-9]{1,3}$/m,
    ['Price']: /^[0-9]{1,5}$/m,
  };

  export function isValidInput(inputName, value) {
    if(typeof value === 'string') {
      return REGULAR_EXPRESSIONS[inputName].test(value.trim());
    } else {
      return REGULAR_EXPRESSIONS[inputName].test(value);
    }
  }

export const CUSTOMER_REQUIRED_KEYS = ["email", "name", "country", "city", "address", "phone"]

export const VALIDATION_ERROR_MESSAGES = {
  ["Customer Name"]: `Customer's name should contain only 1-40 alphabetical characters and one space between`,
  ["City"]: `City's name should contain only 1-20 alphabetical characters and one space between`,
  ["Address"]: `Address should contain only 1-20 alphanumerical characters and one space between`,
  ["Email"]: "Invalid Email Address",
  ["Phone"]: "Mobile Number should be at least 10 characters and start with a +",
  ["Notes"]: "Notes should be in range 0-250 and without < or > symbols",
  ["Product Name"]: "Products's name should contain only 3-40 alphanumerical characters and one space between",
  ['Amount']: "Amount should be in range 0-999",
  ['Price']: "Price should be in range 1-99999",
  ['Country']: "No such country is defined",
  ['Manufacturer']: "No such manufacturer is defined"
};

export const COUNTRIES = ["USA", "Canada", "Belarus", "Ukraine", "Germany", "France", "Great Britain", "Russia"]

export const MANUFACTURERS = ["Apple", "Samsung", "Google", "Microsoft", "Sony", "Xiaomi", "Amazon", "Tesla"]