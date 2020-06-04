import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { message, Button, Input, Divider } from 'antd';
import 'antd/dist/antd.css';
import { EyeOutlined, LoadingOutlined } from '@ant-design/icons';
import Theme from "../components/Theme";
import MockData from "../data/mockData.json";
import { comparePercentage } from "../utils/functions"

function Wine(props) {
    const [loading, setLoading] = useState(true);
    const [wine, setWine] = useState(null);
    const lotCode = props.match.params.lotCode;

    useEffect(() => {
        setWine(MockData.find(wine => wine.lotCode === lotCode));
        setLoading(false);
    }, []);

    const getBreakDownData = (lotCode, type, secondType = null) => {
        const searchResult = MockData.find(item => item.lotCode === lotCode);

        let breakdown = [];
        let uniqueKey = [];
        searchResult.components.sort(comparePercentage).forEach(item => {
            if (!uniqueKey.includes(`${item[type]} ${item[secondType]}`)) {
                breakdown.push({
                    percentage: item.percentage,
                    key: `${item[type]} ${item[secondType]}`,
                });
                uniqueKey.push(`${item[type]} ${item[secondType]}`);
            }
        });

        const breakdownData = {
            breakdown,
        }
        return breakdownData;
    };

    const yearBreakDownData = getBreakDownData(lotCode, "year").breakdown;
    const varietyBreakdownData = getBreakDownData(lotCode, "variety").breakdown;
    const regionBreakdownData = getBreakDownData(lotCode, "region").breakdown;
    const yearAndVarietyBreakdownData = getBreakDownData(lotCode, "year", "variety").breakdown;
    return (
        <Theme>
            <Helmet>
                <title>Wines</title>
                <meta name="description" content="Wines" />
            </Helmet>
            <h1>Wine Details</h1>
            {!loading ?
                wine ?
                    <>
                        <p><strong>Lot code - </strong>{wine.lotCode}</p>
                        {wine.description && <p><strong>Description - </strong>{wine.description}</p>}
                        <p><strong>Volume - </strong>{wine.volume} ML</p>
                        <p><strong>Tank - </strong>{wine.tankCode}</p>
                        {wine.productState && <p><strong> Product state - </strong>{wine.productState}</p>}
                        <p><strong> Owner - </strong>{wine.ownerName}</p>
                        <p><strong>Year - </strong></p>
                        {yearBreakDownData.map(data =>
                            <>
                                <p>{data.key}</p>
                                <p>Percentage: {data.percentage}</p>
                            </>
                        )}
                        <p><strong>Variety - </strong></p>
                        {varietyBreakdownData.map(data =>
                            <>
                                <p>{data.key}</p>
                                <p>Percentage: {data.percentage}</p>
                            </>
                        )}
                        <p><strong>Region - </strong></p>
                        {regionBreakdownData.map(data =>
                            <>
                                <p>{data.key}</p>
                                <p>Percentage: {data.percentage}</p>
                            </>
                        )}
                        <p><strong>Year + Variety - </strong></p>
                        {yearAndVarietyBreakdownData.map(data =>
                            <>
                                <p>{data.key}</p>
                                <p>Percentage: {data.percentage}</p>
                            </>
                        )}
                    </>
                    :
                    <LoadingOutlined style={{ fontSize: '36px' }} />
                : <p>Wine is not found</p>
            }
        </Theme >
    );
}

export default Wine;