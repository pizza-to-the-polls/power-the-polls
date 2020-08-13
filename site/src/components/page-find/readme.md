# page-search



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute                | Description                                                           | Type                  | Default     |
| --------------------- | ------------------------ | --------------------------------------------------------------------- | --------------------- | ----------- |
| `smartyStreetsApiKey` | `smarty-streets-api-key` | The API key to access SmartyStreets which is used for address lookup. | `string \| undefined` | `undefined` |


## Dependencies

### Depends on

- [no-capture-form](../no-capture-form)

### Graph
```mermaid
graph TD;
  page-search --> no-capture-form
  no-capture-form --> poll-worker-info
  no-capture-form --> address-input
  poll-worker-info --> jurisdiction-info
  poll-worker-info --> state-info
  jurisdiction-info --> stencil-route-link
  state-info --> stencil-route-link
  address-input --> possibly-hidden-select
  style page-search fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


