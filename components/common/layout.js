import Header from "./header";
import Footer from "./footer";

function Layout(props) {
  return (
    <div >
      <Header  transparent  />
      <main >
        {props.children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;