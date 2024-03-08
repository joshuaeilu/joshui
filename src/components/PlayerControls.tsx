import { IonButton, IonCol, IonFooter, IonIcon, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './PlayerControls.css';
import { useContext } from 'react';
import { PlayerStateContext } from './hooks/PlayerStateProvider';
import PlayerStepItem from './player/PlayerStepItem';
import { pause, play, playSkipForward } from 'ionicons/icons';
import { TimerContext } from './hooks/TimerProvider';

function PlayerControls() {
  const playerStateContext = useContext(PlayerStateContext);

  if(!playerStateContext) {
    return null;
  }

  let { playerState, playWheel, pauseWheel, advanceWheel } = playerStateContext;
  let wheel = playerState.wheel;

  let timerContext = useContext(TimerContext);

  if(timerContext == null) return null;

  let timerSeconds = timerContext.timer.timerSeconds

  return (
    <IonFooter>
      <IonToolbar>
        <IonRow style={{
      maxHeight: 90,
      height: "100%",
      overflowY: "hidden",
      overflowX: "auto",
      flexWrap: "nowrap"
    }}>
          <IonCol size="auto">
            <IonTitle class="ion-text-start">{wheel?.title ?? "No Wheel Selected"}</IonTitle>
            <IonButton onClick={playWheel}>
              <IonIcon icon={play} />
            </IonButton>
            <IonButton onClick={pauseWheel}>
              <IonIcon icon={pause} />
            </IonButton>
            <IonButton onClick={advanceWheel}>
              <IonIcon icon={playSkipForward} />
            </IonButton>
          </IonCol>
          <IonCol size="auto">
            {wheel && <PlayerStepItem name={wheel?.steps[playerState.curStpIdx].head} seconds={timerSeconds} active={true} />}
          </IonCol>
          {
            wheel?.steps.slice(playerState.curStpIdx+1).map((step) => {
              return (
                <IonCol size="auto" key={step.id}> 
                  <PlayerStepItem name={step.head} seconds={step.length/1000} />
                </IonCol>
              )
            })
          }
        </IonRow>
      </IonToolbar>
    </IonFooter>
  )
}

export default PlayerControls;
