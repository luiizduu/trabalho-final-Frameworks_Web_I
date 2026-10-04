import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

function PokemonCard({ pokemon }) {
  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: 3,
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: 8,
        },
      }}
    >

      <CardMedia
        component="img"
        height="220"
        image={pokemon.sprites.front_default}
        alt={pokemon.name}
        sx={{
          objectFit: "contain",
          backgroundColor: "#f5f5f5",
          p: 2,
          transition: "0.3s",
          "&:hover": {
            transform: "scale(1.08)",
          },
        }}
      />

      <CardContent
        sx={{
          p: 3,
          "&:last-child": {
            pb: 3,
          },
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          textTransform="capitalize"
          align="center"
          sx={{ mb: 1 }}
        >
          {pokemon.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mb: 2 }}
        >
          Tipo(s) do Pokémon
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          sx={{ mb: 2 }}
        >
          {pokemon.types.map((tipo) => {
            const cores = {
              normal: "#A8A77A",
              fire: "#EE8130",
              water: "#6390F0",
              electric: "#F7D02C",
              grass: "#7AC74C",
              ice: "#96D9D6",
              fighting: "#C22E28",
              poison: "#A33EA1",
              ground: "#E2BF65",
              flying: "#A98FF3",
              psychic: "#F95587",
              bug: "#A6B91A",
              rock: "#B6A136",
              ghost: "#735797",
              dragon: "#6F35FC",
              dark: "#705746",
              steel: "#B7B7CE",
              fairy: "#D685AD",
            };

            return (
              <Chip
                key={tipo.type.name}
                label={tipo.type.name}
                sx={{
                  backgroundColor: cores[tipo.type.name],
                  color: "#fff",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
              />
            );
          })}
        </Stack>

        <Button
          component={Link}
          to={`/pokemon/${pokemon.id}`}
          variant="contained"
          fullWidth
          sx={{
            mt: 1,
            borderRadius: 2,
            fontWeight: "bold",
            textTransform: "none",
            py: 1.2,
            transition: "0.2s",
            "&:hover": {
              transform: "scale(1.02)",
            },
          }}
        >
          Ver detalhes
        </Button>
      </CardContent>
    </Card>
  );
}

export default PokemonCard;