import '../App.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';

function Community() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [postsData, setPostsData] = useState(undefined);
  const [userData, setUserData] = useState(undefined);
  const [isLoggedin, setIsLoggedin] = useState(false);
  let li = null;


  useEffect(() => {
    async function fetchData() {
      try {
        let { data } = await axios.get('http://localhost:5000/posts');
        setPostsData(data)
        setIsLoading(false)
        console.log(data);
      } catch (e) {
        setIsLoading(true)
        console.log(e);
      }
    };
    fetchData();
  }, []);

  //checking if the user is logged in to make a post
  useEffect(() => {
    console.log('/profile')
    axios.get('/profile', {
      withCredentials: true
    })
      .then(response => {
        if (!response.data) {
          navigate('/community')
        }
        // setUserData(axios.get('http://localhost:5000/profile'));
        setUserData(response.data);
        setIsLoggedin(true);
        // D testing 
        // dispatch(actions.setUserData(response.data));
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error)
        setIsLoggedin(true);
        setIsLoading(false);
      });
  }, [navigate])


  const buildCard = (post) => {
    return (

      <div className="Community"> Community
        <div class="communityContainer">
          <div class=" cards">
            <div class="card">
              <h2>{post.title}</h2>
              <div class="card__content">
                <p>
                  {post.content}
                </p>
                <div>Posted by: {post.username}</div>
                <div class="card_stats">
                  <div>
                    <p>Likes: {post.likes.length} </p>
                  </div>
                  <div>
                    <p>Comments: {post.replies.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
  li = postsData && postsData.map((post) => {
    return buildCard(post);
  });
  return (
    <div className="App-body">
      {
        isLoggedin ? (
          <button onClick={() => {
            navigate('/postform')
          }}>add post</button>
        ) : (
          <p>Must be logged in to post</p>
        )
      }
      <ul className="list-unstyled">{li}</ul>
    </div>
  );
}

export default Community;
