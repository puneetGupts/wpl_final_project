import React from 'react'
import Navbar from "../navbar";
import Container from "../container"
function About() {

  return (
    <>
    <Navbar/>
    <Container>
        <div>
          <div style={{ backgroundImage: "url(/aboutbg.png)" }}>
            <h1 class="p-4">About Us</h1>
          </div>

          <div class="container-fluid m-3">
            <h2>
              <u>Tutor App</u>
            </h2>

            <div style={{ opacity: 0.7 }}>
              <h4>
                A tutor web application developed as a part of project for
                CS6314 course @UTDallas
              </h4>
            </div>
            <hr />
            <br />

            <div class="text-justify">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
            <br />

            <h5>Team members:</h5>
            <ul>
              <li>Puneet Gupta</li>
              <li>Nirali Patel</li>
              <li>Sahil Kirpekar</li>
            </ul>

            <div class="row">
              <div class="text-justify col col-8">
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur, from a Lorem
                Ipsum passage, and going through the cites of the word in
                classical literature, discovered the undoubtable source. Lorem
                Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus
                Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,
                written in 45 BC. This book is a treatise on the theory of
                ethics, very popular during the Renaissance. The first line of
                Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line
                in section 1.10.32. The standard chunk of Lorem Ipsum used since
                the 1500s is reproduced below for those interested. Sections
                1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by
                Cicero are also reproduced in their exact original form,
                accompanied by English versions from the 1914 translation by H.
                Rackham. It is a long established fact that a reader will be
                distracted by the readable content of a page when looking at its
                layout. The point of using Lorem Ipsum is that it has a
                more-or-less normal distribution of letters, as opposed to using
                'Content here, content here', making it look like readable
                English. Many desktop publishing packages and web page editors
                now use Lorem Ipsum as their default model text, and a search
                for 'lorem ipsum' will uncover many web sites still in their
                infancy.
              </div>
              <div class="col">
                <img src={'\aboutimgdown.png'} alt="Hello" align="right" width="370px" />
              </div>
            </div>
          </div>
        </div>
        </Container>

    </>
  )
}

export default About;