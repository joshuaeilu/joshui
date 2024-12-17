import { IonButtons, IonContent, IonHeader, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonToast } from "@ionic/react"
import { useEffect, useState } from "react"
import { Wheel } from "../Types"
import { API_URL } from "../App"
import PlayerControls from "../components/PlayerControls"
import { resolvedWheelToWheel, WheelListItem } from "../components/ListItem"
import { useSavedWheels } from "../components/hooks/SavedWheelsProvider"
import useNetworkConnectivity from "../components/hooks/UseNetworkConnectivity"
import { Storage } from "@ionic/storage"
const SavedWheels: React.FC = () => {
  const [wheels, setWheels] = useState<Wheel[]>([])
  const [present] = useIonToast();

  const savedWheelsContext = useSavedWheels()!
  const savedWheels = savedWheelsContext.wheelIDs
  const isConnected = useNetworkConnectivity()

  useEffect(() => {
    getWheels()
  }, [savedWheels])

  /**
   * Get wheels from local storage
   */
  const getWheels = async () => {
    const storage = new Storage()
    await storage.create()
    const wheelsFromStorage: Wheel[] = await storage.keys().then(keys => {
      return Promise.all(keys.map(async key => resolvedWheelToWheel(await storage.get(key))))
    })
    setWheels(wheelsFromStorage)
    return
  }

  return <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>Saved Wheels</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen={true}>
      {wheels.length != 0 && <IonList lines="none" className="wheellist">
        {
          wheels.map((data) => {
            return <WheelListItem key={wheels.indexOf(data)} wheel={data} length={data.wheel_time} />
          })
        }
      </IonList>}
      {wheels.length == 0 && <>{"Loading... Do you have any wheels saved?"}</>}
    </IonContent>
    <PlayerControls />
  </IonPage>
};

export default SavedWheels;
