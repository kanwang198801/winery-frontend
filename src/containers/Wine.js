import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { message, Button, Input, Divider } from 'antd';
import 'antd/dist/antd.css';
import { EyeOutlined, LoadingOutlined } from '@ant-design/icons';
import Theme from "../components/Theme";

function Wine() {
    const [loading, setLoading] = useState(true);
    const [wine, setWine] = useState(null);

    return (
        <Theme>
            <Helmet>
                <title>Wines</title>
                <meta name="description" content="Wines" />
            </Helmet>
            <Divider>Wines List</Divider>

            {!loading ?
                <p>Wine</p>
                :
                <LoadingOutlined style={{ fontSize: '36px' }} />
            }
        </Theme >
    );
}

export default Wine;