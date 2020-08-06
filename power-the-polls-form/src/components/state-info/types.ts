export interface State {
   id: number;
   name: string;
   alpha: string;
   pollworker_website?: string;
   is_active: boolean;
   subdivision_name: string;
   notes: string;
   topojson_id: number;
}

export interface Jurisdiction {
   id: number;
   name: string;
}
