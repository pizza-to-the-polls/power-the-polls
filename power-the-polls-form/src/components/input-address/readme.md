# input-address

<!-- Auto Generated Below -->


## Events

| Event    | Description | Type                                    |
| -------- | ----------- | --------------------------------------- |
| `lookup` |             | `CustomEvent<"COMPLETED" \| "STARTED">` |


## Methods

### `state() => Promise<"STARTED" | "COMPLETED">`



#### Returns

Type: `Promise<"STARTED" | "COMPLETED">`




## Dependencies

### Used by

 - [power-the-polls-form](../power-the-polls-form)

### Depends on

- [input-possibly-hidden-select](../input-possibly-hidden-select)

### Graph
```mermaid
graph TD;
  input-address --> input-possibly-hidden-select
  power-the-polls-form --> input-address
  style input-address fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


