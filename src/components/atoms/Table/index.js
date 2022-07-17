import { IconButton, MenuItem, Select } from "@material-ui/core";
import React, { useMemo } from "react";
import {
  useTable,
  usePagination,
  useBlockLayout,
  useFilters,
  useGroupBy,
  useExpanded,
} from "react-table";
import { COLUMNS } from "./column";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useSticky } from "react-table-sticky";
import { Styles } from "./TableStyles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

export const Table = (props) => {
  const data = props?.data ?? [];
  const columns = useMemo(() => COLUMNS, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGroupBy,
    useExpanded,
    usePagination,
    useBlockLayout,
    useSticky
  );

  return (
    <>
      <div style={{ width: 1215 }}>
        <Styles>
          <div
            {...getTableProps()}
            className="table sticky"
            style={{ width: 1215, height: 500 }}
          >
            <div className="header">
              {headerGroups.map((headerGroup) => (
                <div {...headerGroup.getHeaderGroupProps()} className="tr">
                  {headerGroup.headers.map((column) => (
                    <div {...column.getHeaderProps()} className="th">
                      {column.render("Header")}
                      {column.canFilter ? column.render("Filter") : null}
                      {column.canGroupBy ? (
                        <span {...column.getGroupByToggleProps()}>
                          <div style={{ padding: "4px 0px" }}>
                            {column.isGrouped ? (
                              <button>individual</button>
                            ) : (
                              <button>aggregate</button>
                            )}
                          </div>
                        </span>
                      ) : null}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div {...getTableBodyProps()} className="body">
              {page?.map((row) => {
                prepareRow(row);
                return (
                  <div {...row.getRowProps()} className="tr">
                    {row.cells.map((cell) => (
                      <div {...cell.getCellProps()} className="td">
                        {cell.isGrouped ? (
                          <>
                            <span {...row.getToggleRowExpandedProps()}>
                              {row.isExpanded ? (
                                <ExpandLessIcon />
                              ) : (
                                <ExpandMoreIcon />
                              )}
                            </span>{" "}
                            {cell.render("Cell")} ({row.subRows.length})
                          </>
                        ) : cell.isAggregated ? (
                          cell.render("Aggregated")
                        ) : cell.isPlaceholder ? null : (
                          cell.render("Cell")
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </Styles>
        <div style={{ float: "right", padding: "8px" }}>
          <span>Rows per page: </span>
          <Select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[10, 25, 50, 100].map((pageSize) => (
              <MenuItem key={pageSize} value={pageSize}>
                {pageSize}
              </MenuItem>
            ))}
          </Select>
          <span style={{ padding: "24px" }}>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <span>
            <IconButton
              disabled={!canPreviousPage}
              onClick={() => previousPage()}
            >
              <ArrowBackIosIcon style={{ height: "15px", width: "15px" }} />
            </IconButton>
            <IconButton disabled={!canNextPage} onClick={() => nextPage()}>
              <ArrowForwardIosIcon style={{ height: "15px", width: "15px" }} />
            </IconButton>
          </span>
        </div>
      </div>
    </>
  );
};
