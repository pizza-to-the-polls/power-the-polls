import {Component, h, Prop} from "@stencil/core";

@Component({
   tag: "possibly-hidden-select",
   shadow: false
})
export class PossiblyHiddenSelect {
   @Prop() public fieldLabel: string;
   @Prop() public name: string;
   @Prop() public selected: string;
   @Prop() public options: Map<string, string> | Set<string>;

   constructor() {
      this.fieldLabel = "";
      this.name = "";
      this.selected = "";
      this.options = new Set();
   }

   public render() {
      if (this.options.size <= 1) {
         return <input name={this.name} type="hidden" value={this.selected} />;
      } else {
         return (
            <label>
               { this.fieldLabel }*
               <select name={this.name} required>
                  {
                     [...this.options.entries()].map(([value, label]) =>
                        <option value={value} selected={this.selected === value}>{ label }</option>)
                  }
               </select>
            </label>
         );
      }
   }
}
