import React, { useState } from 'react';

import axios from 'axios';

import './style.css';

import Swal from 'sweetalert2';

const Home = () => {
  const [searchItems, setSearchItems] = useState('');
  const [products, setProducts] = useState([]);

  const handleChange = (e) => {
    setSearchItems(e.target.value);
  };

  const getItems = async () => {
    try {
      const { data } = await axios.get(`/autocomplete/${searchItems}`);
      if (data.items.length === 0) {
        Swal.fire({
          text: 'Não temos esse produto no momento.',
          icon: 'warning',
        });
      }
      console.log(data.items);
      setProducts(data.items);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <main className='container'>
        <div className='content'>
          <input
            placeholder='Pesquise por um produto'
            onChange={handleChange}
            value={searchItems}
            className='search-input'
          />
          <button className='search-buttom' onClick={() => getItems()}>
            Buscar
          </button>
          {products.map((product) => (
            <div className='product' key={product.map.id[0]}>
              <span className='content-product'>
                <strong>Nome:</strong>
                {product.map.name.slice(-1)}
              </span>
              <span className='content-product'>
                <strong>Preço:</strong>
                {product.map.salePrice.slice(-1)}
              </span>
              {product.map.uri && (
                <a
                  className='content-product button'
                  href={`https://store.omelete.com.br${product.map.uri?.slice(
                    -1
                  )}`}
                  target='_blank'
                  rel='noreferrer'
                >
                  <strong>Ver no site</strong>
                </a>
              )}
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
