import { IonButton, IonCol, IonFooter, IonIcon, IonRange, IonRow, IonText, IonToolbar, useIonModal } from '@ionic/react';
import { usePlayerState } from './hooks/PlayerStateProvider';
import { pause, play, playSkipBack, playSkipForward } from 'ionicons/icons';
import FullscreenPlayer from './modals/FullscreenPlayer';
import { useTimer } from './hooks/TimerProvider';

const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
};

function PlayerControls() {
  const playerStateContext = usePlayerState();
  let timerContext = useTimer();

  const [present, dismiss] = useIonModal(FullscreenPlayer, {
    dismiss: () => dismiss()
  })

  if (!playerStateContext) {
    return null;
  }

  let { playerState, rewindWheel, playWheel, pauseWheel, advanceWheel, paused } = playerStateContext;
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
          height: 50,
          overflowY: "hidden",
          overflowX: "hidden",
          flexWrap: "nowrap"
        }}>
          <IonCol size="auto" style={{ paddingTop: 0 }}>
            <p style={{
              margin: 0,
              fontSize: "medium"
            }}><b>{wheel?.steps[playerState.curStpIdx].head}</b></p>
            <p style={{
              margin: 0,
              fontSize: "smaller"
            }}>{wheel.title}</p>
          </IonCol>
          <IonCol style={{ paddingTop: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "smaller", maxHeight: 3 }}>
              <p style={{ fontSize: "smaller" }}>{formatTime(wheel?.steps[playerState.curStpIdx].length - (timerContext.timer.timerSeconds * 1000))}</p>
              <p style={{ fontSize: "smaller" }}>{formatTime(wheel?.steps[playerState.curStpIdx].length)}</p>
            </div>
            <IonRange
              value={(wheel?.steps[playerState.curStpIdx].length / 1000) - timerContext.timer.timerSeconds}
              min={0}
              max={wheel?.steps[playerState.curStpIdx].length / 1000}
              disabled
              style={{
                maxHeight: 16
              }}
            ></IonRange>
            <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
              {/* <IonButton onClick={(e) => {
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
              </IonButton> */}
              <IonButton onClick={(e) => {
  e.stopPropagation()
  rewindWheel()
}} shape="round" fill="clear" size="small">
  <IonIcon slot="icon-only" icon={playSkipBack} />
</IonButton>
              <IonButton onClick={(e) => {
                e.stopPropagation()
                paused ? playWheel() : pauseWheel()
              }} shape="round" fill="clear" size="small">
                <IonIcon slot="icon-only" icon={paused ? play : pause} />
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
