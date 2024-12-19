import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import * as React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Wheel } from '../Types'
import { useEffect, useState } from 'react';
import { API_URL } from '../App'
import PlayerControls from '../components/PlayerControls';
import { usePlayerState } from '../components/hooks/PlayerStateProvider';
import { download, downloadOutline, play, share } from 'ionicons/icons';
import { Share } from '@capacitor/share';
import { resolvedWheelToWheel, resolveWheelURLs, StepListItem } from '../components/ListItem';
import { useDownloadedWheels } from '../components/hooks/DownloadedWheelsProvider';
import useNetworkConnectivity from '../components/hooks/UseNetworkConnectivity';
import { Storage } from '@ionic/storage';

const WheelView: React.FC = () => {
  const [present] = useIonToast();
  let { id } = useParams<{ id: string }>();
  const history = useHistory();

  const downloadedWheelsContext = useDownloadedWheels()!

  const [wheel, setWheel] = useState<Wheel | null>(null)
  const [downloaded, setDownloaded] = useState(downloadedWheelsContext.wheelDownloaded(parseInt(id)))

  const isConnected = useNetworkConnectivity()

  useEffect(() => { getWheel() }, [id])
  useEffect(() => { setDownloaded(downloadedWheelsContext.wheelDownloaded(parseInt(id))) }, [downloadedWheelsContext.wheelIDs])

  const getWheel = async () => {
    if (!isConnected) {
      const storage = new Storage()
      await storage.create()
      const wheelFromStorage: Wheel = await resolvedWheelToWheel(await storage.get(`pw-downloaded-${id}`))
      setWheel(wheelFromStorage)
      return
    }

    const url = `${API_URL}/wheels/${id}/`
    const response = await fetch(url)
    if (response.status != 200) {
      present({
        message: `Could not load wheel, got status: ${response.status} ${response.statusText}`,
        duration: 5000,
        position: 'top',
        color: 'danger'
      })
      history.push('/wheellist')
    }

    setWheel(await response.json())
  }

  const playerStateContext = usePlayerState();

  if (playerStateContext == null) return null;

  const { setActiveWheel } = playerStateContext;

  if (wheel == null) return <>Loading...</>

  const shareButton = async () => {
    const wheel_url = `${API_URL}/wheels/${id}`
    if ((await Share.canShare()).value) {
      await Share.share({
        url: wheel_url
      })
    } else {
      navigator.clipboard.writeText(wheel_url)
      present({
        message: "Link to wheel has been copied to clipboard!  Paste it anywhere.",
        duration: 1500,
        position: "top"
      })
    }
  }

  return <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <div style={{ display: "flex" }}>
          <img src={wheel.icon} style={{ width: 50, marginLeft: 10, marginTop: 10, marginRight: 0 }} />
          <IonTitle style={{
            marginTop: 8
          }}>
            {wheel.title}
          </IonTitle>
        </div>
        <IonButtons slot="end">
          <IonButton onClick={async () => {
            if (isConnected) {
              setActiveWheel(wheel)
            } else {
              const storage = new Storage()
              await storage.create()
              const wheelFromStorage = await resolvedWheelToWheel(await storage.get(`pw-downloaded-${wheel.id}`))
              setActiveWheel(wheelFromStorage)
            }
          }}>
            <IonIcon icon={play} />
            <p className="ion-hide-md-down">&nbsp;Play</p>
          </IonButton>
          <IonButton onClick={async () => {
            downloadedWheelsContext.toggleDownloadedWheel(wheel.id)
            const isDownloaded = downloadedWheelsContext.wheelDownloaded(wheel.id)
            setDownloaded(isDownloaded)

            const storage = new Storage()
            await storage.create()
            if (isDownloaded) {
              present({
                message: "Downloading...",
                duration: 1000
              })
              // save using ionic storage
              const resolvedWheel = await resolveWheelURLs(wheel)
              await storage.set(`pw-downloaded-${wheel.id}`, resolvedWheel);
              present({
                message: "Downloaded",
                duration: 1000
              })
            } else {
              // delete using ionic storage
              await storage.remove(`pw-downloaded-${wheel.id}`)
              present({
                message: "Removed",
                duration: 1000
              })
            }
          }}>
            {downloaded ? <IonIcon icon={download} /> : <IonIcon icon={downloadOutline} />}
            <p className="ion-hide-md-down">&nbsp;Download</p>
          </IonButton>
          <IonButton onClick={() => shareButton()}>
            <IonIcon icon={share} />
            <p className="ion-hide-md-down">&nbsp;Share</p>
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonList>
        {
          wheel.steps.sort((a, b) => a.wheel_index - b.wheel_index).map((step) => {
            return (
              <StepListItem key={step.id} name={step.head} content={step.body} length={step.length} />
            )
          })
        }
      </IonList>
    </IonContent>
    <PlayerControls />
  </IonPage>
}

export default WheelView;
