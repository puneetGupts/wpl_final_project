import React, {useState,  useEffect} from 'react'
import { Link } from 'react-router-dom'
import Ratings from '../ratings'
import Loading from "../loading"
import Message from "../message"
import { Row,Col ,ListGroup,Image,Button } from 'react-bootstrap'
import {FaStar, FaWindows} from 'react-icons/fa'

 function Reviews({tutor,reviews}) {
     let reviewExists=false;
    const localstorage_user = JSON.parse(localStorage.getItem("user"));
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const[reviewDone,setReviewDone]=useState(false)
    let reviewStudent = reviews.filter((r) => { return r.studentId == localstorage_user._id });

    if(reviewStudent.length>0){
        reviewExists=true;
    }
    // console.log(reviewExists)



    const submitHandler = async (e) => {
        e.preventDefault()

        if(!reviewExists){
        const response = await fetch(`http://localhost:3001/reviews`,{
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
              tutorId: tutor._id,
              studentId: localstorage_user._id,
              rating: rating,
              name: localstorage_user.username,
              comment:comment
        })})

           const jsonData = await response.json();
           console.log(jsonData);
           const tutorResponse = await fetch(`http://localhost:3001/tutors/${tutor._id}`,{
            method: "PUT",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                slug: tutor.slug,
                name: tutor.name,
                badge: tutor.badge,
                location: tutor.location,
                info: tutor.info,
                video: tutor.video,
                avatar: tutor.avatar,
                about: tutor.about,
                languages: tutor.languages,
                chats: tutor.chats,
                teacher: tutor.teacher,
                personalInfo: tutor.personalInfo,
                education: tutor.education,
                certification: tutor.certification,
                teachingStyle: tutor.teachingStyle,
                workEx: tutor.workEx,
                rating: (((parseFloat(tutor.rating) + parseFloat(rating))/(parseFloat(tutor.reviews) +1))).toString(),
                reviews: (parseInt(tutor.reviews) +1).toString()
        })})           
           setReviewDone(true);
           setComment("");
           setRating(0);
           window.location.reload();
        }else{
            setComment("");
            setRating(0);
            setReviewDone(true);
            reviewExists=true;
            window.location.reload();
        }
    
    }

  return (
    <Row>
    <Col md={6}>
      <h2>Reviews</h2>
      {reviews.length === 0 && !reviewDone?(<Message>No Reviews</Message>):<></> }
         <ListGroup variant='flush'>
           {reviews.map((review) => (
             <ListGroup.Item key={review._id}>
               <strong>{review.name}</strong>
               <Ratings value={review.rating} />
               <p>{review.comment}</p>
             </ListGroup.Item>
           ))}
           <ListGroup.Item>
            
           {reviewDone || reviewExists ? (
               <Message variant='danger'>{"cannot add more than one review"}</Message>
             ): <></>}
             {localstorage_user ? (
               <form className="form" onSubmit={submitHandler}>
               <div>
                 <h2>Write a customer review</h2>
               </div>
               <div>
                 <label htmlFor="rating">Rating</label>
                 <select id="rating" value={rating}
                  onChange={(e) => setRating(e.target.value)}>
                     <option value="">Select</option>
                     <option value="1">1- Bad</option>
                     <option value="2">2- Fair</option>
                     <option value="3">3- Good</option>
                     <option value="4">4- Very good</option>
                     <option value="5">5- Excelent</option>

                 </select>
               </div>
                 <div>
                 <label htmlFor="comment">Comment</label>
                 <textarea
                   id="comment"
                   value={comment}
                   onChange={(e) => setComment(e.target.value)}
                 ></textarea>
               </div>
              
               <div>
                 <label />
                 <button className="primary" type="submit">
                   Submit
                 </button>
               </div>
               
             </form>
               
             ) : (<Message>Please <Link to='/'
             >sign in</Link>to write a review</Message>)}
             
           </ListGroup.Item>
        </ListGroup>

    </Col>
  </Row>
  )
}

export default Reviews