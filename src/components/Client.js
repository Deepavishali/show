import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
//import InfoIcon from '@mui/icons-material/Info';
//import EditIcon from '@mui/icons-material/Edit';
//import DeleteIcon from '@mui/icons-material/Delete';
//import Tooltip from "@mui/material/Tooltip";
import { useState, useEffect } from "react";
//import { useNavigate } from 'react-router-dom';


export default function Client() {

    const [movie, setMovie] = useState([]);
    const getMovie = () => {
        fetch("https://show-backend-4fzv-git-master-deepavishali.vercel.app/movie",
            { method: "GET" })
            .then((data) => data.json())
            .then((res) => setMovie(res));
    }

    //const navigate = useNavigate();

    useEffect(() => getMovie(), [])

    return (
        <div>
         <div className='row' >
                <div class="col-md-12" style={{ justifyItems: 'center' }}>
                    {movie.map((object, index) => (
                        <container>
                            <row>
                                <Card key={index} style={{ width: '20rem', display: 'inline-flex', marginLeft: '50px', marginTop: '50px' }}>
                                    <Card.Img variant="top" src={object.poster} />
                                    <ListGroup className="list-group-flush">
                                        <ListGroup.Item>Id No : {object.id}</ListGroup.Item>
                                        <ListGroup.Item>Name : {object.name}</ListGroup.Item>
                                        <ListGroup.Item>Rating : {object.rating}</ListGroup.Item>
                                    </ListGroup>
                                    <Card.Body>
                                        <Button variant="primary">Book my show</Button>
                                    </Card.Body>
                                </Card>
                            </row>
                        </container>
                    ))}
                </div>
            </div>
        </div>
    )
}

