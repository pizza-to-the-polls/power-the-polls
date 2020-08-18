# no-capture-form



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute                | Description                                                           | Type                  | Default     |
| --------------------- | ------------------------ | --------------------------------------------------------------------- | --------------------- | ----------- |
| `smartyStreetsApiKey` | `smarty-streets-api-key` | The API key to access SmartyStreets which is used for address lookup. | `string \| undefined` | `undefined` |


## Dependencies

### Used by

 - [page-search](../page-search)

### Depends on

- poll-worker-info
- address-input

### Graph
```mermaid
graph TD;
  no-capture-form --> poll-worker-info
  no-capture-form --> address-input
  poll-worker-info --> jurisdiction-info
  poll-worker-info --> state-info
  jurisdiction-info --> loading-spinner
  state-info --> loading-spinner
  address-input --> possibly-hidden-select
  page-search --> no-capture-form
  style no-capture-form fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


