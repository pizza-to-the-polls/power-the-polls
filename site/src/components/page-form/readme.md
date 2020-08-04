# page-form



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute                | Description                                                           | Type                  | Default     |
| --------------------- | ------------------------ | --------------------------------------------------------------------- | --------------------- | ----------- |
| `smartyStreetsApiKey` | `smarty-streets-api-key` | The API key to access SmartyStreets which is used for address lookup. | `string \| undefined` | `undefined` |


## Dependencies

### Depends on

- [impact-box](../impact-box)
- [power-the-polls-form](../power-the-polls-form)

### Graph
```mermaid
graph TD;
  page-form --> impact-box
  page-form --> power-the-polls-form
  power-the-polls-form --> poll-worker-info
  power-the-polls-form --> address-input
  power-the-polls-form --> stencil-route-link
  poll-worker-info --> jurisdiction-info
  poll-worker-info --> state-info
  style page-form fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


