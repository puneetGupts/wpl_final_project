import React from 'react';
import { createUseStyles } from "react-jss";
import { useLocation } from 'react-router-dom'
import styles from "../../assets/common/style.module.scss"
import DetailHeader from '../detailHeader';
import PersonalityInfo from '../personalityInfo';
import Header from '../header';
import Footer from '../footer';


function Detail() {
  const location = useLocation();
  const props = location.state.props;

  return (
    <div>
      <Header />
      <div>
        <div className={styles.detailMain}>
          {props !== null && (
            <>
              <DetailHeader
                name={props.name}
                badge={props.badge}
                location={props.location}
                avatar={props.avatar}
              />
              {/* <Video video={tutor.video} /> */}
              <PersonalityInfo about={props.about} language={props.languages}
                teachingStyle={props.teachingStyle}
                workEx={props.workEx} education={props.education} certification={props.certification} />
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )

  // const location = useLocation();
  // const props = location.state.props;
  // console.log(location.state);
  // const classes = styles()

  //   return (
  //       <div className={classes.container}>
  //       <div className={classes.tutor_info}>

  //       <div className={classes.tutor_info_detail}>
  //         <h5>{props.name}</h5>
  //         <div className={classes.location}>
  //           <p>{props.location}</p>
  //         </div>
  //       </div>
  //     </div>
  //    <div className={classes.list_wrapper}>
  //    <div >
  //      <h3>About Me</h3>
  //      <p>{props.info}</p>
  //    </div>
  //    <div >
  //      <h3>Teaching Style</h3>
  //      <p >{props.teachingStyle}</p>
  //    </div>
  //    <div >
  //      <h3>Work Experience</h3>
  //      <p >{props.workEx}</p>
  //    </div>
  //    <div >
  //      <h3>Education</h3>
  //      <p >{props.education}</p>
  //    </div>
  //    <div >
  //      <h3>Certifications</h3>
  //      <p>{props.languages}</p>
  //    </div>
  //    <div >
  //      <h3>Language</h3>
  //      <p className={classes.language}>{props.languages}</p>
  //    </div>
  //  </div>
  //  </div>
  //   )
}

// const styles = createUseStyles({
//   tutor_info : {


//       borderBottom: '2px solid #eeeeee',
//       display: 'flex',
//       fontFamily: 'PT Sans',
//       height: '70px',
//       marginTop: '20px',
//       paddingBottom: '10px',
//       width: '100%',

//   },

//   tutor_info_detail : {
//     color : 'blue',
//     fontSize : '23px',
//   },
//   location : {
//       display: 'flex',
//       alignItems: 'center',
//       fontSize : '18px',
//       color:'gray'
//   },
//   list_wrapper : {
//       width: '100%',

//     },
//     language: {
//       border: '1px solid',
//       padding: '15px',
//       borderRadius: '16px',
//       fontSize: '13px',
//       width:'max-content',
//     },
//   container :{
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       padding: '0px 80px',
//       flexDirection: 'column',
//     },

// })

export default Detail; 