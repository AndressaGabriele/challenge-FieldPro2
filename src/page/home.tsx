import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent } from '@mui/material';
import '../../App.css'
import GrowthStage from '../components/GrowthStage';


interface DataItem {
    accum_rainfall: number;
    degree_days: number;
    time: number;
    precipitation: number;
    ndvi: number;
}

const Home: React.FC = () => {
    const [data, setData] = useState<DataItem[]>([]);
    const [page, setPage] = useState({ skip: 0, limite: 5 })
    const [darkMode, setDarkmode] = useState(false)


    const pagination = (skip: number, limite: number) => {
        return data.slice(skip, skip + limite)
    }

    const chartData = pagination(page.skip, page.limite)
    const limiteOption = [5, 10, 15, 20]

    const toggleDarkMode = () => {
        setDarkmode(!darkMode)
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://raw.githubusercontent.com/alexanderboliva/test/main/api_example.json');
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <header className='App-header'>
                <h1>Growth Stage App</h1>
            </header>
            <main>
                {data.length > 0 && <GrowthStage data={chartData} />}
            </main>
            <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                <Pagination color='secondary' count={Math.round(data.length / page.limite)} onChange={(e, v) => setPage({ ...page, skip: +v })} />
                <div>
                    <FormControl sx={{ m: 1, minWidth: 80, }}>
                        <InputLabel id="inputLabel" color='secondary'>Age</InputLabel>
                        <Select
                            name="skip"
                            label="skip"
                            color='secondary'
                            value={String(page.skip)}
                            id="option"
                            onChange={(e: SelectChangeEvent) => setPage({ ...page, limite: +e.target.value, skip: parseInt(e.target.value)})}
                            >
                            {
                                limiteOption.map((option) => (

                                    <MenuItem key={option} value={(option)}>{option}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </div>
            </div>
        </div>
    );
};

export default Home;
