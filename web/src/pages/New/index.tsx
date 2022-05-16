import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TileLayer, Marker } from "react-leaflet";
import { toast } from "react-toastify";

import { categories } from "./categories";
import { useGetLocation } from "../../hooks/useGetLocation";
import { LatLngExpression, LeafletMouseEvent } from "leaflet";

import {
  Container,
  Button,
  ButtonContainer,
  CategoryBox,
  CategoryContainer,
  CategoryImage,
  Form,
  FormTitle,
  MapContainer,
  Section,
} from "./styles";
import { Input } from "../../components/Input";

export function New() {
  const { coords } = useGetLocation();

  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    contact: "",
    category: "",
    coords: [0, 0],
  });

  const navigate = useNavigate();

  async function onSubmit() {
    const request = await fetch("http://localhost:5000/store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formValues,
        latitude: formValues.coords[0],
        longitude: formValues.coords[1],
      }),
    });

    if (request.ok) {
      toast("Estabelecimento gravado com sucesso!", {
        type: "success",
        autoClose: 2000,
        onClose: () => navigate("/"),
      });
    }
  }

  if (!coords) {
    return <h1>Obtendo localização ...</h1>;
  }

  return (
    <Container>
      <Form
        onSubmit={e => {
          e.preventDefault();

          onSubmit();
        }}
      >
        <FormTitle>Cadastro do comércio local</FormTitle>

        <Section>Dados</Section>
        <Input
          label="Nome do local"
          name="name"
          value={formValues.name}
          onChange={setFormValues}
        />
        <Input
          label="Descrição"
          name="description"
          value={formValues.description}
          onChange={setFormValues}
        />
        <Input
          label="Contato"
          name="contact"
          value={formValues.contact}
          onChange={setFormValues}
        />

        <Section>Endereço</Section>
        <MapContainer
          center={
            {
              lat: coords[0],
              lng: coords[1],
            } as LatLngExpression
          }
          zoom={13}
          ref={map => {
            map?.addEventListener("click", (event: LeafletMouseEvent) => {
              setFormValues(prev => ({
                ...prev,
                coords: [event.latlng.lat, event.latlng.lng],
              }));
            });
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={
              [formValues.coords[0], formValues.coords[1]] as LatLngExpression
            }
          />
        </MapContainer>

        <Section>Categoria</Section>
        <CategoryContainer>
          {categories.map(category => (
            <CategoryBox
              key={category.key}
              isActive={formValues.category === category.key}
              onClick={() => {
                setFormValues(prev => ({ ...prev, category: category.key }));
              }}
            >
              <CategoryImage src={category.url} alt={category.label} />
              {category.label}
            </CategoryBox>
          ))}
        </CategoryContainer>

        <ButtonContainer>
          <Button type="submit">Salvar</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
}
