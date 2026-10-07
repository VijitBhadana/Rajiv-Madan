import Hero from "../components/Hero";
import CoreServices from "../components/CoreServices";
import WhatWeDo from "../components/WhatWeDo";
import Capabilities from "../components/Capabilities";
import Advantages from "../components/Advantages";
import CallToAction from "../components/CallToAction";

export default function HomePage() {
  return (
    <>
      <Hero />          {/* #home */}
      <CoreServices />  {/* #services */}
      <WhatWeDo />      {/* #what-we-do */}
      <Capabilities />  {/* #capabilities */}
      <Advantages />    {/* #advantages + #testimonials */}
      <CallToAction />  {/* #contact */}
    </>
  );
}
