import  React,{ useState,useEffect } from 'react';
import { useParams } from 'react-router-dom'
import styles from "../../assets/common/style.module.scss"
import DetailHeader from '../detailHeader';
import PersonalityInfo from '../personalityInfo';
import Layout from '../layout';
import Ratings from '../ratings';
// import Reviews from '../reviews';

function Detail() {

  let { id } = useParams();
  // console.log(id);
  const [tutors, setTutor] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  // const location = useLocation();
  // const props = location.state.props;
  useEffect(() => {

    fetch("http://localhost:3001/tutors/" + id, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTutor(data);

        localStorage.setItem("cachedSelectedTutor", JSON.stringify(data));
      })
      .catch((error) => {
        console.log(error.message);
        setError(error);
      });

      fetch(`http://localhost:3001/reviews?tutorId=${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setReviews(data);
        })
        .catch((error) => {
          console.log(error.message);
          setError(error);
        });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div>
        <Layout>
          <main className={styles.detailMain}>
            {tutors !== null && tutors.map((tutor) =>(
              <>
                <DetailHeader
                  name={tutor.name}
                  badge={tutor.badge}
                  location={tutor.location}
                  avatar={tutor.avatar}
                  tutor={tutor}
                />
                <PersonalityInfo about={tutor.about} language={tutor.languages}
                  teachingStyle={tutor.teachingStyle}
                  workEx={tutor.workEx} education={tutor.education} certification={tutor.certification}
                  tutor={tutor} reviews={reviews} />
                {/* <Reviews tutor={tutor} reviews={reviews}></Reviews>  */}

              </>
            ))}
          </main>
          </Layout>
      </div>
    )
  }
}

export default Detail; 