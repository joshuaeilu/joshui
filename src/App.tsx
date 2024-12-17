import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
  IonSplitPane,
  IonMenu,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import WheelList from './pages/WheelList';
import Settings from './pages/Settings';
import WheelView from './pages/WheelView';
import UserProfile from './pages/UserProfile'
import Menu from './components/Menu';
import SavedWheels from './pages/SavedWheels';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import AppUrlListener from './components/AppUrlListener';
import Home from './pages/Home';
import Support from './pages/Support';

setupIonicReact();

const App = () => (
  <IonApp>
    <IonSplitPane when="md" contentId="main-content">
      <IonReactRouter>
        <AppUrlListener />
        <IonMenu contentId="main-content">
          <Menu />
        </IonMenu>
        <IonRouterOutlet id="main-content">
          <Route exact path="/">
            <Redirect to="/homepage" />
          </Route>
          <Route exact path="/homepage">
            <Home />
          </Route>
          <Route exact path="/downloaded">
            <SavedWheels />
          </Route>
          <Route exact path="/wheellist">
            <WheelList />
          </Route>
          <Route exact path="/settings">
            <Settings />
          </Route>
          <Route path="/wheel/:id" >
            <WheelView />
          </Route>
          <Route path="/user/:username" >
            <UserProfile />
          </Route>
          <Route exact path="/support">
            <Support />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonSplitPane>
  </IonApp>
);

export default App;

export const API_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'https://api-new.prayerwheel.coveredministries.com'
