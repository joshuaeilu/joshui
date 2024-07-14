import { IonButton, IonCol, IonFooter, IonIcon, IonRow, IonToolbar } from '@ionic/react';
import { useContext } from 'react';
import { PlayerStateContext } from './hooks/PlayerStateProvider';
import { pause, play, playSkipForward } from 'ionicons/icons';
import PlayerStepItem from './player/PlayerStepItem';
import { TimerContext } from './hooks/TimerProvider';

function PlayerControls() {
  const playerStateContext = useContext(PlayerStateContext);

  if (!playerStateContext) {
    return null;
  }

  let { playerState, playWheel, pauseWheel, advanceWheel } = playerStateContext;
  let wheel = playerState.wheel;

  if (wheel == null) {
    return <></>
  }

  let timerContext = useContext(TimerContext);

  if (timerContext == null) return null;

  let timerSeconds = timerContext.timer.timerSeconds

  return (
    <IonFooter>
      <IonToolbar>
        <IonRow style={{
          maxHeight: 100,
          height: "100%",
          overflowY: "hidden",
          overflowX: "hidden",
          flexWrap: "nowrap"
        }}>
          <IonCol size="auto">
            <h4 style={{
              marginTop: 10,
              marginLeft: 0
            }}><b>{wheel.title}</b></h4>
            Part {playerState.curStpIdx + 1}/{wheel?.steps.length}: {wheel?.steps[playerState.curStpIdx].head}
          </IonCol>
          <IonCol size="auto">
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
          <IonCol size="auto" className="ion-hide-md-down">
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
    </IonFooter>
  )
}

export default PlayerControls;
