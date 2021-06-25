const isNullOrEmpty = (val: any): boolean => {
   // want to be explicit about the intention here instead of coercing with `== null`
   if (val === null || val === undefined) {
      return true;
   }
   if (typeof val === "string") {
      return val.trim() === "";
   }
   if (val instanceof Array) {
      return val.length < 1 || val.every((item) => isNullOrEmpty(item));
   }
   if (val === Object(val)) {
      return Object.keys(val).every((key) => isNullOrEmpty(val[key]));
   }
   return false;
};
export default isNullOrEmpty;
