import * as React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';

function WineCard({ dataSource }) {
    return (
        <>
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
                dataSource={dataSource}
                renderItem={item => (
                    <List.Item key={item.key}>
                        {item.key} -  {item.percentage}%
                    </List.Item>
                )}
            />
        </>
    );
}
export default WineCard;

WineCard.propTypes = {
    dataSource: PropTypes.array.isRequired,
};