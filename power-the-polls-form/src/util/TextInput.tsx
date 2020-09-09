import { FunctionalComponent, h } from "@stencil/core";

import { AdditionalFormData } from "./types";

const TextInput: FunctionalComponent<{ data: AdditionalFormData, field: keyof AdditionalFormData }> = ( { data, field } ) => {
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
