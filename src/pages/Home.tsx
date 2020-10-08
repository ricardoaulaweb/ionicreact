import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add } from "ionicons/icons";
import React from "react";
import CarroItem from "../components/CarroItem";
import store from "../store";

const Home: React.FC = () => {
  const { carros } = store.useStore().state;
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Meus carros</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Meus carros</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {carros.map((carro, index) => (
            <CarroItem key={index} carro={carro}></CarroItem>
          ))}
        </IonList>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/form">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;
