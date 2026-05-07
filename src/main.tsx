import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { store } from '@/app/store'
import TasksPage from '@/pages/TasksPage/TasksPage'
import AboutPage from '@/pages/AboutPage/AboutPage'

const router = createBrowserRouter([
  { path: '/', element: <TasksPage /> },
  { path: '/about', element: <AboutPage /> }
])

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
)