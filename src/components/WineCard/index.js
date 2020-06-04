import * as React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'antd';
import { Link } from 'react-router-dom';
import { EyeOutlined } from '@ant-design/icons';

const { Meta } = Card;
function WineCard({ wine }) {

    return (
        <Card
            style={{ width: '100%', maxWidth: 300, margin: '10px auto' }}
            actions={[
                <Link to={`/wine/${wine.lotCode}`} ><EyeOutlined /></Link>,
            ]}
        >
            <Meta
                title={wine.lotCode}
                description={wine.description}
            />

        </Card>
    );
}
export default WineCard;

WineCard.propTypes = {

};