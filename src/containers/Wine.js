import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { Descriptions, Divider, List } from 'antd';
import 'antd/dist/antd.css';
import { LoadingOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import Theme from "../components/Theme";
import MockData from "../data/mockData.json";
import { comparePercentage } from "../utils/functions"

function Wine(props) {
    const [loading, setLoading] = useState(true);
    const [wine, setWine] = useState(null);
    const lotCode = props.match.params.lotCode;
    let yearBreakDownData, varietyBreakdownData,
        regionBreakdownData, yearAndVarietyBreakdownData = [];

    useEffect(() => {
        setWine(MockData.find(wine => wine.lotCode === lotCode));
        setLoading(false);
    }, []);

    const getBreakDownData = (lotCode, type, secondType = null) => {
        const searchResult = MockData.find(item => item.lotCode === lotCode);

        let breakdown = [];
        let uniqueKey = [];

        searchResult.components.sort(comparePercentage).forEach(item => {
            if (secondType) {
                if (!uniqueKey.includes(`${item[type]} ${item[secondType]}`)) {
                    breakdown.push({
                        percentage: item.percentage,
                        key: `${item[type]} ${item[secondType]}`,
                    });
                    uniqueKey.push(`${item[type]} ${item[secondType]}`);
                }
            }
            else {
                if (!uniqueKey.includes(`${item[type]}`)) {
                    breakdown.push({
                        percentage: item.percentage,
                        key: `${item[type]}`,
                    });
                    uniqueKey.push(`${item[type]}`);
                }
            }
        });

        const breakdownData = {
            breakdown,
        }
        return breakdownData;
    };

    if (wine) {
        yearBreakDownData = getBreakDownData(lotCode, "year").breakdown;
        varietyBreakdownData = getBreakDownData(lotCode, "variety").breakdown;
        regionBreakdownData = getBreakDownData(lotCode, "region").breakdown;
        yearAndVarietyBreakdownData = getBreakDownData(lotCode, "year", "variety").breakdown;
    }

    return (
        <Theme>
            <Helmet>
                <title>Wines</title>
                <meta name="description" content="Wines" />
            </Helmet>
            <Link to="/"><ArrowLeftOutlined /></Link>
            <h1>Wine Details</h1>
            {!loading ?
                wine ?
                    <>
                        <Divider />
                        <Descriptions title="Wine Information" bordered>
                            <Descriptions.Item label="Lot code"> {wine.lotCode}</Descriptions.Item>
                            {wine.description && <Descriptions.Item label="Product state">{wine.description}</Descriptions.Item>}
                            <Descriptions.Item label="Volume">{wine.volume}</Descriptions.Item>
                            <Descriptions.Item label="Tank">{wine.tankCode}</Descriptions.Item>
                            {wine.productState && <Descriptions.Item label="Product state">{wine.productState}</Descriptions.Item>}
                            <Descriptions.Item label="Owner">{wine.ownerName}</Descriptions.Item>
                        </Descriptions>
                        <Divider />
                        <h3><strong>Year</strong></h3>
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                onChange: page => {
                                    console.log(page);
                                },
                                pageSize: 5,
                                hideOnSinglePage: true
                            }}
                            dataSource={yearBreakDownData}
                            renderItem={item => (
                                <List.Item key={item.key}>
                                    {item.key} -  {item.percentage}%
                                </List.Item>
                            )}
                        />
                        <h3><strong>Variety</strong></h3>
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                onChange: page => {
                                    console.log(page);
                                },
                                pageSize: 5,
                                hideOnSinglePage: true
                            }}
                            dataSource={varietyBreakdownData}
                            renderItem={item => (
                                <List.Item key={item.key}>
                                    {item.key} -  {item.percentage}%
                                </List.Item>
                            )}
                        />
                        <h3><strong>Region</strong></h3>
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                onChange: page => {
                                    console.log(page);
                                },
                                pageSize: 5,
                                hideOnSinglePage: true
                            }}
                            dataSource={regionBreakdownData}
                            renderItem={item => (
                                <List.Item key={item.key}>
                                    {item.key} -  {item.percentage}%
                                </List.Item>
                            )}
                        />
                        <h3><strong>Year + Variety</strong></h3>
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                onChange: page => {
                                    console.log(page);
                                },
                                pageSize: 5,
                                hideOnSinglePage: true
                            }}
                            dataSource={yearAndVarietyBreakdownData}
                            renderItem={item => (
                                <List.Item key={item.key}>
                                    {item.key} -  {item.percentage}%
                                </List.Item>
                            )}
                        />
                    </>
                    : <p>Wine is not found</p>
                : <LoadingOutlined style={{ fontSize: '36px' }} />
            }
        </Theme >
    );
}

export default Wine;