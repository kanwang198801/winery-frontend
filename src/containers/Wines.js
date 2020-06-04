import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { message, Button, Input, Divider } from 'antd';
import 'antd/dist/antd.css';
import { EyeOutlined, LoadingOutlined } from '@ant-design/icons';
import Theme from "../components/Theme";
import WineCard from "../components/WineCard";
import MockData from "../data/mockData.json";

function Wines() {
    const [loading, setLoading] = useState(true);
    const [wines, setWines] = useState([]);
    useEffect(() => {
        setWines(MockData);
        setLoading(false);
    }, []);
    return (
        <Theme>
            <Helmet>
                <title>Wines</title>
                <meta name="description" content="Wines" />
            </Helmet>
            <Divider>Wines List</Divider>

            {!loading ?
                wines.length > 0 &&
                wines.map(wine =>
                    (
                        <WineCard wine={wine} />
                    )
                )
                :
                <LoadingOutlined style={{ fontSize: '36px' }} />
            }
        </Theme >
    );
}

export default Wines;