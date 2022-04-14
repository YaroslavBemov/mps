import Home from "../features/home/Home"

import Layout from '../features/layout/Layout'
import NoMatch from '../features/no-match/No-match';
import DepartmentsPage from "../features/department/DepartmentsPage";
import DepartmentPage from "../features/department/DepartmentPage";
import SectorsPage from "../features/sector/SectorsPage";
import SectorPage from "../features/sector/SectorPage";
import ProductsPage from "../features/product/ProductsPage";
import ProductPage from "../features/product/ProductPage";
import BaseMTPPage from '../features/base-mtp/BaseMTPPage'
import BaseMTPsPage from '../features/base-mtp/BaseMTPsPage'
import BaseProceduresPage from "../features/base-procedure/BaseProceduresPage";
import BaseProcedurePage from "../features/base-procedure/BaseProcedurePage";
import OrdersPage from "../features/order/OrdersPage";
import OrderPage from "../features/order/OrderPage";
import MtpPage from "../features/mtp/MtpPage";
import MtpsPage from "../features/mtp/MtpsPage";
import ProcedurePage from "../features/procedure/ProcedurePage";
import ProceduresPage from "../features/procedure/ProceduresPage";
import WorkerPage from "../features/worker/WorkerPage";
import WorkersPage from "../features/worker/WorkersPage";
import ProcessPage from "../features/process/ProcessPage";
import ProcessesPage from "../features/process/ProcessesPage";

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: 'products/:id',
        element: <ProductPage />
      },
      {
        path: 'departments',
        element: <DepartmentsPage />,
      },
      {
        path: 'departments/:id',
        element: <DepartmentPage />
      },
      {
        path: 'sectors',
        element: <SectorsPage />,
      },
      {
        path: 'sectors/:id',
        element: <SectorPage />
      },
      {
        path: 'base-mtps',
        element: <BaseMTPsPage />,
      },
      {
        path: 'base-mtps/:id',
        element: <BaseMTPPage />
      },
      {
        path: 'base-procedures',
        element: <BaseProceduresPage />,
      },
      {
        path: 'base-procedures/:id',
        element: <BaseProcedurePage />
      },
      {
        path: 'orders',
        element: <OrdersPage />,
      },
      {
        path: 'orders/:id',
        element: <OrderPage />
      },
      {
        path: 'mtps',
        element: <MtpPage />,
      },
      {
        path: 'mtps/:id',
        element: <MtpsPage />
      },
      {
        path: 'procedures',
        element: <ProcedurePage />,
      },
      {
        path: 'procedures/:id',
        element: <ProceduresPage />
      },
      {
        path: 'workers',
        element: <WorkerPage />,
      },
      {
        path: 'workers/:id',
        element: <WorkersPage />
      },
      {
        path: 'processes',
        element: <ProcessPage />,
      },
      {
        path: 'processes/:id',
        element: <ProcessesPage />
      }
    ]
  },
  {
    path: '*',
    element: <NoMatch />
  }
]
