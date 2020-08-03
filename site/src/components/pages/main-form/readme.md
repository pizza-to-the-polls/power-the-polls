# main-form



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute                | Description                                                           | Type                  | Default     |
| --------------------- | ------------------------ | --------------------------------------------------------------------- | --------------------- | ----------- |
| `smartyStreetsApiKey` | `smarty-streets-api-key` | The API key to access SmartyStreets which is used for address lookup. | `string \| undefined` | `undefined` |


## Dependencies

### Depends on

- [power-the-polls-form](../../power-the-polls-form)

### Graph
```mermaid
graph TD;
  main-form --> power-the-polls-form
  power-the-polls-form --> work-elections-info
  power-the-polls-form --> address-input
  power-the-polls-form --> stencil-route-link
  style main-form fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


