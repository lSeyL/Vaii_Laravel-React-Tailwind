import MiddleInfo from "./Home/MiddleInfo";
import BigCards from "./Home/BigCards";

function Home() {
  return (
    <div>
      <BigCards />
      <MiddleInfo />
      <BigCards />
      <MiddleInfo />
    </div>
  );
}

export default Home;
