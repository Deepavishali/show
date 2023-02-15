import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Card, Image, Stack, Button, Text, Heading, CardBody, CardFooter } from '@chakra-ui/react';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";


export default function UserDetail() {
    const { movieid } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState({});

    useEffect(() => {
        fetch(`https://show-backend-4fzv-git-master-deepavishali.vercel.app/movie/${movieid}`, {
            method: "GET",
        })
            .then((data) => data.json())
            .then((us) => {
                setMovie(us);
            });
    });

    return (
        <div>
            <h1 style={{ marginLeft: '100px', marginTop: '10px', color: "green", fontWeight: 'bolder', fontFamily: 'cursive' }}>Detailed page of the Movie 🤞✨</h1>
            <Card
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='outline'
                style={{ marginLeft: '50px', marginTop: '50px', width: '100%', height: '100%' }}
            >
                <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '200px' }}
                    src={movie.poster}
                    alt='Caffe Latte'
                    style={{ width: '500px' }}
                />

                <Stack>
                    <CardBody style={{ marginLeft: '30px' }}>
                        <Heading size='md'>Id no   :    {movie.id}</Heading><br/>
                        <Text py='2'>
                            <Heading size='md'>Name           : {movie.name}</Heading><br/>
                            <Heading size='md'>Rating            : {movie.rating}</Heading><br/>
                            <Heading size='md'>Summary          : {movie.summary}</Heading><br/>
                           </Text>
                    </CardBody>

                    <CardFooter>
                        <Button
                            style={{ marginLeft: '30px' }}
                            onClick={() => navigate(-1)}
                            variant="contained"
                            // startIcon={<ArrowBackIosIcon />}
                        >
                            <ArrowBackIosIcon />
                            BACK
                        </Button>
                    </CardFooter>
                </Stack>
            </Card>
        </div>
    )
}