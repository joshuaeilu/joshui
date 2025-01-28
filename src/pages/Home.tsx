import { IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { cogOutline, searchOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { API_URL } from "../App";
import Markdown from "react-markdown";
import PlayerControls from "../components/PlayerControls";

const QuickstartCard = ({ name, icon, url }: { name: string, icon: string, url: string }) => {
  const history = useHistory()

  return <IonCard style={{ width: "100%" }} className="ion-padding" onClick={(e) => {
    e.preventDefault()
    history.push(url)
  }}>
    <IonIcon icon={icon} style={{ fontSize: 64 }} />
    <h3>{name}</h3>
  </IonCard>
}

const Home = () => {
  const [markdown, setMarkdown] = useState<string | null>();

  const getMarkdown = async () => {
    const request = await fetch(`${API_URL}/mdpages/intro_page`)
    if (!request.ok) {
      return
    }
    const data = await request.json()
    setMarkdown(data)
  }

  useEffect(() => {
    getMarkdown()
  }, [])

  return <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>Home</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonGrid className="ion-padding ion-text-center ion-justify-content-center">
        {markdown ?
          <Markdown>{markdown}</Markdown>
          :
          <h3>Welcome to Prayer Wheels!</h3>}

        <h3>Quick Start</h3>
        <div style={{ display: "flex", width: "100%", maxHeight: 175 }}>
          <QuickstartCard name="Find Wheels" icon={searchOutline} url="/wheellist" />
          <QuickstartCard name="Settings" icon={cogOutline} url="/settings" />
        </div>
      </IonGrid>
    </IonContent>
    <PlayerControls />
  </IonPage>
}

export default Home;
