import { h } from "@stencil/core";
import { Components } from "@stencil/router";
import { FunctionalComponent } from "@stencil/router/dist/types/stencil.core";

export type PtpLinkProps = Partial<Components.StencilRouteLink> & {
   /**
    * The rooted relative path to link to. Will have "https://powerthepolls.org" added if hosted ofd-site
    */
   path?: string;
};

/**
 * Decides whether to generate `stencil-route-link` or `a` for each link based on whether or not
 * the form is hosted on powerthepolls.org
 */
export const PtpLink: FunctionalComponent<PtpLinkProps> = ( { path, ...props }, children ) => {
   const isPtpDotOrg = window.location.hostname === "powerthepolls.org" || window.location.hostname === "localhost";
   return isPtpDotOrg ? (
      <stencil-route-link url={path} {...props}>{children}</stencil-route-link>
   ) : (
         <a href={"https://powerthepolls.org" + path} target="_blank" {...props}>{children}</a >
      );
};
