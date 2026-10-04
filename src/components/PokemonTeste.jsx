import { useEffect, useState } from "react";
import axios from "axios";

import PokemonCard from "./PokemonCard";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function PokemonTeste() {
    const [pokemons, setPokemons] = useState([]);
    const [busca, setBusca] = useState("");
    const [tipoSelecionado, setTipoSelecionado] = useState("todos");

    const [carregando, setCarregando] = useState(true);
    const [pagina, setPagina] = useState(1);
    const [totalPokemons, setTotalPokemons] = useState(0);

    const [modoBusca, setModoBusca] = useState(false);
    const [modoTipo, setModoTipo] = useState(false);
    const [pokemonsDoTipo, setPokemonsDoTipo] = useState([]);

    const [erro, setErro] = useState(false);

    useEffect(() => {
        if (modoBusca && !modoTipo) {
            return;
        }

        if (modoTipo) {
            const inicio = (pagina - 1) * 20;
            const fim = inicio + 20;

            const pokemonsDaPagina = pokemonsDoTipo.slice(inicio, fim);

            Promise.all(
                pokemonsDaPagina.map((pokemon) =>
                    axios.get(pokemon.pokemon.url)
                )
            ).then((detalhes) => {
                const dadosPokemons = detalhes.map(
                    (resultado) => resultado.data
                );

                setPokemons(dadosPokemons);
                setCarregando(false);
            });

            return;
        }

        setCarregando(true);
        setErro(false);

        axios
            .get(
                `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(pagina - 1) * 20}`
            )
            .then(async (response) => {
                const resultados = response.data.results;

                setTotalPokemons(response.data.count);

                const detalhes = await Promise.all(
                    resultados.map((pokemon) => axios.get(pokemon.url))
                );

                const dadosPokemons = detalhes.map(
                    (resultado) => resultado.data
                );

                setPokemons(dadosPokemons);
                setCarregando(false);
            })
            .catch((error) => {
                console.error("Erro ao buscar Pokémon:", error);
                setErro(true);
                setCarregando(false);
            });
    }, [pagina, modoBusca, modoTipo, pokemonsDoTipo]);

    const pesquisarPokemon = async () => {
        if (!busca.trim()) {
            setModoBusca(false);
            setPagina(1);
            return;
        }

        try {
            setCarregando(true);
            setErro(false);
            setModoBusca(true);
            setModoTipo(false);
            setTipoSelecionado("todos");

            const nomePokemon = busca.trim().toLowerCase();

            setBusca(nomePokemon);

            const response = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${nomePokemon}`
            );

            setPokemons([response.data]);
            setTotalPokemons(1);
            setPagina(1);
        } catch (error) {
            console.error("Pokémon não encontrado:", error);
            setPokemons([]);
            setTotalPokemons(0);
        } finally {
            setCarregando(false);
        }
    };

    const filtrarPorTipo = async (tipo) => {
        if (tipo === "todos") {
            limparBusca();
            return;
        }

        try {
            setCarregando(true);
            setErro(false);
            setModoBusca(true);
            setModoTipo(true);

            const response = await axios.get(
                `https://pokeapi.co/api/v2/type/${tipo}`
            );

            const resultados = response.data.pokemon;

            setPokemonsDoTipo(resultados);
            setTotalPokemons(resultados.length);

            const primeirosPokemons = resultados.slice(0, 20);

            const detalhes = await Promise.all(
                primeirosPokemons.map((pokemon) =>
                    axios.get(pokemon.pokemon.url)
                )
            );

            const dadosPokemons = detalhes.map(
                (resultado) => resultado.data
            );

            setPokemons(dadosPokemons);
            setTotalPokemons(resultados.length);
            setPagina(1);
        } catch (error) {
            console.error("Erro ao buscar Pokémon por tipo:", error);
            setPokemons([]);
            setTotalPokemons(0);
        } finally {
            setCarregando(false);
        }
    };

    const limparBusca = () => {
        setBusca("");
        setModoBusca(false);
        setModoTipo(false);
        setPokemonsDoTipo([]);
        setTipoSelecionado("todos");
        setPagina(1);
    };

    const tipos = [
        "todos",
        "normal",
        "fire",
        "water",
        "grass",
        "electric",
        "ice",
        "fighting",
        "poison",
        "ground",
        "flying",
        "psychic",
        "bug",
        "rock",
        "ghost",
        "dragon",
        "dark",
        "steel",
        "fairy",
    ];

    const pokemonsFiltrados = pokemons.filter((pokemon) => {
        const correspondeAoNome = pokemon.name
            .toLowerCase()
            .includes(busca.toLowerCase());

        const correspondeAoTipo =
            tipoSelecionado === "todos" ||
            pokemon.types.some(
                (tipo) => tipo.type.name === tipoSelecionado
            );

        return correspondeAoNome && correspondeAoTipo;
    });

    if (carregando) {
        return (
            <Box
                sx={{
                    minHeight: "60vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                }}
            >
                <CircularProgress />

                <Typography
                    variant="body1"
                    color="text.secondary"
                >
                    Carregando Pokémon...
                </Typography>
            </Box>
        );
    }

    if (erro) {
        return (
            <Box
                sx={{
                    minHeight: "60vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    gap: 2,
                }}
            >
                <Typography
                    variant="h4"
                    fontWeight="bold"
                >
                    Ops! 😕
                </Typography>

                <Typography
                    color="text.secondary"
                    sx={{ maxWidth: 450 }}
                >
                    Não foi possível carregar os Pokémon.
                    Tente novamente.
                </Typography>

                <Button
                    variant="contained"
                    onClick={() => window.location.reload()}
                >
                    Tentar novamente
                </Button>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#f4f6f8",
                py: 5,
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        textAlign: "center",
                        mb: 5,
                        p: 4,
                        borderRadius: 4,
                        backgroundColor: "#ffffff",
                        boxShadow: 3,
                    }}
                >
                    <Typography
                        variant="h2"
                        fontWeight="bold"
                        sx={{
                            color: "#1976d2",
                            mb: 1,
                        }}
                    >
                        Pokédex
                    </Typography>

                    <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                    >
                        Explore o mundo Pokémon
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Pesquise, filtre e descubra informações sobre seus Pokémon favoritos.
                    </Typography>
                </Box>

                <div
                    style={{
                        display: "flex",
                        gap: "12px",
                        justifyContent: "center",
                        alignItems: "center",
                        flexWrap: "wrap",
                        marginBottom: "24px",
                        padding: "24px",
                        backgroundColor: "#ffffff",
                        borderRadius: "16px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    }}
                >
                    <TextField
                        label="Buscar Pokémon"
                        variant="outlined"
                        value={busca}
                        onChange={(event) => setBusca(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                pesquisarPokemon();
                            }
                        }}
                        sx={{
                            width: "100%",
                            maxWidth: 450,
                        }}
                    />

                    <Button
                        variant="contained"
                        onClick={pesquisarPokemon}
                        sx={{
                            height: "56px",
                            px: 3,
                        }}
                    >
                        Buscar
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={limparBusca}
                        sx={{
                            height: "56px",
                            px: 3,
                        }}
                    >
                        Limpar
                    </Button>
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "32px",
                        padding: "24px",
                        backgroundColor: "#ffffff",
                        borderRadius: "16px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    }}
                >
                    <FormControl
                        sx={{
                            width: "100%",
                            maxWidth: 450,
                        }}
                    >
                        <InputLabel>Filtrar por tipo</InputLabel>

                        <Select
                            value={tipoSelecionado}
                            onChange={(event) =>
                                filtrarPorTipo(event.target.value)
                            }
                            label="Filtrar por tipo"
                        >
                            {tipos.map((tipo) => (
                                <MenuItem key={tipo} value={tipo}>
                                    {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                {pokemonsFiltrados.length === 0 ? (
                    <p>Nenhum Pokémon encontrado.</p>
                ) : (
                    <Grid container spacing={3}>
                        {pokemonsFiltrados.map((pokemon) => (
                            <Grid
                                key={pokemon.id}
                                size={{ xs: 12, sm: 6, md: 4 }}
                            >
                                <PokemonCard pokemon={pokemon} />
                            </Grid>
                        ))}
                    </Grid>
                )}

                {(!modoBusca || modoTipo) && (
                    <Pagination
                        count={Math.max(
                            1,
                            Math.ceil(totalPokemons / 20)
                        )}
                        page={pagina}
                        onChange={(event, novaPagina) =>
                            setPagina(novaPagina)
                        }
                        sx={{
                            mt: 5,
                            mb: 3,
                            display: "flex",
                            justifyContent: "center",
                            "& .MuiPaginationItem-root": {
                                borderRadius: 2,
                                fontWeight: "bold",
                            },
                        }}
                    />
                )}
            </Container>
        </Box>);
}

export default PokemonTeste;