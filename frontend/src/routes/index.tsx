import { Header } from '@/UI/Layout/Header';
import UserWidget from '@/features/user/components/UserWidget';
import HomePage from '@/routes/Home/HomePage';
import ProductsPage from '@/routes/Products/ProductPage';

import { useRoutes } from 'react-router-dom';

export function AppRoutes() {
  const routes = [
    {
      path: '*',
      element: <ProductsPage />,
    },
 
  ];

  const element = useRoutes([...routes]);

  return (
    <>
      <Header
       
        
        
      />
      {element}
    </>
  );
}
