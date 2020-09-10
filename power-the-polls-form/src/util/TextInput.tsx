import { FunctionalComponent, h } from "@stencil/core";

import { PtpFormData } from "./types";

const TextInput: FunctionalComponent<{ data: PtpFormData, field: keyof PtpFormData }> = ( { data, field } ) => {
   return (
      <input
         type="text"
         name={field}
         value={data[field]}
         onInput={e => data[field] = ( e.target as HTMLInputElement ).value}
      />
   );
};
export default TextInput;
