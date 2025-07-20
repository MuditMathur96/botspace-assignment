
import { CssBaseline } from '@mui/material'
import './App.css'
import AppLayout from './components/layout'
import ApplicationProvider from './store/app-context';
import Preview from './components/preview/preview';


function App() {
 

  return (
    <>
    <ApplicationProvider>
      <CssBaseline />
      <AppLayout>
        <Preview />
      </AppLayout>      
    </ApplicationProvider>
    </>
  )
}

export default App
