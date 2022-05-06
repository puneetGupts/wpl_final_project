const setFavorite = async(data,isFavorite,status) => {

  try {
    const localstorage_user = JSON.parse(localStorage.getItem("user"));
    if(isFavorite){
      // const localstorage_user = JSON.parse(localStorage.getItem("user"));
      const response = await fetch(`http://localhost:3001/favourites?tutorId=${data._id}`,{
       method: "DELETE",
       headers: { "Content-Type": "application/json"},
  //      body: JSON.stringify({
  //        tutorId: data._id,
  //        studentId: localstorage_user._id,
  //  })
  })
      const jsonData = await response.json();
      if(status==="favorite"){
        window.location.reload();
      }
      console.log(jsonData);   
    }else{
    // const localstorage_user = JSON.parse(localStorage.getItem("user"));
     const response = await fetch(`http://localhost:3001/favourites`,{
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
        tutorId: data._id,
        studentId: localstorage_user._id,
  })})
     const jsonData = await response.json();
     console.log(jsonData);
    //  const tutors=JSON.parse(localStorage.getItem("cachedTutors"));
    //  const tutorData = jsonData;
    //  const favTutorsList = tutors.filter((elem) => tutorData.find(({ tutorId }) => elem._id === tutorId) );
    //  setFavTutors(favTutorsList);

 }} catch (error) {
     console.error(error.message);
 }};
    // let storageTutor = JSON.parse(localStorage.getItem("cachedTutors")) || [];
  
    // if (storageTutor == null) {
    //   localStorage.setItem("cachedTutors", JSON.stringify([data]));
    // }
    // console.log(localStorage)
    // let tutor = storageTutor.filter((e) => e.id == data.id);
    // storageTutor.push(data);
    // if (tutor.length > 0) {
    //   localStorage.setItem(
    //     "cachedTutors",
    //     JSON.stringify(storageTutor.filter((e) => e.id !== data.id))
    //   );
    // } else {
    //   localStorage.setItem("cachedTutors", JSON.stringify(storageTutor));
    // }
  // };
  
  module.exports = setFavorite;
  