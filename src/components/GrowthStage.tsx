import React, { useEffect } from 'react';
import * as echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/grid';

interface DataItem {
    degree_days: number;
    time: number;
    precipitation: number;
    ndvi: number;
}

interface Props {
    data: DataItem[];
}

const GrowthStage: React.FC<Props> = ({ data }) => {
    useEffect(() => {
        const chart = echarts.init(document.getElementById('growth-chart') as HTMLDivElement);

        const time = data.map(item => item.time);
        const degreeDays = data.map(item => item.degree_days);
        const precipitation = data.map(item => item.precipitation);
        const ndvi = data.map(item => item.ndvi);

        const maxDegreeDays = Math.max(...degreeDays);

        chart.setOption({
            color: [ 
                '#f19759 ', 
            ],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '9%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
            },
            legend: {
                data: ['Degree Days', 'Precipitation', 'NDVI'],
                textStyle: {
                    fontSize: 14
                }
            },
            xAxis: [{
                type: 'category',
                data: time,
                axisLabel: {
                    fontSize: 12
                }
            }],
            yAxis: [
                {
                    type: 'value',
                    name: 'Accumulated Rainfall (mm)',
                    min: 0,
                    max: maxDegreeDays,
                    interval: 5,
                    axisLabel: {
                        fontSize: 12,
                        formatter: '{value} mm'
                    }
                },
                {
                    type: 'value',
                    name: 'Temperature (°C)',
                    min: 0,
                    max: 50,
                    interval: 5,
                    axisLabel: {
                        fontSize: 12,
                        formatter: '{value} °C'
                    }
                },
                {
                    min: 0,
                    max: 2,
                    interval: 5,
                    axisLabel: {
                        fontSize: 12,
                        formatter: '',
                    }

                },
            ],
            series: [
                {
                    name: 'Degree Days',
                    type: 'bar',
                    barWidth: 40,
                    symbol: 'none',
                    barCategoryGap: '5',
                    smooth: true,
                    yAxisIndex: 0,
                    data: degreeDays,
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                          { offset: 0, color: 'rgb(131,175,226)' },
                          { offset: 0.5, color: 'rgb(130,174,226)' },
                          { offset: 1, color: 'rgb(48,112,166)' }
                        ])
                      },
                },
                {
                    name: 'Precipitation',
                    type: 'line',
                    symbol: 'none',
                    stack: 'x',
                    smooth: true,
                    yAxisIndex: 1,
                    data: precipitation,
                    encode: {
                      x: 'Year',
                      y: 'Income',
                      itemName: 'Year',
                      tooltip: ['Income']
                    }

                },
                {
                    name: 'NDVI',
                    type: 'line',
                    yAxisIndex: 2,
                    symbol: 'none',
                    data: ndvi,
                    lineStyle: {
                        type: 'dashed',
                        width: 2
                    },
                    areaStyle: {},
                    smooth: 0.5,
                    markLine: {
                        symbol: ['none', 'none'],
                        label: { show: false },
                        data: [{ xAxis: 1 }, { xAxis: 3 }, { xAxis: 5 }, { xAxis: 7 }]
                    },
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                          { offset: 0, color: 'rgb(174,228,188)' },
                          { offset: 0.5, color: 'rgb(192,233,203)' },
                          { offset: 1, color: 'rgb(240,250,243)' }
                        ])
                      },
                },
            ]
        });

        window.addEventListener('resize', () => {
            chart.resize();
        });

        return () => {
            chart.dispose();
            window.removeEventListener('resize', () => {
                chart.resize();
            });
        };
    }, [data]);

    return <div id="growth-chart" style={{ width: '100%', height: '400px', }} />;
};

export default GrowthStage;
