import React from "react";
import {
  Header,
  Container,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
} from "./styles";

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserInfo>
          <Photo source={require("@assets/everson.jpg")} />
          <User>
            <UserGreeting>Olá,</UserGreeting>
            <UserName>Everson</UserName>
          </User>
        </UserInfo>
      </Header>
    </Container>
  );
}
