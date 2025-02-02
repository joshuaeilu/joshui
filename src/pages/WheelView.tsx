import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonLoading, useIonModal, useIonToast } from '@ionic/react';
import * as React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Wheel } from '../Types'
import { useEffect, useState } from 'react';
import { API_URL } from '../App'
import PlayerControls from '../components/PlayerControls';
import { usePlayerState } from '../components/hooks/PlayerStateProvider';
import { download, play, share } from 'ionicons/icons';
import { Share } from '@capacitor/share';
import { StepListItem } from '../components/ListItem';
import { useDownloadedWheels } from '../components/hooks/DownloadedWheelsProvider';
import FullscreenPlayer from '../components/modals/FullscreenPlayer';

const WheelView: React.FC = () => {
  const [present] = useIonToast();
  const [presentLoad, dismissLoad] = useIonLoading()
  let { id } = useParams<{ id: string }>();
  const history = useHistory();

  const downloadedWheelsContext = useDownloadedWheels()!

  const [wheel, setWheel] = useState<Wheel | null>(null)
  const [downloaded, setDownloaded] = useState(false)

  const [fullscreenPresent, fullscreenDismiss] = useIonModal(FullscreenPlayer, {
    dismiss: () => fullscreenDismiss()
  })

  useEffect(() => { getWheel() }, [id])
  useEffect(() => {
    const updateDownloaded = async () => setDownloaded(await downloadedWheelsContext.isDownloaded(parseInt(id)))
    updateDownloaded()
  }, [])

  const getWheel = async () => {
    if (await downloadedWheelsContext.isDownloaded(parseInt(id))) {
      const wheel = await downloadedWheelsContext.getWheel(parseInt(id))
      setWheel(wheel)
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
            marginTop: 8,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {wheel.title}
          </IonTitle>
        </div>
        <IonButtons slot="end">
          <IonButton onClick={async () => {
            setActiveWheel(wheel)
            fullscreenPresent()
          }}>
            <IonIcon icon={play} />
            <p className="ion-hide-md-down">&nbsp;Play</p>
          </IonButton>
          <IonButton onClick={async (e) => {
            e.preventDefault()

            presentLoad({
              message: "Downloading..."
            })
            if (!downloaded) {
              await downloadedWheelsContext.addWheel(wheel.id).then(() => {
                present({
                  message: "Downloaded",
                  duration: 1000
                })
              })
            } else {
              await downloadedWheelsContext.removeWheel(wheel.id).then(() => {
                present({
                  message: "Removed",
                  duration: 1000
                })
              })
            }
            dismissLoad()
            setDownloaded(await downloadedWheelsContext.isDownloaded(wheel.id))
          }}>
            <IonIcon icon={download} color={downloaded ? 'primary' : ''} />
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
