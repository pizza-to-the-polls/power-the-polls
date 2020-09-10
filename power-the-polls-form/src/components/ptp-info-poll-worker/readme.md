# work-elections



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute | Description                      | Type                                                                                                                                                                                                                                                                                                                   | Default     |
| ---------- | --------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `city`     | `city`    | City for matching to location    | `string \| undefined`                                                                                                                                                                                                                                                                                                  | `undefined` |
| `county`   | `county`  | County for matching to location  | `string \| undefined`                                                                                                                                                                                                                                                                                                  | `undefined` |
| `formData` | --        | Complete form data, if available | `undefined \| { name?: string \| undefined; city?: string \| undefined; county?: string \| undefined; zip?: string \| undefined; address1?: string \| undefined; state?: string \| undefined; email?: string \| undefined; phone?: string \| undefined; languages?: string \| undefined; age?: string \| undefined; }` | `undefined` |
| `history`  | --        |                                  | `RouterHistory \| undefined`                                                                                                                                                                                                                                                                                           | `undefined` |
| `state`    | `state`   | State for matching to location   | `string \| undefined`                                                                                                                                                                                                                                                                                                  | `undefined` |


## Dependencies

### Used by

 - [power-the-polls-form](../power-the-polls-form)

### Depends on

- [ptp-info-jurisdiction](../ptp-info-jurisdiction)
- [ptp-info-state](../ptp-info-state)

### Graph
```mermaid
graph TD;
  ptp-info-poll-worker --> ptp-info-jurisdiction
  ptp-info-poll-worker --> ptp-info-state
  ptp-info-jurisdiction --> loading-spinner
  ptp-info-state --> loading-spinner
  power-the-polls-form --> ptp-info-poll-worker
  style ptp-info-poll-worker fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


