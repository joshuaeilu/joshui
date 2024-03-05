import { IonButton, IonCol, IonFooter, IonIcon, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
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
        <IonRow>
          <IonCol size="auto">
            <IonTitle>{wheel?.title ?? "None Selected"}</IonTitle>
            <IonButton onClick={playWheel}>
              <IonIcon icon={play} />
            </IonButton>
            <IonButton onClick={pauseWheel}>
              <IonIcon icon={pause} />
            </IonButton>
            <IonButton onClick={advanceWheel}>
              <IonIcon icon={playSkipForward} />
            </IonButton>
            <IonText>{Math.floor(timerSeconds/60)}:{timerSeconds%60 < 10 ? '0': ''}{timerSeconds%60}</IonText>
          </IonCol>
          {
            wheel?.steps.map((step) => {
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
