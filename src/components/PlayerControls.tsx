import { IonButton, IonCol, IonFooter, IonIcon, IonRow, IonToolbar, useIonModal } from '@ionic/react';
import { usePlayerState } from './hooks/PlayerStateProvider';
import { pause, play, playSkipForward } from 'ionicons/icons';
import FullscreenPlayer from './modals/FullscreenPlayer';
import PlayerStepItem from './player/PlayerStepItem';
import { useTimer } from './hooks/TimerProvider';

function PlayerControls() {
  const playerStateContext = usePlayerState();
  let timerContext = useTimer();

  const [present, dismiss] = useIonModal(FullscreenPlayer, {
    dismiss: () => dismiss()
  })

  if (!playerStateContext) {
    return null;
  }

  let { playerState, playWheel, pauseWheel, advanceWheel } = playerStateContext;
  let wheel = playerState.wheel;

  if (wheel == null) {
    return <></>
  }

  const openFullscreen = () => {
    present()
  }

  if (timerContext == null) return null;

  let timerSeconds = timerContext.timer.timerSeconds

  return <IonFooter>
    <div onClick={() => openFullscreen()}>
      <IonToolbar>
        <IonRow style={{
          height: 90,
          overflowY: "hidden",
          overflowX: "hidden",
          flexWrap: "nowrap"
        }}>
          <IonCol size="auto">
            <h4 style={{
              marginTop: 0,
              marginLeft: 0,
              marginBottom: 0
            }}><b>{wheel.title}</b></h4>
            <div onClick={(e) => e.stopPropagation()}>
              <IonButton onClick={playWheel} shape="round" fill="clear">
                <IonIcon slot="icon-only" icon={play} />
              </IonButton>
              <IonButton onClick={pauseWheel} shape="round" fill="clear">
                <IonIcon slot="icon-only" icon={pause} />
              </IonButton>
              <IonButton onClick={advanceWheel} shape="round" fill="clear">
                <IonIcon slot="icon-only" icon={playSkipForward} />
              </IonButton>
            </div>
          </IonCol>
          <IonCol size="auto">
            {wheel && <PlayerStepItem name={wheel?.steps[playerState.curStpIdx].head} seconds={timerSeconds} active={true} />}
          </IonCol>
          {
            wheel?.steps.slice(playerState.curStpIdx + 1).map((step) => {
              return (
                <IonCol className="ion-hide-md-down" size="auto" key={step.id}>
                  <PlayerStepItem name={step.head} seconds={step.length / 1000} />
                </IonCol>
              )
            })
          }
        </IonRow>
      </IonToolbar>
    </div>
  </IonFooter>
}

export default PlayerControls;
