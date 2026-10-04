import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const pokemonAleatorio = () => {
        const numero = Math.floor(Math.random() * 1025) + 1;
        navigate(`/pokemon/${numero}`);
    };
    return (

        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={{
                        flexGrow: 1,
                        color: "white",
                        textDecoration: "none",
                        fontWeight: "bold",
                    }}
                >
                    
                </Typography>

                <Box>
                    <Button
                        component={Link}
                        to="/"
                        sx={{ color: "white" }}
                    >
                        Início
                    </Button>

                    <Button
                        onClick={pokemonAleatorio}
                        sx={{ color: "white" }}
                    >
                        Aleatório
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;