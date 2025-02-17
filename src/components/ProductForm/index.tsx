import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography, MenuItem } from '@mui/material';
import ProductService from '../../services/ProductService';
import ProductTypeService from '../../services/ProductTypeService';

interface Product {
  name: string;
  type_id: number|null;
  price: number;
}

interface ProductType {
  id: number;
  type: string;
  tax: number;
}

const ProductForm: React.FC = () => {
  const [product, setProduct] = useState<Product>({ name: '', type_id: null, price: 0 });
  const [products, setProducts] = useState<Product[]>([]);
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (product.name && product.type_id && !isNaN(product.price)) {
      const response = await ProductService.create(product);
      if(!response.error){
        setProduct({ name: '', type_id: null, price: 0 });
        const productList = await ProductService.list();
        setProducts(productList.data);
      }

      
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  };

  useEffect(() => {
    (async () => {
       const productList = await ProductService.list();
       setProducts(productList.data);

       const productTypeList = await ProductTypeService.list();
       setProductTypes(productTypeList.data);

    })();
  }, [])

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        Cadastro de Produtos
      </Typography>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <TextField
          label="Nome do Produto"
          name="name"
          value={product.name}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          select
          label="Tipo de Produto"
          name="type_id"
          value={product.type_id}
          onChange={handleChange}
          fullWidth
          required
        >
          {productTypes.map((type, index) => (
            <MenuItem key={index} value={type.id}>
              {type.type}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Preço (R$)"
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          fullWidth
          required
        />

        <Button variant="contained" color="primary" type="submit">
          Cadastrar Produto
        </Button>
      </form>

      {products.length > 0 && (
        <Typography variant="h6" style={{ marginTop: '24px' }}>
          Produtos Cadastrados
        </Typography>
      )}

      <ul>
        {products.map((p, index) => (
          <li key={index}>{`${p.name} - Tipo: ${p.type_id} - Preço: R$ ${parseFloat(p.price).toFixed(2)}`}</li>
        ))}
      </ul>

    </Container>
  );
};

export default ProductForm;
