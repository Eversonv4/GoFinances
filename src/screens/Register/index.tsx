import React, { useState } from "react";
import {
  Container,
  Header,
  Title,
  Fields,
  Form,
  TransactionsTypes,
} from "./styles";

import { Button } from "@components/Forms/Button";
import { Input } from "@components/Forms/Input";
import { TransactionTypeButton } from "@components/Forms/TransactionTypeButton";
import { CategorySelect } from "@components/Forms/CategorySelect";

export function Register() {
  const [transactionType, setTransactionType] = useState("");

  function handleTransactionsTypeSelect(type: "up" | "down") {
    if (transactionType === type) {
      setTransactionType("");
      return;
    }
    setTransactionType(type);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />

          <TransactionsTypes>
            <TransactionTypeButton
              type="up"
              title="Income"
              onPress={() => handleTransactionsTypeSelect("up")}
              isActive={transactionType === "up"}
            />
            <TransactionTypeButton
              type="down"
              title="Outcome"
              onPress={() => handleTransactionsTypeSelect("down")}
              isActive={transactionType === "down"}
            />
          </TransactionsTypes>

          <CategorySelect title="Categoria" />
        </Fields>

        <Button title="Enviar" />
      </Form>
    </Container>
  );
}
