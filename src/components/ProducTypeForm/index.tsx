import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import ProductTypeService from '../../services/ProductTypeService';

interface ProductType {
  type: string;
  tax: string;
}

const ProductTypeForm: React.FC = () => {
  const [productType, setProductType] = useState<ProductType>({ type: '', tax: 0 });
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProductType((prev) => ({
      ...prev,
      [name]: name === 'tax' ? value : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (productType.type && productType.tax) {
      const response = await ProductTypeService.create(productType);
      if(!response.error){
        setProductType({ type: '', tax: '0' });
        const productTypeList = await ProductTypeService.list();
        setProductTypes(productTypeList.data);
      }
      setProductType({ type: '', tax: '0' });
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  };

   useEffect(() => {
      (async () => {
  
         const productTypeList = await ProductTypeService.list();
         setProductTypes(productTypeList.data);
  
      })();
    }, [])

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        Cadastro de Tipos de Produto
      </Typography>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <TextField
          label="Tipo de Produto"
          name="type"
          value={productType.type}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Imposto (%): ex 20"
          name="tax"
          type="text"
          value={productType.tax}
          onChange={handleChange}
          fullWidth
          required
        />
        <Button variant="contained" color="primary" type="submit">
          Cadastrar Tipo de Produto
        </Button>

        <br />

        {productTypes.length > 0 && (
          <Typography variant="h5" gutterBottom>
            Tipos de Produto
          </Typography>
        )}
        <ul>
          {productTypes.map((type, index) => (
            <li key={index}>{`${type.type} - Taxa: ${parseFloat(type.tax).toFixed(2)}%`}</li>
          ))}  
        </ul>
      </form>
    </Container>
  );
};

export default ProductTypeForm;
