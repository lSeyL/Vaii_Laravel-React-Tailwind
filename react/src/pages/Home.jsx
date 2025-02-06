import MiddleInfo from "./Home/MiddleInfo";
import BigCards from "./Home/BigCards";
import BottomInfo from "./Home/BottomInfo";

function Home() {
  return (
    <div>
      <BigCards />
      <MiddleInfo />
      <BottomInfo />
      {/*repeat */}
      <BigCards />
      <MiddleInfo />
    </div>
  );
}

export default Home;
