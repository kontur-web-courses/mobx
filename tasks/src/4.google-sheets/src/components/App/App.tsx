import type { FC } from "react";
import type { SheetStore } from "../../models/SheetStore";
import Header from "../Header/Header";
import CurrentSheet from "../CurrentSheet/CurrentSheet";
import Footer from "../Footer/Footer";

interface AppProps {
  store: SheetStore;
}

const App: FC<AppProps> = ({ store }) => (
  <>
    <Header store={store} />
    <CurrentSheet store={store} />
    <Footer store={store} />
  </>
);

export default App;
