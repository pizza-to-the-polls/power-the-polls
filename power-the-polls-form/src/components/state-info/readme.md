# state-info



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute  | Description                | Type                  | Default     |
| --------- | ---------- | -------------------------- | --------------------- | ----------- |
| `state`   | `state`    | State abbreviation         | `string \| undefined` | `undefined` |
| `stateId` | `state-id` | State id in work elections | `null \| number`      | `null`      |


## Dependencies

### Used by

 - [poll-worker-info](../poll-worker-info)

### Depends on

- [loading-spinner](../loading-spinner)

### Graph
```mermaid
graph TD;
  state-info --> loading-spinner
  poll-worker-info --> state-info
  style state-info fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


