import { IonButtons, IonContent, IonHeader, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './WheelList.css';
import { useEffect, useState } from 'react';
import ListItem from '../components/ListItem';
import { User } from '../Types';
import { API_URL } from '../App'
import PlayerControls from '../components/PlayerControls';
import { useParams } from 'react-router';

const WheelList: React.FC = () => {
  let { id } = useParams<{id: string}>();

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => { getUser() }, [])

  const getUser = async () => {
      const response = await fetch(`${API_URL}/users/${id}`)
      setUser(await response.json())
  }

  if (user == null) return <>Loading...</>

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>{user.username}'s Wheels</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen={true}>
          <IonList lines="none" className="wheellist">
            {
              user.wheel_set.map((data) => {
                return (
                    <ListItem key={user.wheel_set.indexOf(data)} name={data.title} content={data.description} url={`/wheel/${data.id}`} />
                )
              })
            }
          </IonList>
        </IonContent>
        <PlayerControls />
      </IonPage>
    </>
  );
};

export default WheelList;
