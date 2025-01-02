import { IonButtons, IonContent, IonHeader, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import { useEffect, useState } from "react"
import { Wheel } from "../Types"
import PlayerControls from "../components/PlayerControls"
import { WheelListItem } from "../components/ListItem"
import { useDownloadedWheels } from "../components/hooks/DownloadedWheelsProvider"

const DownloadedWheels: React.FC = () => {
  const [wheels, setWheels] = useState<Wheel[]>([])

  const downloadedWheelsContext = useDownloadedWheels()!

  useEffect(() => {
    getWheels()
  }, [])

  const getWheels = async () => {
    const wheels = await downloadedWheelsContext.retrieveWheels()
    setWheels(wheels)
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
