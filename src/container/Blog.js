import react, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



//http://jsonplaceholder.typicode.com

const Blog = () => {

    const [posts, setPosts] = useState();
    const [title, setTitle] = useState('');
    const [content, setcontent] = useState('');
    const [author, setauthor] = useState('Barkın Kızılkaya');
    let cardObject = null;

    useEffect(() => {



    }, [])

    const getPostsFromServer = () => {
        axios.get('http://jsonplaceholder.typicode.com/posts')
            .then(response => {
                setPosts(response.data.splice(0, 2));
            })
            .catch(error => {
                console.log(error);
            });
    }

    let data = {
        title: "Axios",
        body: "Merhaba axios aşırı sevimlisin :)",
        author: "Barkın Kızılkaya"
    };


    if (posts) {
        cardObject = posts.map(post => {
            return (
                <Col key={post.id}>
                    <Card >
                        <Card.Body>
                            <Card.Title>{post.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Alt Metin</Card.Subtitle>
                            <Card.Text>
                                {post.body}
                            </Card.Text>

                        </Card.Body>
                    </Card>
                </Col>
            )
        })
    }
    const postDataToServer = () => {


        axios.post('http://jsonplaceholder.typicode.com/posts', data)
            .then(response => {
                alert("İşlem Başarılı " + response.status);
            })

    }

    const deleteDataFromServer = (id) => {
        axios.post('http://jsonplaceholder.typicode.com/posts/', id)
            .then(response => {
                alert("İşlem Başarılı " + response.status);
            })
    }



    return (
        <Container>
            <br></br>
            <br></br>
            <Row>
                <Col>
                    <Button variant="primary" onClick={getPostsFromServer}>Servis Çağır</Button>
                </Col>

                <Col>
                    <Button variant="secondary" onClick={postDataToServer}>Verileri Gönder </Button>
                </Col>
                <Col>
                    <Button variant="danger" onClick={() => {deleteDataFromServer(1)}}>Veriyi Sil</Button>
                </Col>
            </Row>
            <br></br>
            <br></br>
            <Row>
                {cardObject}
            </Row>

        </Container >
    );
};

export default Blog;