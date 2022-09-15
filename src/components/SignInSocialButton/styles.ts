import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(TouchableOpacity).attrs({
  activeOpacity: 0.9,
})`
  height: 56px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.shape};
  flex-direction: row;

  align-items: center;

  border-radius: 5px;
`;

export const ImageContainer = styled.View`
  border-right-width: 1px;
  border-right-style: solid;
  border-right-color: ${({ theme }) => theme.colors.background};
  padding: 16px;
`;

export const Title = styled.Text`
  margin: 0 auto;

  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(14)}px;
`;
