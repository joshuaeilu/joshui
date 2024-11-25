import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonIcon, IonPage, IonRow } from "@ionic/react";
import { chevronDownOutline, pause, play, playSkipForward } from "ionicons/icons";
import { useContext } from "react";
import { PlayerStateContext } from "../hooks/PlayerStateProvider";
import { TimerContext } from "../hooks/TimerProvider";
import { prettyPrintSeconds } from "../player/PlayerStepItem";

const FullscreenStepItem = ({ name, description, seconds, active = false, style }:
  { name: string, description: string, seconds: number, active?: boolean, style?: { [key: string]: any } }) => {
  return (
    <IonCard color={active ? "primary" : "light"} style={{
      ...style,
    }}>
      <IonCardHeader>
        <IonCardTitle>{name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <p>{description}</p>
        <br />
        {prettyPrintSeconds(seconds)}
      </IonCardContent>
    </IonCard>
  )
}

const PlayerWheelView = () => {
  const playerStateContext = useContext(PlayerStateContext);

  if (!playerStateContext) {
    return null;
  }
  let { playerState, playWheel, pauseWheel, advanceWheel } = playerStateContext;
  let wheel = playerState.wheel;

  if (wheel == null) return <></>

  let timerContext = useContext(TimerContext);
  if (timerContext == null) return null;
  let timerSeconds = timerContext.timer.timerSeconds

  return <IonGrid>
    <IonRow className="ion-justify-content-center">
      <img src={wheel.icon} style={{ width: 100 }} />
    </IonRow>
    <IonRow>
      <IonCol className="ion-text-center"><h2>{wheel.title}</h2></IonCol>
    </IonRow>
    <IonRow className="ion-justify-content-center">
      <IonCol size="auto">
        <IonButton onClick={playWheel} shape="round" fill="clear">
          <IonIcon slot="icon-only" icon={play} />
        </IonButton>
        <IonButton onClick={pauseWheel} shape="round" fill="clear">
          <IonIcon slot="icon-only" icon={pause} />
        </IonButton>
        <IonButton onClick={advanceWheel} shape="round" fill="clear">
          <IonIcon slot="icon-only" icon={playSkipForward} />
        </IonButton>
      </IonCol>
    </IonRow>
    <IonRow>
      {wheel && <FullscreenStepItem name={wheel.steps[playerState.curStpIdx].head} description={wheel.steps[playerState.curStpIdx].body} seconds={timerSeconds} active={true} style={{ width: "100%" }} />}
    </IonRow>
    {
      wheel?.steps.slice(playerState.curStpIdx + 1).map((step) => {
        return (
          <IonRow key={step.id}>
            <FullscreenStepItem name={step.head} description={step.body} seconds={step.length / 1000} active={false} style={{ width: "100%" }} />
          </IonRow>
        )
      })
    }
  </IonGrid>
}

const NothingView = () => {
  return <IonGrid>
    <IonRow>
      <IonCol className="ion-text-center">
        <h2>Nothing Playing!</h2>
      </IonCol>
    </IonRow>
    <IonRow>
      <IonCol className="ion-text-center">
        <p>Start playing a wheel from the wheels list!</p>
      </IonCol>
    </IonRow>
  </IonGrid>
}

const FullscreenPlayer = ({ dismiss }: { dismiss: () => any }) => {
  const playerStateContext = useContext(PlayerStateContext);

  if (!playerStateContext) {
    return null;
  }
  let { playerState } = playerStateContext;
  let wheel = playerState.wheel;

  return <IonPage>
    <IonContent>
      <IonButton fill="clear" expand="full" onClick={() => dismiss()}><IonIcon icon={chevronDownOutline} /></IonButton>
      {wheel == null ? <NothingView /> : <PlayerWheelView />}
    </IonContent>
  </IonPage>
}

export default FullscreenPlayer;
