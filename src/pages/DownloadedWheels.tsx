import { IonButtons, IonContent, IonHeader, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import { useEffect, useState } from "react"
import { Wheel } from "../Types"
import PlayerControls from "../components/PlayerControls"
import { WheelListItem } from "../components/ListItem"
import { useDownloadedWheels } from "../components/hooks/DownloadedWheelsProvider"
import { Link } from "react-router-dom"

const DownloadedWheels: React.FC = () => {
  const [wheels, setWheels] = useState<Wheel[]>([])

  const downloadedWheelsContext = useDownloadedWheels()!

  useEffect(() => {
    getWheels()
  }, [downloadedWheelsContext.reactiveValue])

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
      {wheels.length != 0 ? <IonList lines="none" className="wheellist">
        {
          wheels.map((data) => {
            return <WheelListItem key={wheels.indexOf(data)} wheel={data} length={data.wheel_time} />
          })
        }
      </IonList>
        :
        <div className="ion-justify-content-center ion-text-center" style={{ width: "100%" }}>
          <h3>No Wheels Downloaded!</h3>
          <p>Go download some wheels on the <Link to="/wheellist">Find Wheels</Link> page, and they'll appear here.</p>
          <p>Downloaded wheels are saved locally onto your device, for offline listening.</p>
        </div>
      }
    </IonContent>
    <PlayerControls />
  </IonPage>
};

export default DownloadedWheels;
