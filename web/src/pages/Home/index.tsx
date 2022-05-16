import { Link } from "react-router-dom";

import {
  Container,
  Button,
  ButtonBox,
  Image,
  LeftContainer,
  RightContainer,
  SubTitle,
  Title,
} from "./styles";

export function Home() {
  return (
    <Container>
      <LeftContainer>
        <Title>O mapa local de sua cidade</Title>
        <SubTitle>Encontre no comércio local tudo o que precisa!</SubTitle>

        <Link to={"/new"}>
          <Button>
            <ButtonBox>&rsaquo;</ButtonBox>
            Cadastre um ponto comercial
          </Button>
        </Link>
      </LeftContainer>

      <RightContainer>
        <Image />
      </RightContainer>
    </Container>
  );
}
