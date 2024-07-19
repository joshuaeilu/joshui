import { IonButtons, IonContent, IonHeader, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonToast } from "@ionic/react"
import { useEffect, useState } from "react"
import { Wheel } from "../Types"
import { API_URL } from "../App"
import PlayerControls from "../components/PlayerControls"
import { getSavedWheels, removeSavedWheel } from "../SavedWheelHandler"
import { WheelListItem } from "../components/ListItem"

const SavedWheels: React.FC = () => {
  const [wheels, setWheels] = useState<Wheel[]>([])
  const [present] = useIonToast();

  const savedWheels = getSavedWheels()

  useEffect(() => {
    getWheels()
  }, [savedWheels])

  const getWheels = async () => {
    let wheels: Wheel[] = []
    for (const id of savedWheels.wheel_ids) {
      const response = await fetch(`${API_URL}/wheels/${id}`)
      if (!response.ok) {
        present({
          message: `Could not access wheel ${id}.  Error code ${response.status}: ${response.statusText}.`,
          duration: 5000,
          position: "top",
          buttons: [
            { text: "Remove Wheel From Saved", handler: () => { removeSavedWheel(id) } }
          ]
        })
      } else {
        const wheel: Wheel = await response.json()
        wheels.push(wheel);
      }
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
                  <WheelListItem key={wheels.indexOf(data)} wheel={data} length={data.wheel_time} />
                )
              })
            }
          </IonList>}
          {wheels.length == 0 && <>{"Loading... Do you have any wheels saved?"}</>}
        </IonContent>
        <PlayerControls />
      </IonPage>
    </>
  );
};

export default SavedWheels;
