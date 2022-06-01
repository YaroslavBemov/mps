import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Title from "./Title";
import { useStore } from "../../hooks/useStore";

function Orders() {
  const { productionStore } = useStore();

  useEffect(() => {
    productionStore.getRecentProcesses();
  }, []);

  return (
    <React.Fragment>
      <Title>Recent Processes</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Sector</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productionStore.recentProcesses.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.sector}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.product}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

export default observer(Orders);
