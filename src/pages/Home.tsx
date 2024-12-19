import { IonButtons, IonCard, IonContent, IonGrid, IonHeader, IonIcon, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { cogOutline, searchOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { API_URL } from "../App";
import Markdown from "react-markdown";
import PlayerControls from "../components/PlayerControls";

const QuickstartCard = ({ name, icon, url }: { name: string, icon: string, url: string }) => {
  const history = useHistory()

  return <IonCard className="ion-padding" onClick={(e) => {
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
        <QuickstartCard name="Find Wheels" icon={searchOutline} url="/wheellist" />
        <QuickstartCard name="Settings" icon={cogOutline} url="/settings" />

        <h3>PWA Support</h3>
        <p>If you would like to use this app natively on mobile, it supports being installed as a PWA!</p>
        <p>Tap the three dots in the upper right corner of your browser and select the option to install this app to your home screen.  This will install the app onto your device.</p>
      </IonGrid>
    </IonContent>
    <PlayerControls />
  </IonPage>
}

export default Home;
