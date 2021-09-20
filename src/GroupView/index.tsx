import { useState, useEffect } from "react";
import {
  IonPage,
  IonSegment,
  IonBackButton,
  IonButtons,
  IonLabel,
  IonButton,
  IonHeader,
  IonToolbar,
} from "@ionic/react";
import { SegmentChangeEventDetail } from "@ionic/core";

import SegmentPanel from "../Components/SegmentPanel";
import GroupViewSegmentButton from "./GroupViewSegmentButton";

import "./GroupView.css";
import { StrippedGroup } from "../types/Group";
import GroupAbout from "./GroupAbout";
import GroupEvents from "./GroupEvents";
import GroupMembers from "./GroupMembers";

function GroupView() {
  const [selectedSegment, setSelectedSegment] = useState("about");
  const [group, setGroup] = useState<StrippedGroup>(testGroup);

  useEffect(() => {
    setGroup(testGroup);
  }, []);

  function changeSegment(e: CustomEvent<SegmentChangeEventDetail>) {
    let value = e.detail.value as string;
    if (value) setSelectedSegment(value);
  }

  return (
    <IonPage>
      <IonHeader mode="ios" translucent={true} className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start" className="h-10">
            <IonBackButton color="primary" defaultHref="/home" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <img
        className="group-banner-img "
        alt="Group Banner"
        src={group.banner_url}
      />

      <div className="m-4 text-center">
        <IonLabel className="text-2xl font-bold">{group.name}</IonLabel>
        <div className="flex flex-row justify-around items-center mt-3">
          <IonLabel className="font-bold">{group.category.name}</IonLabel>
          <IonButton size="small" className="w-1/4">
            Share
          </IonButton>
        </div>
      </div>
      <div className="px-3">
        <IonSegment
          mode="ios"
          className="group-view-segment"
          value={selectedSegment}
          onIonChange={changeSegment}
        >
          <GroupViewSegmentButton value="about" selected={selectedSegment}>
            ABOUT
          </GroupViewSegmentButton>
          <GroupViewSegmentButton value="events" selected={selectedSegment}>
            EVENTS
          </GroupViewSegmentButton>
          <GroupViewSegmentButton value="members" selected={selectedSegment}>
            MEMBERS
          </GroupViewSegmentButton>
        </IonSegment>
      </div>
      <SegmentPanel value="about" selected={selectedSegment}>
        <GroupAbout />
      </SegmentPanel>
      <SegmentPanel value="events" selected={selectedSegment}>
        <GroupEvents />
      </SegmentPanel>
      <SegmentPanel value="members" selected={selectedSegment}>
        <GroupMembers />
      </SegmentPanel>
    </IonPage>
  );
}

export default GroupView;

const testGroup = {
  id: 1,
  name: "Group Name 1",
  description: "This is About",
  category: {
    id: 1,
    name: "Category 1",
  },
  banner_url: "https://picsum.photos/200",
};