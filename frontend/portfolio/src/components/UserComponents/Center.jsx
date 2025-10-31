import "./Center.css";
import techIcons from "../../techImage";
import FloatImage from "./FloatImage";
export default function Center() {
  return (
    <section>
      <img src="/assets/romit.png" alt="Profile" className="profile-pic" />
      <FloatImage src="css.png" l="12%" t="10%" anim="csslogo" />
      <FloatImage src="html.svg" r="20%" b="10%" anim="htmllogo" />
      <FloatImage src="js.svg" r="10%" t="10%" anim="jslogo" />
      <FloatImage src="nodejs.png" l="20%" b="10%" anim="nodelogo" />
      <FloatImage src="reactjs.svg" l="15%" b="30%" anim="reactlogo" z={2} />
      <FloatImage src="mongo.svg" l="30%" t="0.5rem" anim="mongologo" w="5rem" h="5rem"/>
      <FloatImage src="python.png" r="5%" b="20%" anim="pythonlogo" z={2}/>
      <FloatImage src="c++.png" r="5%" b="50%" anim="cpplogo" w="5rem" h="5rem"/>
      <FloatImage src="bootstrap.png" l="5%" t="40%" anim="boostraplogo" w="5rem" h="5rem"/>
    </section>
  );
}
