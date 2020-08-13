# state-info



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute  | Description                | Type                  | Default     |
| --------- | ---------- | -------------------------- | --------------------- | ----------- |
| `state`   | `state`    | State abrieviation         | `string \| undefined` | `undefined` |
| `stateId` | `state-id` | State id in work elections | `null \| number`      | `null`      |


## Dependencies

### Used by

 - [poll-worker-info](../poll-worker-info)

### Depends on

- [loading-spinner](../loading-spinner)
- stencil-route-link

### Graph
```mermaid
graph TD;
  state-info --> loading-spinner
  state-info --> stencil-route-link
  poll-worker-info --> state-info
  style state-info fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


