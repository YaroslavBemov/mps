import React, { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import Title from "./Title";
import { useStore } from "../../hooks/useStore";
import { observer } from "mobx-react-lite";

function Chart() {
  const { productionStore, authStore } = useStore();
  const theme = useTheme();

  useEffect(() => {
    productionStore.getTodayProduction();
  }, [authStore.roleId]);

  return (
    <React.Fragment>
      <Title>Today Production</Title>
      <ResponsiveContainer>
        <LineChart
          data={productionStore.todayProduction}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Products
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

export default observer(Chart);
