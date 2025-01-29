import { IonButtons, IonCard, IonContent, IonGrid, IonHeader, IonIcon, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { cogOutline, searchOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { API_URL } from "../App";
import Markdown from "react-markdown";
import PlayerControls from "../components/PlayerControls";
import { useLocalStorage } from "react-use";

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
  const [savedText, setSavedText] = useLocalStorage('pw-home-page', null)
  const [markdown, setMarkdown] = useState<string | null>();

  const getMarkdown = async () => {
    await fetch(`${API_URL}/mdpages/intro_page`)
      .then(async (res) => {
        const data = await res.json()
        setSavedText(data)
        setMarkdown(data)
      }).catch(() => {
        setMarkdown(savedText)
      })
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
