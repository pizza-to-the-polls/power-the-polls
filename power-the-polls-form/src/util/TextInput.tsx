import { FunctionalComponent, h } from "@stencil/core";

import { PtpFormData } from "./types";

const TextInput: FunctionalComponent<{ data: PtpFormData, field: keyof PtpFormData, initialValue?: string, required?: boolean }> =
   ( { data, field, initialValue, required } ) => {
      return (
         <input
            type="text"
            required={required}
            name={field}
            value={data[field] || initialValue}
            onInput={e => data[field] = ( e.target as HTMLInputElement ).value}
         />
      );
   };
export default TextInput;
