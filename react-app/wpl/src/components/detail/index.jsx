import React from 'react';
import { useLocation } from 'react-router-dom'
import styles from "../../assets/common/style.module.scss"
import DetailHeader from '../detailHeader';
import PersonalityInfo from '../personalityInfo';
import Layout from '../layout';

function Detail() {
  const location = useLocation();
  const props = location.state.props;

  return (
    <div>
      <Layout>
        <main className={styles.detailMain}>
          {props !== null && (
            <>
              <DetailHeader
                name={props.name}
                badge={props.badge}
                location={props.location}
                avatar={props.avatar}
              />
              <PersonalityInfo about={props.about} language={props.languages}
                teachingStyle={props.teachingStyle}
                workEx={props.workEx} education={props.education} certification={props.certification} />
            </>
          )}
        </main>
        </Layout>
    </div>
  )

}

export default Detail; 