import Header from "../headers/Header"
import profilePic from "../../assets/profile_pic.jpg"
import SocialLink from "../smallComponents/SocialLink"

export default function About() {
  return (
    <>
      <Header className="searchHeader aboutHeader" 
        heading="Isha Kapoor" 
        para="Sed cras nec a nulla sapien adipiscing ut etiam. 
              In sem viverra mollis metus quam adipiscing vel nascetur 
              condimentum felis sapien. Pede consequat laoreet enim sit 
              aliquet mollis semper.">

        <div className="contentImage">
          <div className="pic">
            <img src={profilePic} alt="profileImg" />
          </div>
          <div className="link"><SocialLink/></div>
        </div>
      </Header>

      <main className="inner">
        <div className="about">

            <h2>What is Lorem Ipsum?</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
              Ducimus modi voluptas eveniet delectus! Libero maiores repudiandae a consequatur minus! 
              Pariatur dicta magnam eos ex quae ipsum sunt quod doloribus laudantium.
            </p>

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Voluptates sunt sequi ab tenetur animi. Sunt reiciendis 
              ipsam quos impedit, quibusdam omnis, autem enim atque illum
               nihil consectetur praesentium voluptatibus ut rerum nemo numquam, 
               a nam dolor aut. Sed voluptatem labore obcaecati alias, cumque necessitatibus 
               maxime provident voluptas aliquam commodi facere eaque! Voluptas, provident explicabo? 
               Sit reprehenderit vitae ipsum amet quod quae qui dolores numquam facilis, debitis omnis 
               nesciunt itaque autem non necessitatibus quas quos fugit laboriosam quia. 
               Autem temporibus odio inventore incidunt saepe, a perspiciatis assumenda 
               voluptates necessitatibus ad? Commodi, veritatis sapiente! 
            </p>

            
        </div>
      </main>

    </>
  )
}
