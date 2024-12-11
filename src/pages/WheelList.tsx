import { IonButtons, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonList, IonMenuButton, IonPage, IonRow, IonSpinner, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { useEffect, useState } from 'react';
import { ResolvedWheel, Wheel } from '../Types';
import { API_URL } from '../App'
import PlayerControls from '../components/PlayerControls';
import { resolvedWheelToWheel, WheelListItem } from '../components/ListItem';
import { search } from 'ionicons/icons';
import { Storage } from '@ionic/storage';
import useNetworkConnectivity from '../components/hooks/UseNetworkConnectivity';

const WheelList: React.FC = () => {
  const [wheels, setWheels] = useState<Wheel[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)
  const [present] = useIonToast()
  const isConnected = useNetworkConnectivity()

  useEffect(() => { getWheels() }, [])

  const getWheels = async () => {
    if (!isConnected) {
      const storage = new Storage()
      await storage.create()
      const wheelsFromStorage: Wheel[] = await storage.keys().then(keys => {
        return Promise.all(keys.map(async key => resolvedWheelToWheel(await storage.get(key))))
      })
      setWheels(wheelsFromStorage)
      setLoading(false)
      return
    }

    fetch(`${API_URL}/wheels/`).then(response => {
      if (response.ok) {
        response.json().then(json => {
          setWheels(json)
          setLoading(false)
        })
      } else {
        setFailed(true)
      }
    }).catch(() => {
      present({
        message: "Ran into an error while fetching wheels.  Please report this via the support page.",
        duration: 10000,
        position: "top"
      })
      setFailed(true)
    })
  }

  const setFilter = (filter: string) => {
    setSearchTerm(filter)
  }

  return <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>Wheel List</IonTitle>
      </IonToolbar>
    </IonHeader>
    {!failed ? <IonContent fullscreen={true}>
      <IonInput className="ion-padding-horizontal" label="Search Wheels" fill="solid" labelPlacement="floating" placeholder="Enter your search term..." onIonInput={(e) => setFilter((e.target as HTMLIonInputElement).value as string)}>
        <IonIcon slot="start" icon={search} aria-hidden="true" />
      </IonInput>
      {wheels.length != 0 && !loading && <IonList lines="none" className="wheellist">
        {
          wheels.filter((wheel) => wheel.title.includes(searchTerm) || wheel.description.includes(searchTerm)).map((data) => {
            const totalTime = data.steps.reduce(
              (accumulator, currentValue) => accumulator + currentValue.length, 0
            )
            return (
              <WheelListItem key={wheels.indexOf(data)} wheel={data} length={totalTime} />
            )
          })
        }
      </IonList>}
      {wheels.length == 0 && !loading && <IonGrid>
        <IonRow className="ion-margin-bottom">
          <h3 style={{ margin: "auto" }}>No Wheels Available</h3>
        </IonRow>
      </IonGrid>}
      {loading && <IonGrid>
        <IonRow className="ion-margin-bottom">
          <h3 style={{ margin: "auto" }}>Loading Wheels, Please Wait</h3>
        </IonRow>
        <IonRow>
          <IonSpinner style={{ margin: "auto" }} />
        </IonRow>
      </IonGrid>}
    </IonContent> : <IonContent>
      <IonGrid>
        <IonRow className="ion-margin-vertical">
          <h3 style={{ margin: "auto" }}>Failed to fetch wheels.</h3>
        </IonRow>
        <IonRow>
          <p style={{margin: "auto"}}>Please refresh the app and contact support if this happens regularly.</p>
        </IonRow>
      </IonGrid>
    </IonContent>}
    <PlayerControls />
  </IonPage>
};

export default WheelList;
