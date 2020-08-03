import { h } from "@stencil/core";

import { Jurisdiction, State as StateType } from "./types";

interface Props {
   info: StateType;
   jurisdictions: Array<Jurisdiction>;
}

const WorkElectState = ({ info, jurisdictions }: Props) => (
   <div>
      <h2>{ info.name }</h2>
      <div class="jurisdictions">
      {jurisdictions.map(({id, name}) => (
            <a href={`https://workelections.com/jurisdictions/${id}/${name.split(" ").join("-")}`}
               target="_blank">{name}</a>
       ))}
      </div>
   </div>
);

export default WorkElectState;
