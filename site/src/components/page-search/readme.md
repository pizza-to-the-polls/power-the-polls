# page-search



<!-- Auto Generated Below -->


## Dependencies

### Depends on

- ptp-info-poll-worker
- address-input

### Graph
```mermaid
graph TD;
  page-search --> ptp-info-poll-worker
  page-search --> address-input
  ptp-info-poll-worker --> ptp-info-jurisdiction
  ptp-info-poll-worker --> ptp-info-state
  ptp-info-jurisdiction --> loading-spinner
  ptp-info-state --> loading-spinner
  address-input --> possibly-hidden-select
  style page-search fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


