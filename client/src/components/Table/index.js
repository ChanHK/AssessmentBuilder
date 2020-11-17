import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import DataTable from "react-data-table-component";
import { withRouter } from "react-router-dom";
import * as configStyles from "../../config/styles";

const customStyles = {
  headCells: {
    style: {
      fontSize: "15px",
      fontFamily: "Ubuntu-Bold",
    },
  },
};

class Table extends Component {
  render() {
    return (
      <DataTable
        columns={this.props.columns}
        data={this.props.data}
        className={css(styles.container, styles.noSelect)}
        highlightOnHover
        persistTableHead
        noHeader
        striped
        responsive
        pagination
        customStyles={customStyles}
        onRowClicked={() => this.props.history.push(this.props.path)}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "auto",
    display: "flex",
    borderRadius: "5px",
    marginBottom: "20px",
    border: "2px solid",
    borderColor: configStyles.colors.black,
  },
  noSelect: {
    userSelect:
      "none" /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */,
    webkitTouchCallout: "none" /* iOS Safari */,
    webkitUserSelect: "none" /* Safari */,
    khtmlUserSelect: "none" /* Konqueror HTML */,
    mozUserSelect: "none" /* Old versions of Firefox */,
    msUserSelect: "none" /* Internet Explorer/Edge */,
  },
});

export default withRouter(Table);

//https://jbetancur.github.io/react-data-table-component/?path=/story/filtering--example-1
