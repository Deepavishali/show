import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
//import "yup-phone";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";


const movieValidationSchema = yup.object({
    id:yup.number()
    .min(0,"Id mandatory")
    .required("Required!!"),
    name: yup.string()
        .min(4, "Enter movie name")
        .required("Required!!"),
    poster: yup.string()
        .min(4, "Enter Poster Link")
        .required(" Required!!"),
    rating: yup.number()
        .min(0, "Provide Rating").max(100)
        .required("Required!!"),
    trailer: yup.string()
        .min(4, "Enter Trailer Link")
        .required("Required!!"),
    summary: yup.string()
        .min(4, "Enter the summary for the movie")
        .required("Required!!"),
    //ContactNumber: yup.string().phone("IN").required('Number is mandatory')
    
});

export default function Add({movie,setMovie}) {
     const formik = useFormik({
        initialValues: {
            id:"",
            name: "",
            poster: "",
            rating: "",
            trailer: "",
            summary: "",
            },
        validationSchema: movieValidationSchema,
        onSubmit: (newMovie) => {
            createMovie(newMovie);
        },
    });
    const navigate = useNavigate();

    const createMovie = (newMovie) => {
        console.log("createMovie", newMovie);
        fetch("https://show-backend-4fzv-git-master-deepavishali.vercel.app/movie", {
            method: "POST",
            body: JSON.stringify(newMovie),
            headers: { "Content-Type": "application/json"},
            
        })
            .then((data) => data.json())
            .then(() => navigate("/adminboard"))
            .catch((err)=>console.log(err))
        
        setMovie([...movie, newMovie]);
    };
    return (
        <form onSubmit={formik.handleSubmit} style={{ marginLeft: '100px', marginTop: '50px' }} className="add-user-form">
            <h1 style={{ color: "green", fontWeight: 'bolder', fontFamily: 'cursive' }}>Fill the below details to add Movie✨</h1><br />
            <TextField
                id="id"
                name="id"
                label="Id"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.id}
                style={{ width: '800px' }}
            /><br/><br/>
            <TextField
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                style={{ width: '800px' }}
            /><br />
            {formik.touched.name && formik.errors.name ? formik.errors.avatar : ""}
            <br />
            <TextField
                id="poster"
                name="poster"
                label="Poster"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.poster}
                style={{ width: '800px' }}
            /><br />
            {formik.touched.poster && formik.errors.poster
                ? formik.errors.poster
                : ""}
            <br />
            <TextField
                id="rating"
                name="rating"
                label="Rating"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.rating}
                style={{ width: '800px' }}
            /><br />
            {formik.touched.rating && formik.errors.rating
                ? formik.errors.rating
                : ""}
            <br />
            <TextField
                id="trailer"
                name="trailer"
                label="Trailer"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.trailer}
                style={{ width: '800px' }}
            /><br />
            {formik.touched.trailer && formik.errors.trailer
                ? formik.errors.trailer
                : ""}
            <br />
            <TextField
                id="summary"
                name="summary"
                label="Summary"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.summary}
                style={{ width: '800px' }}
            /><br />
            {formik.touched.summary && formik.errors.summary
                ? formik.errors.summary
                : ""}
            <br />
            <br />
            <Button
                type="submit"
                variant="contained"
                color="success"
                onClick={createMovie}
            >
                Add New Movie
            </Button>&nbsp;&nbsp;

            <Button variant="contained" type='onClick' color="success" onClick={() => navigate(-1)}>
                <ArrowBackIosIcon /> BACK
            </Button>
        </form>
    );
}