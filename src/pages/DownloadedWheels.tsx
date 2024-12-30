import { IonButtons, IonContent, IonHeader, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import { useEffect, useState } from "react"
import { Wheel } from "../Types"
import PlayerControls from "../components/PlayerControls"
import { resolvedWheelToWheel, WheelListItem } from "../components/ListItem"
import { Storage } from "@ionic/storage"
import { useDownloadedWheels } from "../components/hooks/DownloadedWheelsProvider"

const DownloadedWheels: React.FC = () => {
  const [wheels, setWheels] = useState<Wheel[]>([])

  const downloadedWheelsContext = useDownloadedWheels()!
  const downloadedWheels = downloadedWheelsContext.wheelIDs

  useEffect(() => {
    getWheels()
  }, [downloadedWheels])

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
        <IonTitle>Downloaded Wheels</IonTitle>
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
      {wheels.length == 0 && <>{"No wheels downloaded, go download some wheels!"}</>}
    </IonContent>
    <PlayerControls />
  </IonPage>
};

export default DownloadedWheels;
