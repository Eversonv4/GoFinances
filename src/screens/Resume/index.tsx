import React, { useState, useEffect, useCallback } from "react";
import { ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { HistoryCard } from "@components/HistoryCard";
import { Container, Header, Title, Content, ChartContainer } from "./styles";
import { DataListProps } from "@screens/Dashboard";
import { categories } from "@utils/categories";

import { VictoryPie } from "victory-native";
import { useFocusEffect } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";

import { useTheme } from "styled-components";

interface TotalByCategoryProps {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  totalPercentage: string;
}

export function ResumePage() {
  const [totalByCategories, setTotalByCategories] =
    useState<TotalByCategoryProps[]>();

  const theme = useTheme();

  async function LoadData() {
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expenses = responseFormatted.filter(
      (expense: DataListProps) => expense.transactionType === "down"
    );

    const expensesTotal = expenses.reduce(
      (acumullator: number, expense: DataListProps) => {
        return acumullator + Number(expense.amount);
      },
      0
    );

    const totalByCategory: TotalByCategoryProps[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expenses.forEach((expense: DataListProps) => {
        if (expense.category === category.key) {
          categorySum += Number(expense.amount);
        }
      });

      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const percent = `${((categorySum / expensesTotal) * 100).toFixed(0)}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          total: categorySum,
          totalFormatted: totalFormatted,
          color: category.color,
          totalPercentage: percent,
        });
      }
    });

    setTotalByCategories(totalByCategory);
  }

  useEffect(() => {
    LoadData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      LoadData();
    }, [])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content>
        <ChartContainer>
          {totalByCategories && (
            <VictoryPie
              data={totalByCategories}
              colorScale={totalByCategories.map((category) => category.color)}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: "bold",
                  fill: theme.colors.shape,
                },
              }}
              labelRadius={99}
              x="totalPercentage"
              y="total"
            />
          )}
        </ChartContainer>

        <ScrollView>
          {totalByCategories &&
            totalByCategories.map((item) => (
              <HistoryCard
                key={item.key}
                color={item.color}
                title={item.name}
                amount={item.totalFormatted}
              />
            ))}
        </ScrollView>
      </Content>
    </Container>
  );
}
