import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
// react-query instance 생성
const queryClient = new QueryClient();

root.render(
  // <React.StrictMode>
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </RecoilRoot>
  // </React.StrictMode>
);

// 누르면 다크모드가 적용되는 토글 버튼을 만들어주세요.
// /:coinId에서 홈으로 돌아갈 수 있는 버튼을 만들어주세요. x
// 강의에서 구현하지 않은 Coin의 /:coinId/price탭을 구현해주세요.
// /:coinId/chart탭의 차트 형식을 CandleStick 형식으로 변경해주세요.
