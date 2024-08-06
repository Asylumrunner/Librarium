import DetailsView from './components/DetailsView'
import GridView from './components/GridView'
import Toolbar from './components/Toolbar'
import SearchPage from './components/search/SearchPage'
import { useSelector } from 'react-redux'

function App() {
  const { selectedItem } = useSelector((state) => {
    return state.currentItem
  })

  return (
    <>
      <div className="flex flex-col w-screen">
        <div className="justify-center m-8">
          <Toolbar />
          {selectedItem == null ? <GridView />: <DetailsView item={selectedItem}/>}
        </div>
      </div>
    </>
  )
}

export default App
