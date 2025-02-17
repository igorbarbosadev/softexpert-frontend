// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';
import ProductForm from './components/ProductForm';
import SalesForm from './components/SalesForm';
import ProductTypeForm from './components/ProducTypeForm';

const App: React.FC = () => {
  return (
    <Router>
      <Container maxWidth="md" style={{ marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom style={{textAlign: 'center'}}>
          Sistema de Gestão de Mercado
        </Typography>
       
        {/* Navegação entre páginas */}
        <nav style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" color="primary" component={Link} to="/products" style={{ marginRight: '10px' }}>
            Cadastro de Produtos
          </Button>
          <Button variant="contained" color="secondary" component={Link} to="/product-types" style={{ marginRight: '10px' }}>
            Cadastro de Tipos de Produto
          </Button>
          <Button variant="contained" color="success" component={Link} to="/sales" style={{ marginRight: '10px' }}>
            Tela de Venda
          </Button>         
        </nav>
        <hr />
        <br />
        {/* Definição de rotas */}
        <Routes>
          <Route path="/products" element={<ProductForm />} />
          <Route path="/product-types" element={<ProductTypeForm />} />
          <Route path="/sales" element={<SalesForm />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;

// Estrutura inicial dos componentes (vou criar os arquivos em etapas com forms e lógica para simular vendas e cálculos de impostos).
