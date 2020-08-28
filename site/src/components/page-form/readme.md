# page-form



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute                | Description                                                                                                                                                            | Type                  | Default     |
| --------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `partnerId`           | `partner-id`             | Optional partnerId/source parameter to use when submitting the form. If the partnerId exists in `/data/PartnerList.ts` then additional partner data will be looked up. | `string \| undefined` | `undefined` |
| `smartyStreetsApiKey` | `smarty-streets-api-key` | The API key to access SmartyStreets which is used for address lookup.                                                                                                  | `string \| undefined` | `undefined` |


## Dependencies

### Depends on

- power-the-polls-form

### Graph
```mermaid
graph TD;
  page-form --> power-the-polls-form
  power-the-polls-form --> poll-worker-info
  power-the-polls-form --> address-input
  poll-worker-info --> jurisdiction-info
  poll-worker-info --> state-info
  jurisdiction-info --> loading-spinner
  state-info --> loading-spinner
  address-input --> possibly-hidden-select
  style page-form fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


