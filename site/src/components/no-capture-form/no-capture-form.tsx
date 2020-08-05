import { Component, h, Host, State } from "@stencil/core";

/**
 * Component to render local info about how to be a poll worker.
 */
@Component({
  tag: "no-capture-form",
  styleUrl: "no-capture-form.scss",
  shadow: false,
})
export class NoCaptureForm {

  @State() private state?: string;
  @State() private county?: string;
  @State() private city?: string;


  public render() {
    const submitForm = ( e: Event ) => {
       const form = e.target as HTMLFormElement;

       const [city, county, state] = ["city", "action_county", "state"].map(attr => {
          const input = form.querySelector(`[name=${attr}]`) as HTMLFormElement;
          return input ? input.value : null;
       });

       this.city = city || undefined;
       this.county = county || undefined;
       this.state = state || undefined;

       e.preventDefault();
       return false;
    };

    return (
      <Host>
         {this.state
            ? (<poll-worker-info state={this.state} county={this.county} city={this.city} />)
            : (<form onSubmit={submitForm}>
                     <address-input
                        showStateSelect={false}
                        smartyStreetsApiKey={process.env.SMARTY_STREETS_KEY} />

                     <button type="submit" class="button" >Find My Polling Place</button>
               </form>) }
      </Host>
    );
  }

}
