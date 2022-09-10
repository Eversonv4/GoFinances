import React, { useState } from "react";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import {
  Container,
  Header,
  Title,
  Fields,
  Form,
  TransactionsTypes,
} from "./styles";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm, UseFormProps } from "react-hook-form";

import { Button } from "@components/Forms/Button";
import { Input } from "@components/Forms/Input";
import { InputForm } from "@components/Forms/InputForm";
import { TransactionTypeButton } from "@components/Forms/TransactionTypeButton";
import { CategorySelectButton } from "@components/Forms/CategorySelectBtn";

import { CategorySelect } from "@screens/CategorySelect";

interface FormData {
  name: string;
  amount: number;
}

const schema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  amount: yup
    .number()
    .typeError("Informe um valor numérico")
    .positive("O valor não pode ser negativo."),
});

export function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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

  function handleRegister({ name, amount }: FormData) {
    if (!transactionType) {
      return Alert.alert("Selecione o tipo da transação");
    }

    if (category.key === "category") {
      return Alert.alert("Selecione a categoria");
    }

    const data = {
      name: name,
      amount: amount,
      transactionType,
      category: category.key,
    };

    console.log(data);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name?.message}
            />

            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount?.message}
            />

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

          <Button
            onPress={handleSubmit(({ name, amount }) =>
              handleRegister({ name, amount })
            )}
            title="Enviar"
          />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
