import './App.css'
import DetailsView from './components/DetailsView'
import GridView from './components/GridView'
import Toolbar from './components/Toolbar'
import { useSelector } from 'react-redux'

function App() {
  const { selectedItem } = useSelector((state) => {
    return state.currentItem
})

  return (
    <>
      <div>
        <Toolbar />
        {selectedItem == null ? <GridView />: <DetailsView item={selectedItem}/>}
      </div>
    </>
  )
}

export default App
