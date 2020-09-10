# no-capture-form



<!-- Auto Generated Below -->


## Dependencies

### Used by

 - [page-search](../page-search)

### Depends on

- ptp-info-poll-worker
- address-input

### Graph
```mermaid
graph TD;
  no-capture-form --> ptp-info-poll-worker
  no-capture-form --> address-input
  ptp-info-poll-worker --> ptp-info-jurisdiction
  ptp-info-poll-worker --> ptp-info-state
  ptp-info-jurisdiction --> loading-spinner
  ptp-info-state --> loading-spinner
  address-input --> possibly-hidden-select
  page-search --> no-capture-form
  style no-capture-form fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


