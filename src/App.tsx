import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
  IonSplitPane,
  IonMenu,
  IonFooter,
  IonToolbar,
  IonTitle,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import WheelList from './pages/WheelList';
import Settings from './pages/Settings';
import WheelView from './pages/WheelView';

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
import MenuSidebar from './components/MenuSidebar';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonSplitPane when="md" contentId="main-content">
      <IonReactRouter>
        <IonMenu contentId="main-content">
          <MenuSidebar />
        </IonMenu>
        <IonRouterOutlet id="main-content">
          <Route exact path="/wheellist">
            <WheelList />
          </Route>
          <Route exact path="/settings">
            <Settings />
          </Route>
          <Route path="/wheel/:id" >
            <WheelView />
          </Route>  
          <Route exact path="/">
            <Redirect to="/wheellist" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonSplitPane>
  </IonApp>
);

export default App;

export const API_URL = 'http://localhost:8000'