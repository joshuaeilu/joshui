import { IonButton, IonCol, IonFooter, IonIcon, IonRange, IonRow, IonToolbar, useIonModal } from '@ionic/react';
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

  return <IonFooter>
    <div onClick={() => openFullscreen()}>
      <IonToolbar>
        <IonRow style={{
          height: 55,
          overflowY: "hidden",
          overflowX: "hidden",
          flexWrap: "nowrap"
        }}>
          <IonCol size="auto">
            <p style={{
              margin: 0,
              fontSize: "medium"
            }}><b>{wheel.title}</b></p>
            <p style={{
              margin: 0,
              fontSize: "smaller"
            }}>{wheel?.steps[playerState.curStpIdx].head}</p>
          </IonCol>
          <IonCol>
            {/* TODO: Make a way to get current full wheel progress and use that instead of step progress */}
            <IonRange
              value={(wheel?.steps[playerState.curStpIdx].length / 1000) - timerContext.timer.timerSeconds}
              min={0}
              max={wheel?.steps[playerState.curStpIdx].length / 1000}
              style={{
                maxHeight: 16
              }}
            />
            <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
              <IonButton onClick={(e) => {
                e.stopPropagation()
                playWheel()
              }} shape="round" fill="clear" size="small">
                <IonIcon slot="icon-only" icon={play} />
              </IonButton>
              <IonButton onClick={(e) => {
                e.stopPropagation()
                pauseWheel()
              }} shape="round" fill="clear" size="small">
                <IonIcon slot="icon-only" icon={pause} />
              </IonButton>
              <IonButton onClick={(e) => {
                e.stopPropagation()
                advanceWheel()
              }} shape="round" fill="clear" size="small">
                <IonIcon slot="icon-only" icon={playSkipForward} />
              </IonButton>
            </div>
          </IonCol>
        </IonRow>
      </IonToolbar>
    </div>
  </IonFooter>
}

export default PlayerControls;
