import React from "react";
import { FlatList } from "react-native";
import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Divider,
  Footer,
} from "./styles";
import { Button } from "@components/Forms/Button";
import { categories } from "@utils/categories";

interface Category {
  key: string;
  name: string;
}

interface Props {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

export function CategorySelect({
  category,
  setCategory,
  closeSelectCategory,
}: Props) {
  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.key}
        style={{ flex: 1, width: "100%" }}
        renderItem={({ item }) => (
          <Category onPress={() => console.log(item.name)}>
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Divider />}
      />

      <Footer>
        <Button title="Selectionar" onPress={closeSelectCategory} />
      </Footer>
    </Container>
  );
}
