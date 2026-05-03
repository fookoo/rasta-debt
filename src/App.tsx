import { Dashboard } from './components/Dashboard/Dashboard'
import { AppThemeProvider } from './theme/AppThemeProvider'

const App = () => (
  <AppThemeProvider>
    <Dashboard />
  </AppThemeProvider>
)

export default App
