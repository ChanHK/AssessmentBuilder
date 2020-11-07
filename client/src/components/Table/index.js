import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import TableButton from "../../components/TableButton";
import DataTable from "react-data-table-component";
import CustomRow from "../../components/GridComponents/CustomRow";
import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";
import { withRouter } from "react-router-dom";

const customStyles = {
  headCells: {
    style: {
      fontSize: "20px",
      fontFamily: "Ubuntu-Bold",
    },
  },
};

class Table extends Component {
  render() {
    const questionColumn = [
      {
        name: "#",
        selector: "id",
        cell: (row) => (
          <div>
            <div style={{ fontSize: "15px", fontFamily: "Ubuntu-Regular" }}>
              {row.id}
            </div>
          </div>
        ),
        width: "20px",
      },
      {
        name: "Question Description",
        selector: "qd",
        cell: (row) => (
          <div>
            <div
              style={{
                fontSize: "15px",
                fontFamily: "Ubuntu-Regular",
              }}
            >
              {row.qd}
            </div>
          </div>
        ),
        sortable: true,
        width: "500px",
      },
      {
        name: "Question Type",
        selector: "qt",
        cell: (row) => (
          <div>
            <div style={{ fontSize: "15px", fontFamily: "Ubuntu-Regular" }}>
              {row.qt}
            </div>
          </div>
        ),
        sortable: true,
        width: "200px",
      },
      {
        name: "Options",
        selector: "opt",
        // right: "true",
        cell: (row) => (
          <CustomRow>
            <TableButton
              onClick={() => {
                this.props.history.push(`questionbank/editQuestion`);
              }}
            >
              <MdIcons.MdModeEdit />
            </TableButton>
            <TableButton>
              <MdIcons.MdDelete />
            </TableButton>
            <TableButton
              onClick={() => {
                this.props.history.push(this.props.path);
              }}
            >
              <BsIcons.BsFillEyeFill />
            </TableButton>
          </CustomRow>
        ),
        width: "180px",
      },
    ];
    return (
      <DataTable
        columns={
          this.props.columns === "questionColumn" ? questionColumn : null
        }
        data={this.props.data}
        className={css(styles.container, styles.noSelect)}
        highlightOnHover
        persistTableHead
        noHeader
        striped
        responsive
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
    border: "2px solid black",
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
