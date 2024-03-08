import { IonButtons, IonContent, IonHeader, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import { useEffect, useState } from "react"
import { SavedWheelsModel, Wheel } from "../Types"
import { API_URL } from "../App"
import PlayerControls from "../components/PlayerControls"
import ListItem from "../components/ListItem"

const SavedWheels: React.FC = () => {
  const [wheels, setWheels] = useState<Wheel[]>([])

  useEffect(() => { getWheels() }, [])

  const savedWheels: SavedWheelsModel = JSON.parse((window.localStorage.getItem("pw-saved") ?? "{\"wheel_ids\": []}"));

  const getWheels = async () => {
    let wheels: Wheel[] = [];
    for(const id of savedWheels.wheel_ids) {
      const response = await fetch(`${API_URL}/wheels/${id}`)
      const wheel: Wheel = await response.json()
      wheels.push(wheel);
    }
    setWheels(wheels)
  }

  return (
    <>
      <IonPage>
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
                return (
                  <ListItem key={wheels.indexOf(data)} name={data.title} content={data.description} length={data.wheel_time} url={`/wheel/${data.id}`} />
                )
              })
            }
          </IonList>}
          {wheels.length == 0 && <>No wheels saved!</>}
        </IonContent>
        <PlayerControls />
      </IonPage>
    </>
  );
};

export default SavedWheels;
