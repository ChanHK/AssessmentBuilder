import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import TableButton from "../../components/TableButton";
import DataTable from "react-data-table-component";
import CustomRow from "../../components/GridComponents/CustomRow";
import * as MdIcons from "react-icons/md";
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
        className={css(styles.container)}
        highlightOnHover
        persistTableHead
        noHeader
        striped
        responsive
        customStyles={customStyles}
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
});

export default withRouter(Table);
