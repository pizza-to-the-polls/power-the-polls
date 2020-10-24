import { FunctionalComponent, h } from "@stencil/core";

import { PtpFormData } from "./types";

const TextInput: FunctionalComponent<{ data: PtpFormData, field: keyof PtpFormData, initialValue?: string, required?: boolean, onChange?: (e: Event) => void }> =
   ( { data, field, initialValue, required, onChange } ) => {
      return (
         <input
            type="text"
            required={required}
            name={field}
            value={data[field] || initialValue}
            onInput={e => data[field] = ( e.target as HTMLInputElement ).value}
            onChange={onChange}
         />
      );
   };
export default TextInput;
