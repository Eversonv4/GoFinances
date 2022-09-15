import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
  LoadingPage,
  EmptyTrasactionContainer,
  EmptyTrasactionText,
} from "./styles";
import { DataListProps } from "@screens/Dashboard";
import { categories } from "@utils/categories";

import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";
import { addMonths, subMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { HistoryCard } from "@components/HistoryCard";

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
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] =
    useState<TotalByCategoryProps[]>();

  const theme = useTheme();

  function handleDateChange(action: "next" | "back") {
    if (action === "next") {
      const newDate = addMonths(selectedDate, 1);
      setSelectedDate(newDate);
    } else {
      const newDate = subMonths(selectedDate, 1);
      setSelectedDate(newDate);
    }
  }

  async function LoadData() {
    setIsLoading(true);
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expenses = responseFormatted.filter(
      (expense: DataListProps) =>
        expense.transactionType === "down" &&
        new Date(expense.date).getMonth() === selectedDate.getMonth() &&
        new Date(expense.date).getFullYear() === selectedDate.getFullYear()
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
    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      LoadData();
    }, [selectedDate])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      {isLoading ? (
        <LoadingPage>
          <ActivityIndicator color="red" size="large" />
        </LoadingPage>
      ) : (
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: useBottomTabBarHeight(),
          }}
        >
          <MonthSelect>
            <MonthSelectButton onPress={() => handleDateChange("back")}>
              <MonthSelectIcon name="chevron-left" />
            </MonthSelectButton>

            <Month>
              {format(selectedDate, "MMMM, yyyy", { locale: ptBR })}
            </Month>

            <MonthSelectButton onPress={() => handleDateChange("next")}>
              <MonthSelectIcon name="chevron-right" />
            </MonthSelectButton>
          </MonthSelect>

          {totalByCategories?.length === 0 && (
            <EmptyTrasactionContainer>
              <EmptyTrasactionText>
                Não temos transações nesse período
              </EmptyTrasactionText>
            </EmptyTrasactionContainer>
          )}

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

          {totalByCategories &&
            totalByCategories.map((item) => (
              <HistoryCard
                key={item.key}
                color={item.color}
                title={item.name}
                amount={item.totalFormatted}
              />
            ))}
        </Content>
      )}
    </Container>
  );
}
