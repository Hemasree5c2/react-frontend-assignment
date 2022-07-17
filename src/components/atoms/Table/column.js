import SelectColumnFilter from "../SelectColumnFilter";

export const COLUMNS = [
  {
    Header: "Name",
    accessor: "name",
    sticky: "left",
    Filter: SelectColumnFilter,
    aggregate: "count",
    Aggregated: ({ value }) => `${value} Names`,
  },
  {
    Header: "Batch",
    accessor: "batch",
    sticky: "left",
    Filter: SelectColumnFilter,
    disableGroupBy: true,
    aggregate: "uniqueCount",
    Aggregated: ({ value }) => `All`,
  },
  {
    Header: "Stock",
    accessor: "stock",
    disableFilters: true,
    disableGroupBy: true,
    aggregate: (leafValues) =>
      leafValues?.reduce((acc, next) => parseFloat(acc) + parseFloat(next), 0),
    Aggregated: ({ value }) => `${value}`,
  },
  {
    Header: "Deal",
    accessor: "deal",
    disableFilters: true,
    disableGroupBy: true,
    aggregate: (leafValues) =>
      leafValues?.reduce(
        (acc, next) => Math.min(parseFloat(acc), parseFloat(next)),
        Number.MAX_VALUE
      ),
    Aggregated: ({ value }) => `${value}`,
  },
  {
    Header: "Free",
    accessor: "free",
    disableFilters: true,
    disableGroupBy: true,
    aggregate: (leafValues) =>
      leafValues?.reduce(
        (acc, next) => Math.min(parseFloat(acc), parseFloat(next)),
        Number.MAX_VALUE
      ),
    Aggregated: ({ value }) => `${value}`,
  },
  {
    Header: "MRP",
    accessor: "mrp",
    disableFilters: true,
    disableGroupBy: true,
    aggregate: (leafValues) =>
      leafValues?.reduce(
        (acc, next) => Math.max(parseFloat(acc), parseFloat(next)),
        Number.MIN_VALUE
      ),
    Aggregated: ({ value }) => `${value}`,
  },
  {
    Header: "Rate",
    accessor: "rate",
    disableFilters: true,
    disableGroupBy: true,
    aggregate: (leafValues) =>
      leafValues?.reduce(
        (acc, next) => Math.max(parseFloat(acc), parseFloat(next)),
        Number.MIN_VALUE
      ),
    Aggregated: ({ value }) => `${value}`,
  },
  {
    Header: "Expiry Date",
    accessor: "exp",
    disableFilters: true,
    disableGroupBy: true,
    aggregate: (leafValues) =>
      leafValues?.reduce(
        (acc, next) => (new Date(acc) > new Date(next) ? acc : next),
        new Date()
      ),
    Aggregated: ({ value }) => `${value}`,
  },
];
