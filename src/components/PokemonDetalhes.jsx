import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

function PokemonDetalhes() {
    const { id } = useParams();

    const [pokemon, setPokemon] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((response) => {
                setPokemon(response.data);
                setCarregando(false);
            })
            .catch((error) => {
                console.error("Erro ao buscar Pokémon:", error);
                setCarregando(false);
            });
    }, [id]);

    if (carregando) {
        return <p>Carregando Pokémon...</p>;
    }

    if (!pokemon) {
        return <p>Pokémon não encontrado.</p>;
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#f4f6f8",
                py: 5,
            }}
        >
            <Card
                sx={{
                    maxWidth: 550,
                    margin: "0 auto",
                    borderRadius: 4,
                    boxShadow: 6,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 2,
                        backgroundColor: "#f5f5f5",
                        p: 3,
                    }}
                >
                    <Box
                        component="img"
                        src={pokemon.sprites.front_default}
                        alt={`${pokemon.name} frente`}
                        sx={{
                            width: "45%",
                            maxWidth: 220,
                            objectFit: "contain",
                        }}
                    />

                    <Box
                        component="img"
                        src={pokemon.sprites.back_default}
                        alt={`${pokemon.name} costas`}
                        sx={{
                            width: "45%",
                            maxWidth: 220,
                            objectFit: "contain",
                        }}
                    />
                </Box>

                <CardContent>
                    <Typography
    variant="body1"
    color="text.secondary"
    align="center"
    fontWeight="bold"
>
    #{String(pokemon.id).padStart(3, "0")}
</Typography>

<Typography
    variant="h3"
    fontWeight="bold"
    textTransform="capitalize"
    align="center"
    gutterBottom
>
    {pokemon.name}
</Typography>

                    <Typography variant="h6" gutterBottom>
                        Tipos
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="center"
                        sx={{ mb: 4 }}
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
                                        backgroundColor:
                                            cores[tipo.type.name],
                                        color: "#fff",
                                        fontWeight: "bold",
                                        textTransform: "capitalize",
                                        px: 1,
                                    }}
                                />
                            );
                        })}
                    </Stack>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 2,
                            mb: 4,
                        }}
                    >
                        <Box
                            sx={{
                                p: 2,
                                backgroundColor: "#f4f6f8",
                                borderRadius: 3,
                                textAlign: "center",
                            }}
                        >
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Altura
                            </Typography>

                            <Typography
                                variant="h6"
                                fontWeight="bold"
                            >
                                {pokemon.height / 10} m
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                p: 2,
                                backgroundColor: "#f4f6f8",
                                borderRadius: 3,
                                textAlign: "center",
                            }}
                        >
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Peso
                            </Typography>

                            <Typography
                                variant="h6"
                                fontWeight="bold"
                            >
                                {pokemon.weight / 10} kg
                            </Typography>
                        </Box>
                    </Box>

                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{ mb: 2 }}
                    >
                        Habilidades
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={1}
                        useFlexGap
                        flexWrap="wrap"
                        sx={{ mb: 4 }}
                    >
                        {pokemon.abilities.map((habilidade) => (
                            <Chip
                                key={habilidade.ability.name}
                                label={habilidade.ability.name}
                                variant="outlined"
                                sx={{
                                    textTransform: "capitalize",
                                    fontWeight: "bold",
                                }}
                            />
                        ))}
                    </Stack>

                    <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                        Estatísticas
                    </Typography>

                    {pokemon.stats.map((estatistica) => {
                        const nomes = {
                            hp: "HP",
                            attack: "Ataque",
                            defense: "Defesa",
                            "special-attack": "Ataque Especial",
                            "special-defense": "Defesa Especial",
                            speed: "Velocidade",
                        };

                        return (
                            <Box
                                key={estatistica.stat.name}
                                sx={{ mb: 2.5 }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        mb: 0.5,
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        fontWeight="bold"
                                    >
                                        {nomes[estatistica.stat.name]}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        fontWeight="bold"
                                    >
                                        {estatistica.base_stat}
                                    </Typography>
                                </Box>

                                <LinearProgress
                                    variant="determinate"
                                    value={Math.min(
                                        estatistica.base_stat,
                                        100
                                    )}
                                    sx={{
                                        height: 10,
                                        borderRadius: 5,
                                    }}
                                />
                            </Box>
                        );
                    })}

                    <Button
                        component={Link}
                        to="/"
                        variant="outlined"
                        fullWidth
                        sx={{
                            mt: 3,
                            py: 1.3,
                            borderRadius: 2,
                            fontWeight: "bold",
                            textTransform: "none",
                            fontSize: "1rem",
                        }}
                    >
                        ← Voltar para a Pokédex
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
}

export default PokemonDetalhes;