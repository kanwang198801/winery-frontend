import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import { LoadingOutlined } from '@ant-design/icons';
import Theme from '../components/Theme';
import WineCard from '../components/WineCard';
import Search from '../components/Search';
import MockData from '../data/mockData.json';

function Wines() {
   const [loading, setLoading] = useState(true);
   const [wines, setWines] = useState([]);
   const [searchInput, setSearchInput] = useState('');

   let filteredWines;
   const onSearchChange = (event) => {
      setSearchInput(event.target.value);
   };
   useEffect(() => {
      setWines(MockData);
      setLoading(false);
   }, []);

   if (searchInput) {
      filteredWines = wines.filter((wine) => {
         const lotCode = wine.lotCode.toString();
         const description = wine.description
            ? wine.description.toString()
            : '';
         return (
            lotCode.toLowerCase().includes(searchInput.toLowerCase()) ||
            description.toLowerCase().includes(searchInput.toLowerCase())
         );
      });
   } else {
      filteredWines = wines;
   }

   return (
      <Theme>
         <Helmet>
            <title>Wines</title>
            <meta name='description' content='Wines' />
         </Helmet>
         <h1>Wines List</h1>
         <Search
            onSearchChange={onSearchChange}
            placeholder='Search wines by name or description'
         />
         {!loading ? (
            wines.length > 0 && (
               <Row gutter={[16, 16]}>
                  {filteredWines.map((wine) => (
                     <Col xs={24} lg={8}>
                        <WineCard wine={wine} />
                     </Col>
                  ))}
               </Row>
            )
         ) : (
            <LoadingOutlined style={{ fontSize: '36px' }} />
         )}
      </Theme>
   );
}

export default Wines;
