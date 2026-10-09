import TubeLight from "./TubeLight";
import AboutTree from "./AboutTree";
import { about } from "../data/siteData";

// About section: the tube light headline (always dark), then the About tree.
export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-white dark:bg-navy-950">
      <TubeLight text={about.spotlight} />
      <AboutTree />
    </section>
  );
}
