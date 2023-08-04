'use client'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import store from './redux/store'
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

const ProvidersWrapper = ({ children }) => (
  <Provider store={store} >
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </Provider>
)

export default ProvidersWrapper
