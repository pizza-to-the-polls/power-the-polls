# jurisdiction-info



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                            | Type                                                                                                                                                                                                                                                                                   | Default     |
| ---------------- | ----------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `addtl`          | --                | Props possibly passed in from the form | `undefined \| { name?: string \| undefined; city?: string \| undefined; county?: string \| undefined; zip?: string \| undefined; state?: string \| undefined; email?: string \| undefined; phone?: string \| undefined; languages?: string \| undefined; age?: string \| undefined; }` | `undefined` |
| `jurisdictionId` | `jurisdiction-id` | ID of jurisdiction for Work Elections  | `number \| string \| undefined`                                                                                                                                                                                                                                                        | `undefined` |


## Dependencies

### Used by

 - [poll-worker-info](../poll-worker-info)

### Depends on

- [loading-spinner](../loading-spinner)
- stencil-route-link

### Graph
```mermaid
graph TD;
  jurisdiction-info --> loading-spinner
  jurisdiction-info --> stencil-route-link
  poll-worker-info --> jurisdiction-info
  style jurisdiction-info fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


