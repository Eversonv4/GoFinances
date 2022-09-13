import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton,
} from "./styles";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { HighlightCard } from "@components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "@components/TransactionCard";

import { useFocusEffect } from "@react-navigation/native";

export interface DataListProps extends TransactionCardProps {
  id: string;
  transactionType?: string;
}

interface ItemDataListProps extends DataListProps {
  item: DataListProps;
}

interface HighlightDataProps {
  entries: string;
  expenses: string;
  total: string;
}

export function Dashboard() {
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightDataProps>(
    {} as HighlightDataProps
  );

  async function LoadTransactions() {
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response!) : [];

    let incomeTotal = 0;
    let expensesTotal = 0;
    let totalAmount = 0;

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        // const amount = convertValues(item.amount);
        // const date = new Date(item.date).toLocaleDateString("pt-BR");

        if (item.transactionType === "up") {
          incomeTotal += Number(item.amount);
        }

        if (item.transactionType === "down") {
          expensesTotal += Number(item.amount);
        }

        totalAmount = incomeTotal - expensesTotal;

        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.transactionType,
          category: item.category,
          date,
        };
      }
    );

    const formattedTotalAmount = Number(totalAmount).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const formattedLastIncome = Number(incomeTotal).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const formattedExpensesTotal = Number(expensesTotal).toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL",
      }
    );

    setHighlightData({
      entries: formattedLastIncome,
      expenses: formattedExpensesTotal,
      total: formattedTotalAmount,
    });

    setTransactions(transactionsFormatted);
  }

  useEffect(() => {
    LoadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      LoadTransactions();
    }, [])
  );

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={require("@assets/everson.jpg")} />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Everson</UserName>
            </User>
          </UserInfo>

          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount={highlightData.entries}
          lastTransation="Última entrada dia 13 de abril"
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount={highlightData.expenses}
          lastTransation="Última saída dia 03 de abril"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount={highlightData.total}
          lastTransation="01 a 16 de abril"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionList
          data={transactions}
          keyExtractor={(item: DataListProps) => item.id}
          renderItem={({ item }: ItemDataListProps) => (
            <TransactionCard data={item} />
          )}
        />
      </Transactions>
    </Container>
  );
}
