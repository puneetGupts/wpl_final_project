import  React,{ useState,useEffect } from 'react';
import { useParams } from 'react-router-dom'
import styles from "../../assets/common/style.module.scss"
import DetailHeader from '../detailHeader';
import PersonalityInfo from '../personalityInfo';
import Layout from '../layout';


function Detail() {

  let { id } = useParams();
  // console.log(id);
  const [tutors, setTutor] = useState([]);
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
                />
                <PersonalityInfo about={tutor.about} language={tutor.languages}
                  teachingStyle={tutor.teachingStyle}
                  workEx={tutor.workEx} education={tutor.education} certification={tutor.certification} />
              </>
            ))}
          </main>
          </Layout>
      </div>
    )
  }
}

export default Detail; 