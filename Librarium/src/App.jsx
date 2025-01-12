import DetailsView from './components/DetailsView'
import GridView from './components/GridView'
import Toolbar from './components/Toolbar'
import SearchPage from './components/search/SearchPage'
import { useSelector } from 'react-redux'
import { useAuth } from "react-oidc-context";

function App() {
  const auth = useAuth();
  const returnUrl = "/dashboard"
  const { selectedItem } = useSelector((state) => {
    return state.currentItem
  })

  const signOutRedirect = () => {
    const clientId = "6motri9tdloufgqk81niar4rru";
    const logoutUri = "<logout uri>";
    const cognitoDomain = "https://<user pool domain>";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div>
        <pre> Hello: {auth.user?.profile.email} </pre>
        <pre> ID Token: {auth.user?.id_token} </pre>
        <pre> Access Token: {auth.user?.access_token} </pre>
        <pre> Refresh Token: {auth.user?.refresh_token} </pre>
        <div className="flex flex-col w-screen">
          {selectedItem == null ? <GridView />: <DetailsView item={selectedItem}/>}
        </div>
        <button onClick={() => auth.removeUser()}>Sign out</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
      <button onClick={() => signOutRedirect()}>Sign out</button>
    </div>
  )
}

export default App
