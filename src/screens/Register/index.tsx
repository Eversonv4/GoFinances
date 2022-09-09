import React, { useState } from "react";
import { Modal } from "react-native";
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
import { CategorySelectButton } from "@components/Forms/CategorySelectBtn";

import { CategorySelect } from "@screens/CategorySelect";

export function Register() {
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  function handleTransactionsTypeSelect(type: "up" | "down") {
    if (transactionType === type) {
      setTransactionType("");
      return;
    }
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
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

          <CategorySelectButton
            onPress={handleOpenSelectCategoryModal}
            title={category.name}
          />
        </Fields>

        <Button title="Enviar" />
      </Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>
  );
}
