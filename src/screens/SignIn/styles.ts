import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  width: 100%;
  height: 70%;

  background-color: ${({ theme }) => theme.colors.primary};

  justify-content: flex-end;
  align-items: center;
`;

export const TitleWrapper = styled.View`
  align-items: center;
`;

export const Title = styled.Text`
  text-align: center;

  font-size: ${RFValue(30)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.shape};

  margin-top: 40px;
  margin-bottom: 80px;
`;

export const SignInTitle = styled.Text`
  text-align: center;

  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.shape};

  margin-bottom: 67px;
`;

export const Footer = styled.View`
  width: 100%;
  height: 30%;

  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const FooterWrapper = styled.View`
  margin: 0 32px;
  margin-top: ${RFValue(-27)}px;
  align-self: center;

  justify-content: space-between;

  height: 128px;
  width: 80%;
`;
