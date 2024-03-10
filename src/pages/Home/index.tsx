import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import "./styles.css";
import { GrowthStage } from "components";
import { DataItem } from "utils/types/data.type";

export const Home: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [page, setPage] = useState({ skip: 0, limite: 5 });

  const pagination = (skip: number, limite: number) => {
    return data.slice(skip, skip + limite);
  };

  const chartData = pagination(page.skip, page.limite);
  const limiteOption = [5, 10, 15, 20];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/alexanderboliva/test/main/api_example.json"
        );
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <header className="App-header">
        <h1>Growth Stage App</h1>
      </header>
      <main className="main-container">{data.length > 0 && <GrowthStage data={chartData} />}</main>
      <div className="pagination-container">
        <Pagination
          size="small"
          color="secondary"
          count={Math.round(data.length / page.limite)}
          onChange={(e, v) => setPage({ ...page, skip: +v })}
        />
        <div className="form-control-container">
          <FormControl size="small" sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="inputLabel" color="secondary">
              View
            </InputLabel>
            <Select
              name="skip"
              label="skip"
              color="secondary"
              value={String(page.limite)}
              id="option"
              onChange={(e: SelectChangeEvent) =>
                setPage({ ...page, limite: +e.target.value })
              }
            >
              {limiteOption.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
};
