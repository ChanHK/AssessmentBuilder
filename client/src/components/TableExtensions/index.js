import React from "react";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { StyleSheet, css } from "aphrodite";

const TableExtensions = (props) => (
  <DataTableExtensions
    {...props.tableData}
    filter={false}
    exportHeaders={true}
    export={true}
    print={false}
    className={css(styles.style)}
  >
    {props.children}
  </DataTableExtensions>
);

const styles = StyleSheet.create({
  style: {
    marginBottom: "50px",
  },
});

export default TableExtensions;
