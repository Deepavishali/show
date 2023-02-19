import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";


export default function EditMovie() {
    const { movieid } = useParams();
    const [movie, setMovie] = useState(null);
    useEffect(() => {
        fetch(`https://show-backend-4fzv-git-master-deepavishali.vercel.app/movie/${movieid}`, {
            method: "GET",
        })
            .then((data) => data.json())
            .then((usdata) => {
                setMovie(usdata);
            });
    });
    return movie ? <EditMovieForm movie={movie} /> : "Please wait........!!!"

}

function EditMovieForm({ movie }) {
    const [name, setName] = useState(movie.name);
    const [poster, setPoster] = useState(movie.poster);
    const [rating, setRating] = useState(movie.rating);
    const [trailer, setTrailer] = useState(movie.trailer);
    const [summary, setSummary] = useState(movie.summary);

    const navigate = useNavigate();

    return (
        <div className="add-user-form" style={{ marginLeft: '50px', marginTop: '50px' }}>
            <h1 style={{ color: "green", fontWeight: 'bolder', fontFamily: 'cursive' }}>Edit and Save Movie✨</h1><br />
            <TextField
                label="Name"
                variant="outlined"
                onChange={(event) => setName(event.target.value)}
                type="text"
                placeholder="Enter movie name"
                value={name}
                style={{ width: '800px' }}
            />
            <br /><br />
            <TextField
                label="Poster"
                variant="outlined"
                onChange={(event) => setPoster(event.target.value)}
                type="text"
                placeholder="Enter poster link"
                value={poster}
                style={{ width: '800px' }}
            /><br /><br />
            <TextField
                label="Rating"
                variant="outlined"
                onChange={(event) => setRating(event.target.value)}
                type="number"
                placeholder="Provide Rating for movie"
                value={rating}
                style={{ width: '800px' }}
            /><br /><br />
            <TextField
                label="Trailer"
                variant="outlined"
                onChange={(event) => setTrailer(event.target.value)}
                type="text"
                placeholder="Enter trailer url"
                value={trailer}
                style={{ width: '800px' }}
            /><br /><br />
            <TextField
                label="Summary"
                variant="outlined"
                onChange={(event) => setSummary(event.target.value)}
                type="text"
                placeholder="Summary of the movie"
                value={summary}
                style={{ width: '800px' }}
            /><br /><br />
            <Button
                color="success"
                variant="contained"
                onClick={
                    () => {
                        const updatedMovie = {
                            name:name,
                            poster: poster,
                            rating: rating,
                            trailer: trailer,
                            summary: summary,
                            };
                        fetch(`https://show-backend-4fzv-git-master-deepavishali.vercel.app/movie/${movie.id}`, {
                            method: "PUT",
                            body: JSON.stringify(updatedMovie),
                            headers: { "Content-Type": "application/json" },
                        })
                            .then((data) => data.json())
                            .then(() => navigate("/adminboard"));
                    }
                }
            >
                SAVE USER
            </Button>&nbsp;&nbsp;&nbsp;

            <Button color="success"
                variant="contained"
                onClick={() => { navigate(-1) }}
            >
                <ArrowBackIosIcon /> BACK
            </Button>
        </div>
    )
}