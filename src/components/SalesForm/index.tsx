import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography, MenuItem } from '@mui/material';
import ProductService from '../../services/ProductService';
import SaleRegistrationService from '../../services/SaleRegistrationService';

interface Product {
  id: any;
  name: string;
  type_id: string;
  price: string;
  tax: string;
}

interface SaleItem {
  product: Product;
  quantity: number;
}

const SalesForm: React.FC = () => {
  const [saleItems, setSaleItems] = useState<SaleItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const [products, setProducts] = useState<Product[]>([]);
 
  const handleAddItem = () => {
    if (selectedProduct && quantity > 0) {
      setSaleItems((prev) => [...prev, { product: selectedProduct, quantity }]);
      console.log({saleItems})

      setSelectedProduct(null);
      setQuantity(1);
    } else {
      alert('Por favor, selecione um produto e uma quantidade válida.');
    }
  };

  const calculateTotal = () => {
    return saleItems.reduce((total, item) => total + parseFloat(item.product.price) * item.quantity, 0).toFixed(2);
  };

  const calculateTotalTax = () => {
    return saleItems
      .reduce((totalTax, item) => totalTax + (parseFloat(item.product.price) * item.quantity * (parseFloat(item.product.tax) / 100)), 0)
      .toFixed(2);
  };

  const handleSubmit = async () => {

    const body: any = {
        items: []
    };

    for(const item of saleItems){
      body.items.push({
        product_id: item.product.id,
        quantity: item.quantity
      });
    }

    const response = await SaleRegistrationService.create(body);
    if(!response.error){
      alert('Venda registrada com sucesso!');
      setSaleItems([]);
    } else {
      alert('Ocorreu um erro ao registrar a venda.');
    }

  }

  useEffect(() => {
      (async () => {
        const productList = await ProductService.list();
        setProducts(productList.data);
      })();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h5" gutterBottom>
        Tela de Venda
      </Typography>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <TextField
          select
          label="Produto"
          value={selectedProduct ? selectedProduct.id : ''}
          onChange={(e) => {
            const product = products.find((p) => p.id === e.target.value);
            setSelectedProduct(product || null);
          }}
          fullWidth
        >
          {products.map((product, index) => (
            <MenuItem key={index} value={product.id}>
              {product.name} - R$ {product.price}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Quantidade"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
          fullWidth
        />

        <Button variant="contained" color="primary" onClick={handleAddItem}>
          Adicionar Item
        </Button>
      </div>

      <Typography variant="h6">Itens da Venda</Typography>
      <ul>
        {saleItems.map((item, index) => (
          <li key={index}>
            {item.product.name} - Quantidade: {item.quantity} - Subtotal: R${' '}
            {(parseFloat(item.product.price) * item.quantity).toFixed(2)} - Imposto: R${' '}
            {parseFloat(item.product.price) * item.quantity * (parseFloat(item.product.tax) / 100)}
          </li>
        ))}
      </ul>

      <Typography variant="h6" style={{ marginTop: '16px' }}>
        Total da Venda: R$ {calculateTotal()}
      </Typography>
      <Typography variant="h6">Total de Impostos: R$ {calculateTotalTax()}</Typography>

      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Button variant="contained" color="primary" style={{ marginTop: '16px' }} onClick={handleSubmit}>
          Finalizar Venda
        </Button>
      </div>
    </Container>
  );
};

export default SalesForm;